defmodule SharkAttack.AccountCache do
  def generate_table() do
    :ets.new(:accounts, [
      :public,
      :named_table,
      {:read_concurrency, true},
      {:write_concurrency, true}
    ])
  end
end
