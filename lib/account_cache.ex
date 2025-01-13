defmodule SharkAttack.AccountCache do
  use GenServer
  require Logger

  def start_link(opts \\ []) do
    GenServer.start_link(__MODULE__, opts, name: __MODULE__)
  end

  def init([]) do
    generate_table()

    # Task.start(fn ->
    # {:ok, ws_pid} = SharkAttack.SolanaWS.start_link([])
    accounts = SharkAttack.DLMMPools.get_accounts()
    SharkAttack.SolanaWSPool.subscribe_accounts(accounts)
    # end)

    {:ok, []}
  end

  def get_account(pubkey) do
    :ets.lookup(:accounts, pubkey)
  end

  def generate_table() do
    :ets.new(:accounts, [
      :public,
      :named_table,
      {:read_concurrency, true},
      {:write_concurrency, true}
    ])
  end
end
