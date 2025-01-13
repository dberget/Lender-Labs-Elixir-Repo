defmodule SharkAttack.AccountCache do
  use GenServer
  require Logger

  def start_link(opts \\ []) do
    GenServer.start_link(__MODULE__, opts, name: __MODULE__)
  end

  def init([]) do
    generate_table_and_monitor()

    # Start the account fetching in a separate process
    # Task.start_link(fn ->
    accounts = SharkAttack.DLMMPools.get_accounts()
    SharkAttack.SolanaWSPool.subscribe_accounts(accounts)
    # end)

    {:ok, []}
  end

  def get_account(pubkey) do
    :ets.lookup(:accounts, pubkey)
  end

  def generate_table_and_monitor() do
    :ets.new(:accounts, [
      :named_table,
      :public,
      {:read_concurrency, true},
      {:write_concurrency, true}
    ])
  end
end
