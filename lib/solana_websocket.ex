defmodule SharkAttack.SolanaWS do
  use WebSockex
  require Logger

  def start_link({index, url}) do
    name = :"solana_ws_#{index}"
    Logger.info("Starting SolanaWS connection #{index}")

    WebSockex.start_link(
      url,
      __MODULE__,
      %{
        subscription_map: %{},
        connection_index: index
      },
      name: name
    )
  end

  def subscribe_accounts(connection_name, accounts) do
    Logger.info("Connection #{connection_name}: Subscribing to #{length(accounts)} accounts")

    Enum.each(accounts, fn account ->
      request = %{
        "jsonrpc" => "2.0",
        "id" => account,
        "method" => "accountSubscribe",
        "params" => [
          account,
          %{
            "encoding" => "base64",
            "commitment" => "confirmed"
          }
        ]
      }

      WebSockex.send_frame(connection_name, {:text, Jason.encode!(request)})
    end)
  end

  def terminate(reason, state) do
    Logger.error("""
    Socket #{state.connection_index} terminating!
    Reason: #{inspect(reason)}
    State: #{inspect(state)}
    Stack: #{inspect(Process.info(self(), :current_stacktrace))}
    """)

    {:ok, state}
  end

  def handle_connect(_conn, state) do
    Logger.info("SolanaWS #{state.connection_index} Connected!")

    # Resubscribe to all accounts after reconnection
    accounts = Map.values(state.subscription_map) |> Enum.uniq()

    if length(accounts) > 0 do
      Logger.info("Resubscribing to #{length(accounts)} accounts")

      for account <- accounts do
        request = %{
          "jsonrpc" => "2.0",
          "id" => account,
          "method" => "accountSubscribe",
          "params" => [
            account,
            %{
              "encoding" => "base64",
              "commitment" => "confirmed"
            }
          ]
        }

        WebSockex.send_frame(self(), {:text, Jason.encode!(request)})
      end
    end

    schedule_ping()
    {:ok, state}
  end

  def handle_disconnect(%{reason: reason} = disconnect_status, state) do
    Logger.warning("""
    Socket #{state.connection_index} disconnected!
    Status: #{inspect(disconnect_status)}
    Reason: #{inspect(reason)}
    State: #{inspect(state)}
    """)

    # Clear subscription map since all subscriptions are invalidated on disconnect
    {:reconnect, %{state | subscription_map: %{}}}
  end

  def handle_frame({:text, msg}, state) do
    case Jason.decode!(msg) do
      %{"result" => subscription_id, "id" => account} ->
        new_state = put_in(state, [:subscription_map, to_string(subscription_id)], account)
        {:ok, new_state}

      %{"method" => "accountNotification"} = message ->
        subscription = get_in(message, ["params", "subscription"])
        account = get_in(state, [:subscription_map, to_string(subscription)])
        account_info = get_in(message, ["params", "result", "value"])

        if account_info do
          info = format_account_info(account_info)
          :ets.insert(:accounts, {account, info})

          Phoenix.PubSub.broadcast(
            SharkAttack.PubSub,
            "account_updates",
            {:account_updated, account, info}
          )
        end

        {:ok, state}

      %{"result" => _result, "id" => "ping"} ->
        Logger.debug("Connection #{state.connection_index} received pong")
        schedule_ping()
        {:ok, state}

      _ ->
        Logger.debug(
          "Connection #{state.connection_index} received other message: #{inspect(msg)}"
        )

        {:ok, state}
    end
  end

  def handle_info(:ping, state) do
    {:reply, :ping, state}
  end

  defp format_account_info(account_info) do
    %{
      "space" => account_info["space"],
      "lamports" => account_info["lamports"],
      "owner" => account_info["owner"],
      "executable" => account_info["executable"],
      "rentEpoch" => account_info["rentEpoch"],
      "data" => account_info["data"]
    }
  end

  defp schedule_ping do
    # Send ping every minute
    Process.send_after(self(), :ping, 60_000)
  end
end
