defmodule SharkAttack.AccountCache do
  use GenServer
  require Logger

  @refresh_interval :timer.minutes(20)

  def start_link(opts \\ []) do
    GenServer.start_link(__MODULE__, opts, name: __MODULE__)
  end

  def init([]) do
    generate_table_and_monitor()

    accounts = SharkAttack.DLMMPools.get_accounts()
    SharkAttack.SolanaWSPool.startup_subscriptions(accounts)

    schedule_refresh()

    {:ok, []}
  end

  def get_account(pubkey) do
    try do
      case :ets.lookup(:accounts, pubkey) do
        [] -> nil
        [{^pubkey, value}] -> value
        _other -> nil
      end
    rescue
      _ -> nil
    end
  end

  def generate_table_and_monitor() do
    :ets.new(:accounts, [
      :named_table,
      :public,
      {:read_concurrency, true},
      {:write_concurrency, true}
    ])
  end

  def handle_info(:refresh, state) do
    refresh_accounts()
    schedule_refresh()

    {:noreply, state}
  end

  def refresh_accounts do
    Logger.info("Refreshing account subscriptions")
    accounts = SharkAttack.DLMMPools.get_accounts()

    SharkAttack.SolanaWSPool.refresh_subscriptions(accounts)
  end

  defp schedule_refresh do
    Process.send_after(self(), :refresh, @refresh_interval)
  end
end
