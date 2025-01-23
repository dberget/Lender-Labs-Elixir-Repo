defmodule SharkAttack.AccountMonitor do
  use GenServer
  require Logger

  def start_link(opts \\ []) do
    GenServer.start_link(__MODULE__, [], opts)
  end

  def init([]) do
    Phoenix.PubSub.subscribe(SharkAttack.PubSub, "account_updates")
    positions = SharkAttack.AutoClose.get_positions_to_close()
    # Start the cleanup check
    # Check every 5 minutes
    Process.send_after(self(), :cleanup_positions, 300_000)
    Process.send_after(self(), :update_positions, 60_000)

    {:ok, positions}
  end

  # call update_positions on an interval
  def handle_info(:update_positions, _state) do
    IO.inspect("Updating positions")
    # check_positions()
    {:ok, new_state} = update_positions()
    # Check every minute
    Process.send_after(self(), :update_positions, 60_000)

    {:noreply, new_state}
  end

  def handle_info(:cleanup_positions, _state) do
    IO.inspect("Cleaning up positions")
    SharkAttack.AutoClose.cleanup_closed_positions()

    {:ok, new_state} = update_positions()
    # Schedule next cleanup
    Process.send_after(self(), :cleanup_positions, 300_000)

    {:noreply, new_state}
  end

  # In your handle_info:
  def handle_info({:account_updated, account, account_info}, state) do
    market_positions = get_market_positions(state, account)

    if length(market_positions) > 0 do
      IO.inspect(SharkAttack.DLMMPools.get_active_bin_id(account_info),
        label: "Active Bin ID #{account}"
      )

      # Gets full DLMM position on-chain data from node repo.
      # dlmm_position_data =
      # SharkAttack.DLMMPools.get_dlmm_position_data(account, hd(market_positions))
      # |> IO.inspect(label: "DLMM Position Data #{account}")

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

  def update_positions() do
    positions = SharkAttack.AutoClose.get_positions_to_close()

    {:ok, positions}
  end

  # Check all positions and close any that aren't being updated correctly by :account_update
  def check_positions() do
    positions = SharkAttack.AutoClose.get_positions_to_close()

    for position <- positions do
      if position.status == "ACTIVE" do
        dlmm_position_data =
          SharkAttack.DLMMPools.get_dlmm_position_data(position.pool_address, position)
          |> IO.inspect(label: "DLMM Position Data #{position.pool_address}")

        # pool_bin_id =
        #   SharkAttack.DLMMPools.get_active_bin_id(dlmm_position_data)
        #   |> IO.inspect(label: "Active Bin ID #{position.pool_address}")

        # should_close_position?(position, pool_bin_id)
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

    SharkAttack.DiscordConsumer.send_to_webhook(
      "me",
      "Closing position #{position.pool_address} because #{pool_bin_id} is #{String.downcase(position.sell_direction)} #{exit_bin_id}"
    )

    should_close
  end
end
