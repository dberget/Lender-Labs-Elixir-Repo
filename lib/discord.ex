defmodule SharkAttack.DiscordConsumer do
  use Nostrum.Consumer

  import Nostrum.Struct.Embed
  alias Nostrum.Api

  require Logger

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

  def send_to_webhook("me", message) do
    embed =
      %Nostrum.Struct.Embed{}
      |> put_title("Logging")
      |> put_description(message)

    # LenderLabs
    Api.execute_webhook(
      "1079515258529521725",
      "x_7FSTVA4q4iNUJ6OAgj_i5lAK-dCxzUzP_sUS40W8QCZC28p7hZLgAVapJfssXxN7zu",
      %{embeds: [embed]}
    )
  end

  # anthonypacheco
  def send_to_webhook(
        "4skxqydEdR5C1BMshJKmVW1D6sxvZPK9ABVFPuBSsWbK",
        embed
      ) do
    Api.execute_webhook(
      "1079918781146611832",
      "F75SBFvGVtxeLL7ftOOWKOfdHFUc3WJ-uTLmMwKyM1ujHwTfD_8NIF8yW7yuqh8d9ANk",
      %{embeds: [embed]}
    )
  end

  # burnskyle56
  def send_to_webhook(
        "8UaxGpbtgvg7FhwRaAHaHxZBy1ZWGBJQ2xSkPTCSjQ6A",
        embed
      ) do
    Api.execute_webhook(
      "1099115998990307360",
      "upeAVDXkoe09CRM3qS-_eYMPubjXaF8vXoP9xBjAriUMkQ8i_VMQTUwvACgW1HYMTzv4",
      %{embeds: [embed]}
    )
  end

  # Cherry - Money Dao
  def send_to_webhook(
        "Dv4q71A4wot5HiTt1o1WizokuVinV9iZepdDCnxkXsrG",
        embed
      ) do
    Api.execute_webhook(
      "1097720750791741500",
      "maTGVGXJMJqIs2wgncoFBlRAft37R7OZ_nErrs8-hGRYnBAmoSizc85MTiIm1uQIp_am",
      %{embeds: [embed]}
    )
  end

  def send_to_webhook(:foreclosure, embed) do
    Api.execute_webhook(
      "1078718321370865808",
      "tPsSVIJ7VEKGz635sRrBzdXOHUgZVksvKHfcr4q4iZEzZAmbbkvMGxjZy45SzB1a0NC9",
      %{
        embeds: [embed],
        username: "Lender Labs Foreclosure Bot",
        avatar_url:
          "https://cdn.discordapp.com/icons/1064681179367870475/86f082809a9b54dfe68109e1aa074736.jpg"
      }
    )

    # Zaker - ChestFi
    Api.execute_webhook(
      "1095507780749758585",
      "hl8z0pQ2AQTmbqOeS8Kf3rIHdKL9OmMlYR_LhaN8R4TfLbrw_Z73VE0mzIKTsAoWMCK3",
      %{
        embeds: [embed],
        username: "Lender Labs Foreclosure Bot",
        avatar_url:
          "https://cdn.discordapp.com/icons/1064681179367870475/86f082809a9b54dfe68109e1aa074736.jpg"
      }
    )
  end

  def send_raw_message(_dm_id, nil) do
    Logger.info("No message to send")
    nil
  end

  def send_raw_message(dm_id, embed) do
    Api.create_message(dm_id, embeds: [embed])
  end

  def send_message(dm_id, %{collection: collection, position: 0}) do
    embed =
      %Nostrum.Struct.Embed{}
      |> put_title("Offer Update")
      |> put_description("Your have the best offer for #{collection}!")

    Api.create_message(dm_id, embeds: [embed])
  end

  def send_message(dm_id, %{collection: collection, position: position}) do
    embed =
      %Nostrum.Struct.Embed{}
      |> put_title("Offer Update")
      |> put_description(
        "Offer for #{collection} is #{Number.Human.number_to_ordinal(position)}, update: https://lenderlabs.xyz/"
      )

    Api.create_message(dm_id, embeds: [embed])
  end

  def send_foreclosure_msg(dm_id, minutesFromDefault) do
    embed =
      %Nostrum.Struct.Embed{}
      |> put_title("Foreclosure Alert")
      |> put_description(
        "Loan is #{minutesFromDefault} minutes from foreclosure, collect: https://lenderlabs.xyz/"
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

  def handle_event({:INTERACTION_CREATE, interaction, _ws_state}) do
    %Nostrum.Struct.Interaction{
      data: %Nostrum.Struct.ApplicationCommandInteractionData{options: options}
    } = interaction

    [
      %Nostrum.Struct.ApplicationCommandInteractionDataOption{
        name: "account",
        value: account
      }
    ] = options

    discordId = interaction.member.user.id

    case SharkAttack.Users.get_user_from_address!(account) do
      %SharkAttack.Accounts.User{} = user ->
        SharkAttack.Users.update_user(user, %{discordId: discordId})
        Api.create_interaction_response(interaction, %{type: 4, data: %{content: "Subscribed!"}})

      nil ->
        Api.create_interaction_response(interaction, %{
          type: 4,
          data: %{content: "Error subscribing"}
        })
    end
  end

  # Default event handler, if you don't include this, your consumer WILL crash if
  # you don't have a method definition for each event type.
  def handle_event(_event) do
    :noop
  end
end
