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
        connection_index: index,
      },
      name: name
    )
  end

  def subscribe_accounts(connection_name, accounts) do
    Logger.info("Connection #{connection_name}: Subscribing to #{length(accounts)} accounts")

    Enum.each(accounts, fn account ->
      send_subscription_request(connection_name, account)
    end)
  end

  @impl WebSockex
  def handle_frame({:text, msg}, state) do
    msg
    |> Jason.decode!()
    |> handle_message(state)
  end

  # Private functions

  defp send_subscription_request(connection_name, account) do
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
  end


  defp handle_message(%{"result" => subscription_id, "id" => account}, state) do
    {:ok, put_in(state, [:subscription_map, to_string(subscription_id)], account)}
  end

  defp handle_message(%{"method" => "accountNotification"} = message, state) do
    with subscription <- get_in(message, ["params", "subscription"]),
         account <- get_in(state, [:subscription_map, to_string(subscription)]),
         account_info when not is_nil(account_info) <- get_in(message, ["params", "result", "value"]) do
      broadcast_account_update(account, account_info)
    end
    {:ok, state}
  end

  defp handle_message(message, state) do
    Logger.debug("Connection #{state.connection_index} received unhandled message #{inspect(message)}")
    {:ok, state}
  end

  defp broadcast_account_update(account, account_info) do
    info = Map.take(account_info, ["space", "lamports", "owner", "executable", "rentEpoch", "data"])
    :ets.insert(:accounts, {account, info})

    # Broadcast updates
    pubsub_broadcast("account_updates", account, info)
    pubsub_broadcast("account_updates:#{account}", account, info)
  end

  defp pubsub_broadcast(topic, account, info) do
    Phoenix.PubSub.broadcast(
      SharkAttack.PubSub,
      topic,
      {:account_updated, account, info}
    )
  end
end
