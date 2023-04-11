defmodule SharkAttack.Notifications.ProducerConsumer do
  use GenStage

  alias SharkAttack.Notifications.NotificationHelpers

  def start_link(_initial) do
    GenStage.start_link(__MODULE__, :state_doesnt_matter, name: __MODULE__)
  end

  def init(state) do
    {:producer_consumer, state, subscribe_to: [SharkAttack.Notifications.Producer]}
  end

  def handle_events(events, _from, state) do
    messages =
      Enum.map(events, &NotificationHelpers.build_message(&1["source"], &1["type"], &1))
      |> Enum.reject(&is_nil/1)

    {:noreply, messages, state}
  end
end
