defmodule SharkAttack.Clients.Helius do
  @url "https://mainnet.helius-rpc.com/?api-key=d250e974-e6c5-4428-a9ca-25f8cd271444"
  @coll "FrZ6UuodANWfw8mMWBggDbQjrjnV8hcAaDVBUWRwwkAY"
  alias SharkAttack.Solana

  def has_turtles(address) do
    case SharkAttack.SimpleCache.get(__MODULE__, :count_turtles, [1, [], 0, address, 1000],
           ttl: 60 * 60
         ) do
      count -> count
    end
  end

  def count_turtles(_, assets, _, _, new_asset_count) when new_asset_count < 1000 do
    count_turtles_in_assets(assets)
  end

  def count_turtles(page, assets, total, address, _new_asset_count) do
    new_assets = Solana.fetch_assets(address, page)

    new_asset_count = Enum.count(new_assets)

    count_turtles(
      page + 1,
      assets ++ new_assets,
      total + new_asset_count,
      address,
      new_asset_count
    )
  end

  defp count_turtles_in_assets(assets) do
    Enum.count(assets, fn %{"creators" => creators} ->
      first_creator = hd(creators)

      first_creator["address"] == @coll
    end)
  end
end
