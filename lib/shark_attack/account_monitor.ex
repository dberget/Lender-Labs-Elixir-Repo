defmodule SharkAttack.AccountMonitor do
  use GenServer
  require Logger

  # 10 minutes
  @activity_window_seconds 600

  def start_link(opts \\ []) do
    GenServer.start_link(__MODULE__, [], opts)
  end

  def init([]) do
    # Create ETS table for activity tracking - store list of timestamps
    :ets.new(:pool_activity, [:named_table, :public, :duplicate_bag, write_concurrency: true])

    # Subscribe to base topic instead of trying to use wildcard
    Phoenix.PubSub.subscribe(SharkAttack.PubSub, "account_updates")
    positions = SharkAttack.AutoClose.get_active_positions()

    Process.send_after(self(), :update_positions, 60_000)
    Process.send_after(self(), :cleanup_activity, 60_000 * 10)

    {:ok, positions}
  end

  def get_pool_activity(pool_address) do
    cutoff_time = System.system_time(:second) - @activity_window_seconds

    :ets.lookup(:pool_activity, pool_address)
    |> Enum.count(fn {_, timestamp} -> timestamp >= cutoff_time end)
  end

  def handle_info(:cleanup_activity, state) do
    cleanup_old_entries()
    Process.send_after(self(), :cleanup_activity, 60_000 * 10)
    {:noreply, state}
  end

  def handle_info({:account_updated, account, account_info}, state) do
    # Record activity - add new timestamp to the list
    current_time = System.system_time(:second)
    :ets.insert(:pool_activity, {account, current_time})

    # Existing position checking logic
    market_positions = get_market_positions(state, account)

    if length(market_positions) > 0 do
      case SharkAttack.DLMMPools.get_active_bin_id(account_info) do
        %{active_id: pool_bin_id} ->
          positions_to_close =
            market_positions
            |> Enum.filter(fn position ->
              should_close_position?(position, pool_bin_id)
            end)

          SharkAttack.AutoClose.close_positions(positions_to_close)

        {:error, _} ->
          Logger.error("Failed to get active bin ID for account #{account}")
      end
    end

    {:noreply, state}
  end

  # call update_positions on an interval
  def handle_info(:update_positions, _state) do
    {:ok, new_state} = update_positions()

    Process.send_after(self(), :update_positions, 60_000)

    {:noreply, new_state}
  end

  defp cleanup_old_entries do
    cutoff_time = System.system_time(:second) - @activity_window_seconds

    :ets.match_object(:pool_activity, {:_, :_})
    |> Enum.each(fn {pool, timestamp} ->
      if timestamp < cutoff_time do
        :ets.delete_object(:pool_activity, {pool, timestamp})
      end
    end)
  end

  def update_positions() do
    positions = SharkAttack.AutoClose.get_active_positions()

    {:ok, positions}
  end

  def check_positions() do
    positions = SharkAttack.AutoClose.get_active_positions()

    for position <- positions do
      if position.status == "ACTIVE" do
        case SharkAttack.DLMMPools.get_pool_state(position.pool_address) do
          %{active_id: pool_bin_id} ->
            if should_close_position?(position, pool_bin_id) do
              SharkAttack.DiscordConsumer.send_to_webhook(
                "me",
                "check_positions - Closing position #{position.pool_address} because #{pool_bin_id} is #{String.downcase(position.sell_direction)} #{position.exit_bin_id}"
              )

              SharkAttack.AutoClose.close_positions([position])
            end

          {:error, reason} ->
            Logger.error("Failed to get pool state for #{position.pool_address}: #{reason}")
        end
      end
    end
  end

  defp get_market_positions(state, account) do
    Enum.filter(state, fn position -> position.pool_address == account end)
  end

  defp should_close_position?(position, pool_bin_id) do
    exit_bin_id = position.exit_bin_id

    should_close =
      case position.sell_direction do
        "CLOSE_BELOW" -> pool_bin_id < exit_bin_id
        "CLOSE_ABOVE" -> pool_bin_id > exit_bin_id
      end

    if should_close do
      SharkAttack.DiscordConsumer.send_to_webhook(
        "me",
        "Closing position #{position.pool_address} because #{pool_bin_id} is #{String.downcase(position.sell_direction)} #{exit_bin_id}"
      )
    end

    should_close
  end
end
