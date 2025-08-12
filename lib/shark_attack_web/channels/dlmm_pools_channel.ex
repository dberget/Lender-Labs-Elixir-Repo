defmodule SharkAttackWeb.DLMMPoolsChannel do
  use Phoenix.Channel
  alias SharkAttack.{DLMMPools, AccountMonitor}
  require Logger

  def join("room:dlmm_pools:" <> pool_address, _message, socket) do
    Logger.info("Joining pool channel: #{pool_address}")

    # Subscribe to specific account updates
    Phoenix.PubSub.subscribe(SharkAttack.PubSub, "account_updates:#{pool_address}")

    # Get initial pool state
    %{active_id: bin_id} = DLMMPools.get_pool_state(pool_address)
    activity_count = AccountMonitor.get_pool_activity(pool_address)

    # Return the initial state
    {:ok,
     %{
       address: pool_address,
       data: %{
         bin_id: bin_id,
         activity: activity_count
       },
       activity: activity_count
     }, assign(socket, :pool_address, pool_address)}
  end

  def handle_info({:account_updated, account, _raw_account_data}, socket) do
    # Get state for the pool
    %{active_id: bin_id} = DLMMPools.get_pool_state(account)
    activity_count = AccountMonitor.get_pool_activity(account)

    # Push update for the pool
    push(socket, "pool_update", %{
      address: account,
      data: %{
        bin_id: bin_id,
        activity: activity_count
      }
    })

    {:noreply, socket}
  end
end
