defmodule SharkAttack.DiscordConsumer do
  use Nostrum.Consumer

  import Nostrum.Struct.Embed
  alias Nostrum.Api

  require Logger

  @gibbers [
    451_888_759_865_081_866,
    186_591_084_728_549_377,
    171_430_746_261_553_152,
    665_516_900_612_177_941
  ]

  @commands [
    {"subscribe", "Subscribe to notifications.",
     [
       %{
         name: "account",
         description: "account to subscribe with",
         type: 3
       }
     ]},
    {"gib", "Give user access to dashboard",
     [
       %{
         name: "account",
         description: "account to gib access to",
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
      "1104834748901245000",
      "GDkUYp1-w4h1e5KFFse2VlXJuHWaqVO9457ptCVe0Zx7DV1gdaq4alMCmXRYdNPGnG5m",
      %{embeds: [embed]}
    )
  end

  # demise - ChestDefi
  def send_to_webhook(
        "4fUWRM3EKQJuZnNbHdSdd22gMnEosMRMBTGB41Sq7bED",
        embed
      ) do
    Api.execute_webhook(
      "1098674544589414462",
      "5Pchc3sTCx0pRE5hp5RdaGbGv2d05YCOVUGMDkzM78vxBFwXjrpwd9EhougYKMGEzRnJ",
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

  # Zini
  def send_to_webhook(
        "CQenkRQMkJ3sXBGUu4fJNXDZUu23k7B556JnV1ZNrxik",
        embed
      ) do
    Api.execute_webhook(
      "1112022631345045586",
      "ZUEtAwrt1IccRaQHOP-nPEWWLbRIGHJ75S2XScU9Gzs3KgXguefBQLAPmFKdg8evlLZS",
      %{embeds: [embed]}
    )
  end

  # P3
  def send_to_webhook(
        "428JqXgFg3yjuMoa4ZkKi7MBJLn2thvpSTH6HS2NLQC1",
        embed
      ) do
    Api.execute_webhook(
      "1114274739641393253",
      "2jgmy4jfiYhA0NS2ctMFZA7drTkUn2zIdIi-JQikw8DSEYGvo-qa8gaaxnfQ41gmmURz",
      %{embeds: [embed]}
    )
  end

  # Akhil - Suites Dao
  def send_to_webhook(
        "8LyGPy9jPYhtr1FYWG9WAjTzyuZvBMKRsFjnpDGAuLf7",
        embed
      ) do
    Api.execute_webhook(
      "1107684503872356423",
      "3Lj8pYB9up87K_Iz3841vtE9s2uzNSLG6QBeesYGnnacIZLBmWMzTjK-z5QULnLN2jN1",
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
      data: %Nostrum.Struct.ApplicationCommandInteractionData{options: options, name: name}
    } = interaction

    [
      %Nostrum.Struct.ApplicationCommandInteractionDataOption{
        name: "account",
        value: account
      }
    ] = options

    discordId = interaction.member.user.id

    handle_command(name, account, discordId, interaction)
  end

  # Default event handler, if you don't include this, your consumer WILL crash if
  # you don't have a method definition for each event type.
  def handle_event(_event) do
    :noop
  end

  def handle_command("subscribe", account, discordId, interaction) do
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

  def handle_command("gib", account, discordId, interaction) when discordId in @gibbers do
    case SharkAttack.Users.create_user(account) do
      :ok ->
        Api.create_interaction_response(interaction, %{
          type: 4,
          data: %{content: "Access Granted!"}
        })

      _ ->
        Api.create_interaction_response(interaction, %{
          type: 4,
          data: %{content: "Error granting access"}
        })
    end
  end

  def handle_command(_name, _account, _discordId, interaction) do
    Api.create_interaction_response(interaction, %{
      type: 4,
      data: %{content: "Error"}
    })
  end
end
