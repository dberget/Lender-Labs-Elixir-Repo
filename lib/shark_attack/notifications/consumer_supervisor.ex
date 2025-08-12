defmodule SharkAttack.ConsumerSupervisor do
  use ConsumerSupervisor

  def start_link(arg) do
    ConsumerSupervisor.start_link(__MODULE__, arg)
  end

  def init(_arg) do
    children = [
      %{
        id: SharkAttack.Notifications.Consumer,
        start: {SharkAttack.Notifications.Consumer, :start_link, []},
        restart: :transient
      }
    ]

    opts = [
      strategy: :one_for_one,
      subscribe_to: [{SharkAttack.EventBroadcaster, max_demand: 50}]
    ]

    {:ok, children, opts}
  end
end
