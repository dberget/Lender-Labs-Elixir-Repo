defmodule SharkAttack.Frakt do
  def get_liquidity_pools() do
    %{"pools" => pools} =
      SharkAttack.Helpers.do_get_request("https://api.frakt.xyz/liquidity/pools")

    pools
  end

  def save_pools do
    pools = get_liquidity_pools()

    Enum.map(pools, fn pool ->
      data = %{
        name: pool["name"],
        frakt_address: pool["liquidityPoolPubkey"]
      }

      SharkAttack.Collections.get_and_update_collection(data)
    end)
  end
end
