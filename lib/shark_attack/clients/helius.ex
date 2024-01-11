defmodule SharkAttack.Clients.Helius do
  # @url "https://mainnet.helius-rpc.com/?api-key=8fea9de0-b3d0-4bf4-a1fb-0945dfd91d42"
  import SharkAttack.Helpers

  @coll "FrZ6UuodANWfw8mMWBggDbQjrjnV8hcAaDVBUWRwwkAY"

  require Logger
  alias SharkAttack.Solana

  def has_turtles(nil), do: 0

  def has_turtles(address, fallback \\ 3) do
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
    Logger.info("Fetching assets for #{address} page #{page}")

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
    Enum.count(assets, fn %{"creators" => creators, "ownership" => ownership} ->
      first_creator = List.first(creators, %{})

      Map.get(first_creator, "address") == @coll and
        Map.get(ownership, "delegate", "") !== "FLshW3pj5KWt4S5JDnsHiFqoUu8WK8S8JhVHp5L9rC6x"
    end)
  end

  def get_turtles() do
    get_turtles(1, [], 1000)
  end

  def get_turtles(_page, assets, result_count) when result_count < 1000 do
    assets
  end

  def get_turtles(page, assets, _result_count) do
    case Solana.fetch_creator_assets(@coll, page) do
      {:ok, new_assets} ->
        get_turtles(
          page + 1,
          assets ++ new_assets,
          new_assets |> Enum.count()
        )

      {:error, _} ->
        :error
    end
  end

  def get_native_balance(address) do
    case SharkAttack.SimpleCache.get(__MODULE__, :native_balance, [address], ttl: 60 * 60 * 24) do
      0 ->
        0

      :error ->
        Logger.info("Error fetching native balance for #{address}")

        0

      balance ->
        balance
    end
  end

  def native_balance(address) do
    Logger.info("Fetching native balance for #{address}")

    case Solana.fetch_native_balance(address) do
      {:error, _} ->
        :error

      balance ->
        balance
    end
  end

  def parse_transactions(transactions) do
    url = "https://api.helius.xyz/v0/transactions/?api-key=8fea9de0-b3d0-4bf4-a1fb-0945dfd91d42"

    params = %{
      "transactions" => transactions
    }

    do_post_request(url, params)
  end
end
