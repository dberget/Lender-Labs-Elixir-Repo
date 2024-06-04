defmodule SharkAttack.AccountCache do
  use GenServer
  require Logger

  def start_link(opts \\ []) do
    GenServer.start_link(__MODULE__, opts, name: __MODULE__)
  end

    def init([]) do
    generate_table()

      Task.start(fn ->
      SharkAttack.DLMMPools.get_accounts()
      |> GeyserClient.account_subscribe(fn a -> update_cache(a) end)
    end)

    {:ok, []}
  end

  def get_account(pubkey) do
    :ets.lookup(:accounts, pubkey)
  end

  def update_cache(%Geyser.SubscribeUpdate{
        filters: ["accounts"],
        update_oneof: {:account, accountInfo},
        __unknown_fields__: []
      }) do
    :ets.insert(:accounts, {B58.encode58(accountInfo.account.pubkey), accountInfo.account})
  end

  def update_cache(_) do
    :no_op
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
