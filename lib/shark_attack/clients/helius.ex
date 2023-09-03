defmodule SharkAttack.Clients.Helius do
  @url "https://mainnet.helius-rpc.com/?api-key=8fea9de0-b3d0-4bf4-a1fb-0945dfd91d42"
  @coll "FrZ6UuodANWfw8mMWBggDbQjrjnV8hcAaDVBUWRwwkAY"

  require Logger
  alias SharkAttack.Solana

  def has_turtles(nil), do: 0

  def has_turtles(address, fallback \\ 3) do
    Logger.info("Checking if #{address} has turtles")

    try do
      case SharkAttack.SimpleCache.get(__MODULE__, :count_turtles, [1, [], 0, address, 1000],
             ttl: 60 * 60 * 24
           ) do
        0 ->
          # clear_cache(address)

          0

        :error ->
          clear_cache(address)

          Logger.info("Error fetching assets for #{address}, using #{fallback}")

          fallback

        count ->
          count
      end
    rescue
      _ ->
        Logger.info("Error fetching assets for #{address}, using #{fallback}")

        fallback
    end
  end

  def clear_cache(address) do
    SharkAttack.SimpleCache.delete(__MODULE__, :count_turtles, [1, [], 0, address, 1000])
  end

  def count_turtles(_, assets, _, _, new_asset_count) when new_asset_count < 1000 do
    count_turtles_in_assets(assets)
  end

  def count_turtles(page, assets, total, address, _new_asset_count) do
    case Solana.fetch_assets(address, page) do
      {:ok, new_assets} ->
        new_asset_count = Enum.count(new_assets)

        count_turtles(
          page + 1,
          assets ++ new_assets,
          total + new_asset_count,
          address,
          new_asset_count
        )

      {:error, _} ->
        :error
    end
  end

  defp count_turtles_in_assets(assets) do
    Enum.count(assets, fn %{"creators" => creators} ->
      first_creator = List.first(creators, %{})

      Map.get(first_creator, "address") == @coll
    end)
  end
end
