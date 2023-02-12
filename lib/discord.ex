defmodule SharkAttack.Discord do
  use Supervisor

  def start_link(args) do
    Supervisor.start_link(__MODULE__, args, name: __MODULE__)
  end

  @impl true
  def init(_init_arg) do
    children = [SharkAttack.DiscordConsumer]

    Supervisor.init(children, strategy: :one_for_one)
  end
end

defmodule SharkAttack.DiscordConsumer do
  use Nostrum.Consumer

  import Nostrum.Struct.Embed
  alias Nostrum.Api

  @commands [
    {"subscribe", "Subscribe to notifications.",
     [
       %{
         name: "account",
         description: "account to subscribe with",
         type: 3
       }
     ]}
  ]

  def start_link do
    Consumer.start_link(__MODULE__)
  end

  def create_guild_commands(guild_id) do
    Enum.each(@commands, fn {name, description, options} ->
      Api.create_guild_application_command(1_073_807_738_007_732_245, guild_id, %{
        name: name,
        description: description,
        options: options
      })
    end)
  end

  def create_dm_channel(discordId) do
    {:ok, %Nostrum.Struct.Channel{id: id}} = Api.create_dm(discordId)

    id
  end

  def send_message(dm_id, event) do
    embed =
      %Nostrum.Struct.Embed{}
      |> put_title("Offer Warning")
      |> put_description(
        "Offer for #{event.orderbook} is #{event.current} and should be #{event.new}, update here: https://lenderlabs.xyz/offer/#{event.loan}"
      )

    Api.create_message!(dm_id, embeds: [embed])
  end

  def handle_info(_event) do
    :noop
  end

  def handle_event({:READY, %{guilds: guilds} = _event, _ws_state}) do
    guilds
    |> Enum.map(fn guild -> guild.id end)
    |> Enum.each(&create_guild_commands/1)
  end

  # def handle_event({:MESSAGE_CREATE, msg, _ws_state}) do
  #   case msg.content do
  #     "!sleep" ->
  #       Api.create_message(msg.channel_id, "Going to sleep...")
  #       # This won't stop other events from being handled.
  #       Process.sleep(3000)

  #     "!ping" ->
  #       Api.create_message(msg.channel_id, "!pong")

  #     "!raise" ->
  #       # This won't crash the entire Consumer.
  #       raise "No problems here!"

  #     _ ->
  #       :ignore
  #   end
  # end

  def handle_event({:INTERACTION_CREATE, interaction, _ws_state}) do
    IO.inspect(interaction)
    # Run the command, and check for a response message, or default to a checkmark emoji
    # message =
    #   case do_command(interaction) do
    #     {:msg, msg} -> msg
    #     _ -> ":white_check_mark:"
    #   end

    Api.create_interaction_response(interaction, %{type: 4, data: %{content: "Subscribed!"}})
  end

  # Default event handler, if you don't include this, your consumer WILL crash if
  # you don't have a method definition for each event type.
  def handle_event(_event) do
    :noop
  end
end
