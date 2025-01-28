defmodule SharkAttack.SolanaWS do
  use WebSockex
  require Logger

  @initial_reconnect_delay 1_000
  @max_reconnect_delay 30_000
  @ping_interval 60_000
  @ping_timeout 10_000

  def start_link({index, url}) do
    name = :"solana_ws_#{index}"
    Logger.info("Starting SolanaWS connection #{index}")
    WebSockex.start_link(
      url,
      __MODULE__,
      %{
        subscription_map: %{},
        connection_index: index,
        reconnect_attempt: 0,
        needs_resubscribe: false,
        last_ping_ref: nil
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
  def handle_connect(_conn, state) do
    Logger.info("SolanaWS #{state.connection_index} Connected!")

    state = state
      |> Map.put(:reconnect_attempt, 0)
      |> maybe_resubscribe()
      |> schedule_heartbeat()

    {:ok, state}
  end

  @impl WebSockex
  def handle_disconnect(%{reason: reason}, state) do
    Logger.warning("Socket #{state.connection_index} disconnected! Reason: #{inspect(reason)}")

    state = state
      |> cleanup_heartbeat()
      |> Map.merge(%{
        needs_resubscribe: true,
        reconnect_attempt: state.reconnect_attempt + 1,
        last_ping_ref: nil
      })

    backoff = calculate_backoff(state.reconnect_attempt)
    Logger.info("Connection #{state.connection_index} will attempt reconnect in #{backoff}ms")
    Process.send_after(self(), :attempt_reconnect, backoff)

    {:ok, state}
  end

  @impl WebSockex
  def handle_frame({:text, msg}, state) do
    msg
    |> Jason.decode!()
    |> handle_message(state)
  end
  @impl WebSockex
  def handle_pong(:pong, state) do
    state = schedule_heartbeat(state)
    {:ok, state}
  end

  @impl WebSockex
  def handle_info(:heartbeat, state) do
    {:reply, :ping, state}
  end

  @impl WebSockex
  def handle_info(:heartbeat_timeout, state) do
    Logger.warning("Connection #{state.connection_index} heartbeat timeout - reconnecting")
    {:close, {1000, "heartbeat timeout"}, state}
  end

  @impl WebSockex
  def handle_info(:attempt_reconnect, state) do
    Logger.info("Attempting reconnect for connection #{state.connection_index}")
    {:reconnect, state}
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

  defp maybe_resubscribe(%{needs_resubscribe: true} = state) do
    accounts = Map.values(state.subscription_map) |> Enum.uniq()

    if accounts != [] do
      Logger.info("Resubscribing to #{length(accounts)} accounts")
      Enum.each(accounts, &send_subscription_request(self(), &1))
    end

    %{state | needs_resubscribe: false}
  end
  defp maybe_resubscribe(state), do: state

  defp schedule_heartbeat(state) do
    cleanup_heartbeat(state)

    refs = %{
      ping: Process.send_after(self(), :heartbeat, @ping_interval),
      timeout: Process.send_after(self(), :heartbeat_timeout, @ping_interval + @ping_timeout)
    }

    %{state | last_ping_ref: refs}
  end

  defp cleanup_heartbeat(%{last_ping_ref: nil} = state), do: state
  defp cleanup_heartbeat(%{last_ping_ref: %{ping: ping_ref, timeout: timeout_ref}} = state) do
    Process.cancel_timer(ping_ref)
    Process.cancel_timer(timeout_ref)
    %{state | last_ping_ref: nil}
  end

  defp calculate_backoff(attempt) do
    min(:math.pow(2, attempt) * @initial_reconnect_delay, @max_reconnect_delay) |> round()
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
