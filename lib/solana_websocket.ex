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
    {:ok, state}
  end

  def handle_disconnect(connection_status, state) do
    Logger.warning("""
    Socket #{state.connection_index} disconnected!
    Status: #{inspect(connection_status)}
    State: #{inspect(state)}
    """)

    {:reconnect, state}
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

      _ ->
        Logger.debug(
          "Connection #{state.connection_index} received other message: #{inspect(msg)}"
        )

        {:ok, state}
    end
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
end
