defmodule SharkAttack.Discord do
  use Supervisor

  def start_link(args) do
    Supervisor.start_link(__MODULE__, args, name: __MODULE__)
  end

  @impl true
  def init(_init_arg) do
    children = [DiscordConsumer]

    Supervisor.init(children, strategy: :one_for_one)
  end
end

defmodule SharkAttack.DiscordConsumer do
  use Nostrum.Consumer

  import Nostrum.Struct.Embed
  alias Nostrum.Api

  def start_link do
    Consumer.start_link(__MODULE__)
  end

  def send_message(dm_id, event) do
    IO.inspect(event)

    embed =
      %Nostrum.Struct.Embed{}
      |> put_title("Offer Warning")
      |> put_description(
        "Offer for #{event.orderbook} is #{event.current} and should be #{event.new}, update here: https://lenderlabs.xyz/offer/#{event.loan}"
      )

    Api.create_message!(dm_id, embeds: [embed])
  end

  def handle_info(_event) do
  end

  # def handle_event({:MESSAGE_CREATE, msg, _ws_state}) do
  #   IO.inspect(msg)

  #   case msg.content do
  #     "!sleep" ->
  #       Api.create_message(msg.channel_id, "Going to sleep...")
  #       # This won't stop other events from being handled.
  #       Process.sleep(3000)

  #     "!ping" ->
  #       Api.create_message(msg.channel_id, "pyongyang!")

  #     "!raise" ->
  #       # This won't crash the entire Consumer.
  #       raise "No problems here!"

  #     _ ->
  #       :ignore
  #   end
  # end

  # Default event handler, if you don't include this, your consumer WILL crash if
  # you don't have a method definition for each event type.
  def handle_event(_event) do
    :noop
  end
end
