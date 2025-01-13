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
            "encoding" => "jsonParsed",
            "commitment" => "confirmed"
          }
        ]
      }

      WebSockex.send_frame(connection_name, {:text, Jason.encode!(request)})
    end)
  end

  def terminate(reason, state) do
    Logger.warning("Socket #{state.connection_index} terminating: #{inspect(reason)}")
    {:ok, state}
  end

  def handle_connect(_conn, state) do
    Logger.info("SolanaWS #{state.connection_index} Connected!")
    {:ok, state}
  end

  def handle_frame({:text, msg}, state) do
    case Jason.decode!(msg) do
      %{"result" => subscription_id, "id" => account} ->
        Logger.info("Connection #{state.connection_index} subscribed to account #{account}")
        new_state = put_in(state, [:subscription_map, to_string(subscription_id)], account)
        {:ok, new_state}

      %{"method" => "accountNotification"} = message ->
        Logger.info("Connection #{state.connection_index} received account notification")
        subscription = get_in(message, ["params", "subscription"])
        account = get_in(state, [:subscription_map, to_string(subscription)])
        account_info = get_in(message, ["params", "result", "value"])

        if account_info do
          :ets.insert(:accounts, {account, format_account_info(account, account_info)})
        end

        {:ok, state}

      _ ->
        Logger.debug(
          "Connection #{state.connection_index} received other message: #{inspect(msg)}"
        )

        {:ok, state}
    end
  end

  defp format_account_info(account, account_info) do
    %{
      "pubkey" => account,
      "lamports" => account_info["lamports"],
      "owner" => account_info["owner"],
      "executable" => account_info["executable"],
      "rent_epoch" => account_info["rentEpoch"],
      "data" => account_info["data"]
    }
  end
end
