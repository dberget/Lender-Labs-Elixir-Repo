defmodule SharkAttack.FloorWorker do
  @moduledoc """
  Schedules a timer to check for possible foreclosures every 5 minutes.
  """
  use GenServer

  require Logger

  @floor_fetch_interval (if Mix.env() == :dev do
                           20
                         else
                           5
                         end)

  def start_link(opts) do
    GenServer.start_link(__MODULE__, [], opts)
  end

  @impl true
  def init(state) do
    create_and_hydrate_table()

    :timer.send_interval(:timer.minutes(@floor_fetch_interval), :fetch)

    {:ok, state}
  end

  def create_and_hydrate_table() do
    :ets.new(:floor_prices, [
      :named_table,
      :public,
      :set,
      read_concurrency: true
    ])

    all_collections =
      SharkAttack.Collections.list_collections(%{sharky: "1"})
      |> Enum.map(
        &{&1.id,
         %{
           "floor1h" => 0,
           "floor7d" => 0,
           "floorPrice" => "0",
           "numListed" => 0,
           "sales1h" => 0,
           "sales24h" => 0,
           "sales7d" => 0,
           "volume1h" => "0",
           "volume24h" => 0,
           "volume7d" => 0
         }}
      )

    :ets.insert(:floor_prices, all_collections)

    update_floor_prices()
  end

  @impl true
  def handle_info(:fetch, state) do
    update_floor_prices()

    {:noreply, state}
  end

  def get_volume(nil) do
    nil
  end

  def get_volume(%SharkAttack.Collections.Collection{} = collection) do
    :ets.lookup(:floor_prices, collection.id)
    |> List.first(
      {nil,
       %{
         "floor1h" => 0,
         "floor7d" => 0,
         "floorPrice" => "0",
         "numListed" => 0,
         "sales1h" => 0,
         "sales24h" => 0,
         "sales7d" => 0,
         "volume1h" => "0",
         "volume24h" => 0,
         "volume7d" => 0
       }}
    )
    |> elem(1)
  end

  def get_floor_price(nil) do
    nil
  end

  def get_floor_price(%SharkAttack.Collections.Collection{} = collection) do
    get_floor_price(collection.id)
  end

  def get_floor_price(id) do
    data =
      case :ets.whereis(:floor_prices) do
        :undefined ->
          Logger.info("Floor prices table not found, creating and hydrating")

          # create_and_hydrate_table()

          %{
            "floor1h" => 0,
            "floor7d" => 0,
            "floorPrice" => "0",
            "numListed" => 0,
            "sales1h" => 0,
            "sales24h" => 0,
            "sales7d" => 0,
            "volume1h" => "0",
            "volume24h" => 0,
            "volume7d" => 0
          }

        _ ->
          :ets.lookup(:floor_prices, id)
          |> List.first(
            {nil,
             %{
               "floor1h" => 0,
               "floor7d" => 0,
               "floorPrice" => "0",
               "numListed" => 0,
               "sales1h" => 0,
               "sales24h" => 0,
               "sales7d" => 0,
               "volume1h" => "0",
               "volume24h" => 0,
               "volume7d" => 0
             }}
          )
          |> elem(1)
      end

    fp_lamports = data |> Map.get("floorPrice", "0")

    floor =
      unless fp_lamports == "0" or is_nil(fp_lamports) do
        {floor, ""} = fp_lamports |> Float.parse()
        floor / 1_000_000_000
      end

    floor
  end

  def update_floor_prices() do
    all_collections = SharkAttack.Collections.list_collections()

    all_collections
    |> SharkAttack.Tensor.get_floor_prices()
    |> Enum.each(fn {collection, %{stats: stats}} ->
      all_collections
      |> Enum.filter(&(&1.me_slug == collection))
      |> Enum.each(fn token ->
        :ets.insert(:floor_prices, {token.id, stats})
      end)
    end)
  end
end
