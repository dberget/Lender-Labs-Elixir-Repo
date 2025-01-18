defmodule SharkAttack.AccountMonitor do
  use GenServer
  require Logger

  def start_link(opts \\ []) do
    GenServer.start_link(__MODULE__, [], opts)
  end

  def init([]) do
    Phoenix.PubSub.subscribe(SharkAttack.PubSub, "account_updates")
    positions = SharkAttack.AutoClose.get_positions_to_close()

    {:ok, positions}
  end

  # call update_positions on an interval
  def handle_info(:update_positions, _state) do
    IO.inspect("Updating positions")
    {:ok, new_state} = update_positions()
    # Check every minute
    Process.send_after(self(), :update_positions, 60_000)

    {:noreply, new_state}
  end

  # In your handle_info:
  def handle_info({:account_updated, account, account_info}, state) do
    market_positions = get_market_positions(state, account)

    # IO.inspect(market_positions, label: "Market Positions #{account}")

    if length(market_positions) > 0 do
      case SharkAttack.DLMMPools.get_active_bin_id(account_info) do
        %{active_id: pool_bin_id} ->
          # IO.inspect(pool_bin_id, label: "Active Bin ID #{account}")

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

  defp update_positions() do
    positions = SharkAttack.AutoClose.get_positions_to_close()
    {:ok, positions}
  end

  defp get_market_positions(state, account) do
    Enum.filter(state, fn position -> position.pool_address == account end)
  end

  defp should_close_position?(position, pool_bin_id) do
    # Convert exit_bin_id from string to integer
    position_bin_id = String.to_integer(position.exit_bin_id)

    cond do
      position.sell_direction == "BELOW" and position_bin_id < pool_bin_id ->
        true

      position.sell_direction == "ABOVE" and position_bin_id > pool_bin_id ->
        true

      true ->
        false
    end
  end
end
