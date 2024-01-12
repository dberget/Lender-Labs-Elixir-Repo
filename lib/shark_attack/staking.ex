defmodule SharkAttack.Staking do
  alias SharkAttack.Clients.Helius

  def stake_awards() do
    get_staked_turtles()
    |> Enum.group_by(& &1["ownership"]["owner"])
    |> Enum.map(fn {address, turtles} ->
      award_points(address, turtles)
    end)
  end

  def reset_staked_turtles_cache() do
    SharkAttack.SimpleCache.delete(__MODULE__, :get_staked_turtles, [])
  end

  def get_staked_turtle_count() do
    case SharkAttack.SimpleCache.get(__MODULE__, :get_staked_turtles, [], ttl: 60 * 60) do
      0 ->
        0

      :error ->
        0

      count ->
        count
    end
    |> Enum.count()
  end

  def get_staked_turtles do
    Helius.get_turtles()
    |> Enum.filter(
      &(&1["ownership"]["delegate"] == "FLshW3pj5KWt4S5JDnsHiFqoUu8WK8S8JhVHp5L9rC6x")
    )
  end

  def get_stake_awards(lender) do
    SharkAttack.Points.get_points_from_event_type(lender, "STAKE")
  end

  defp award_points(address, turtles) do
    points = Enum.count(turtles)

    IO.inspect("Awarding #{points} points to #{address}")

    # slice first 3 characters and combine into a string so we can store which nfts are staked in the DB
    turtle_addresses =
      Enum.map(turtles, & &1["id"]) |> Enum.map(&String.slice(&1, 0..2)) |> Enum.join()

    SharkAttack.Points.create(%{
      event_type: "STAKE",
      address: address,
      amount: points,
      source: turtle_addresses,
      platform: "LL"
    })
  end
end
