defmodule SharkAttack.AccountMonitor do
  use GenServer
  require Logger

  def start_link(opts \\ []) do
    GenServer.start_link(__MODULE__, [], opts)
  end

  def init([]) do
    Phoenix.PubSub.subscribe(SharkAttack.PubSub, "account_updates")

    {:ok, []}
  end

  # In your handle_info:
  def handle_info({:account_updated, _account, _account_info}, state) do
    # bin_id = SharkAttack.DLMMPools.get_active_bin_id(account_info)

    # IO.inspect(bin_id, label: "Active Bin ID #{account}")
    # ADD CODE HERE FOR closing positions.

    {:noreply, state}
  end
end
