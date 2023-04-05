defmodule SharkAttack.Notifications.Producer do
  use GenStage

  def start_link(initial \\ []) do
    GenStage.start_link(__MODULE__, initial, name: __MODULE__)
  end

  def init(state), do: {:producer, state}

  def handle_demand(demand, state) do
    {to_dispatch, remaining} = Enum.split(state, demand)

    events = []

    {:noreply, events, remaining ++ to_dispatch}
  end

  def handle_info(_, state), do: {:noreply, [], state}

  # public endpoint for events adding
  def add(events), do: GenServer.cast(__MODULE__, {:add, events})

  # just push events to consumers on adding
  def handle_cast({:add, events}, state) when is_list(events) do
    {:noreply, events, state}
  end

  def handle_cast({:add, events}, state), do: {:noreply, [events], state}
end
