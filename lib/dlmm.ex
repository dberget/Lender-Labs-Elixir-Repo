defmodule SharkAttack.DLMMPools do
  alias SharkAttack.Repo
  alias SharkAttack.Defi.DLMM
  import SharkAttack.Helpers

  def update_pools_api() do
    res = do_get_request("https://app.meteora.ag/clmm-api/pair/all_by_groups")
    pools = list_pools() |> Enum.map(&Map.get(&1, :address))

    res["groups"]
    |> Enum.each(fn group ->
      group["pairs"]
      |> Enum.each(fn pair ->
        unless Enum.any?(pools, &(&1 == pair["address"])) do
          create_pool(pair)
        end
      end)
    end)
  end

  def list_pools() do
    Repo.all(DLMM)
  end

  def create_pool(attrs) do
    DLMM.changeset(%DLMM{}, attrs)
    |> Repo.insert()
  end
end
