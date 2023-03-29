defmodule SharkAttack.Notifications.Consumer do
  use GenStage

  def start_link(_initial) do
    GenStage.start_link(__MODULE__, :state_doesnt_matter)
  end

  def init(state) do
    {:consumer, state, subscribe_to: [SharkAttack.Notifications.ProducerConsumer]}
  end

  def handle_events(events, _from, state) do
    # Wait for a second.

    # Inspect the events.
    IO.inspect(events)

    # We are a consumer, so we would never emit items.
    {:noreply, [], state}
  end
end
