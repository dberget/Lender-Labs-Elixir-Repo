defmodule SharkAttack.FloorWorker do
  @moduledoc """
  Schedules a timer to check for possible foreclosures every 5 minutes.
  """
  use GenServer

  require Logger

  def start_link(opts) do
    GenServer.start_link(__MODULE__, [], opts)
  end

  @impl true
  def init(state) do
    :ets.new(:floor_prices, [
      :named_table,
      :public,
      :set,
      read_concurrency: true,
      write_concurrency: true
    ])

    all_collections =
      SharkAttack.Collections.list_collections(%{sharky: "1"}) |> Enum.map(&{&1.id, 0})

    :ets.insert(:floor_prices, all_collections)

    :timer.send_after(1, :fetch)

    :timer.send_interval(300_000, :fetch)

    {:ok, state}
  end

  @impl true
  def handle_info(:fetch, state) do
    update_floor_prices()

    {:noreply, state}
  end

  def update_floor_prices() do
    all_collections = SharkAttack.Collections.list_collections(%{sharky: "1"})

    all_collections
    |> SharkAttack.Hyperspace.get_floor_prices()
    |> Enum.each(fn {collection, %{fp: fp}} ->
      all_collections
      |> Enum.filter(&(&1.hyperspace_id == collection))
      |> Enum.each(fn token ->
        :ets.insert(:floor_prices, {token.id, fp})
      end)
    end)
  end
end
