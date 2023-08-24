defmodule SharkAttack.Notifications.NotificationHelpers do
  require Logger

  alias SharkAttack.Collections
  alias SharkAttack.Collections.Nft
  alias SharkAttack.Accounts.{User, UserSettings}

  @dao_webook_addresses [
    "4skxqydEdR5C1BMshJKmVW1D6sxvZPK9ABVFPuBSsWbK",
    "Dv4q71A4wot5HiTt1o1WizokuVinV9iZepdDCnxkXsrG",
    "8UaxGpbtgvg7FhwRaAHaHxZBy1ZWGBJQ2xSkPTCSjQ6A",
    "4fUWRM3EKQJuZnNbHdSdd22gMnEosMRMBTGB41Sq7bED",
    "8LyGPy9jPYhtr1FYWG9WAjTzyuZvBMKRsFjnpDGAuLf7",
    "CQenkRQMkJ3sXBGUu4fJNXDZUu23k7B556JnV1ZNrxik",
    "428JqXgFg3yjuMoa4ZkKi7MBJLn2thvpSTH6HS2NLQC1",
    "4z9xKYvpNqgRaTqJYgBy2etjG5nwpNFV3kykmZrSznBh",
    "9XNM15JpPsrWEJY5khpkZVPpm5efV8xwP5dKJK1Kizng",
    "DaoSLP3h2ubiXqt7XS64E9xp4XrVjH3DXfr3TMjcL964",
    "6uvQA5YweWbKJ9RFvY4wLzVgoqwKj1LFuAvEZbExroHs"
  ]

  def send_message({:foreclosure, lender, embed}) do
    SharkAttack.DiscordConsumer.send_to_webhook(
      :foreclosure,
      embed
    )

    case lender in @dao_webook_addresses do
      true ->
        send_message({:dao, lender, embed})

      _ ->
        :ok
    end
  end

  def send_message({:dao, address, embed}) do
    address
    |> SharkAttack.DiscordConsumer.send_to_webhook(embed)
  end

  def send_message({:user, discordId, embed}) do
    discordId
    |> SharkAttack.DiscordConsumer.create_dm_channel()
    |> SharkAttack.DiscordConsumer.send_raw_message(embed)
  end

  def check_is_user_and_subscribed?(address, setting) do
    with %User{} = user <-
           SharkAttack.Users.get_user_from_address!(
             address,
             :user_settings
           ),
         %User{address: pk, discordId: discordId, user_settings: %UserSettings{} = settings} <-
           user,
         false <- is_nil(discordId),
         true <- SharkAttack.Clients.Helius.has_turtles(pk, 3) >= 3,
         {:ok, true} <-
           Map.fetch(settings, setting) do
      {:user, discordId}
    else
      _ -> is_subscribed_dao?(address)
    end
  end

  def is_subscribed_dao?(address) do
    case address in @dao_webook_addresses do
      true ->
        {:dao, address}

      _ ->
        false
    end
  end

  def build_message("REPAY_LOAN", loan) do
    lender = Map.get(loan, :lender, Map.get(loan, "lender"))

    case check_is_user_and_subscribed?(
           lender,
           :loan_repaid
         ) do
      false ->
        nil

      {:dao, address} ->
        {:dao, address, build_repaid_loan_embed(loan)}

      {:user, discordId} ->
        {:user, discordId, build_repaid_loan_embed(loan)}
    end
  end

  def build_message("UNKNOWN", loan) do
    Logger.warn("Unknown loan: #{inspect(loan)}")
    # repaid_lender = event["instructions"] |> Enum.at(1) |> Map.get("accounts") |> Enum.at(3)
    # new_lender = event["instructions"] |> Enum.at(1) |> Map.get("accounts") |> Enum.at(4)

    # loan_address =
    #   event
    #   |> Map.get("instructions")
    #   |> Enum.at(1)
    #   |> Map.get("accounts", [])
    #   |> Enum.at(1)

    # case check_is_user_and_subscribed?(
    #        repaid_lender,
    #        :loan_repaid
    #      ) do
    #   false ->
    #     nil

    #   {:dao, address} ->
    #     {:dao, address, build_repaid_loan_embed(event)}
    #     |> SharkAttack.Notifications.NotificationHelpers.send_message()

    #   {:user, discordId} ->
    #     {:user, discordId, build_repaid_loan_embed(event)}
    #     |> SharkAttack.Notifications.NotificationHelpers.send_message()
    # end

    # case check_is_user_and_subscribed?(
    #        new_lender,
    #        :loan_taken
    #      ) do
    #   false ->
    #     nil

    #   {:dao, address} ->
    #     {:dao, address, build_take_loan_embed(event)}

    #   {:user, discordId} ->
    #     {:user, discordId, build_take_loan_embed(event)}
    # end
  end

  def build_message("TAKE_LOAN", loan) do
    lender = Map.get(loan, :lender, Map.get(loan, "lender"))

    case check_is_user_and_subscribed?(
           lender,
           :loan_taken
         ) do
      false ->
        nil

      {:dao, address} ->
        {:dao, address, build_take_loan_embed(loan)}

      {:user, discordId} ->
        {:user, discordId, build_take_loan_embed(loan)}
    end
  end

  def build_message("FORECLOSE_LOAN", loan) do
    orderBook = Map.get(loan, :orderBook, Map.get(loan, "orderBook"))
    lender = Map.get(loan, :lender, Map.get(loan, "lender"))

    c =
      case SharkAttack.Collections.get_collection(orderBook) do
        nil ->
          %Collections.Collection{
            id: nil,
            name: "Unknown",
            logo: nil
          }

        c ->
          c
      end

    nft = SharkAttack.Nfts.get_nft_by_mint(loan.nftCollateralMint)
    fp = SharkAttack.FloorWorker.get_floor_price(c) |> Number.Delimit.number_to_delimited()

    amount = parse_amount(loan)
    name = parse_name(nft, c)

    pubkey = Map.get(loan, :pubkey, Map.get(loan, "pubkey", Map.get(loan, :loan, "unknown")))

    embed = %Nostrum.Struct.Embed{
      thumbnail: %Nostrum.Struct.Embed.Thumbnail{
        url: get_thumbnail_url(c)
      },
      title: "**#{name}** Foreclosure",
      color: 5_815_448,
      url: "https://solscan.io/account/#{pubkey}",
      fields: [
        %Nostrum.Struct.Embed.Field{
          name: "Loan Value",
          value: "#{Number.Delimit.number_to_delimited(amount)} ◎",
          inline: true
        },
        %Nostrum.Struct.Embed.Field{
          name: "Floor Price",
          value: "#{fp} ◎",
          inline: true
        }
      ]
    }

    {:foreclosure, lender, embed}
  end

  def build_message(_, _event) do
    nil
  end

  def build_take_loan_embed(loan) do
    c =
      case SharkAttack.Collections.get_collection(Map.get(loan, "orderBook")) do
        nil ->
          %Collections.Collection{
            id: nil,
            name: "Unknown",
            logo: nil
          }

        c ->
          c
      end

    nft = SharkAttack.Nfts.get_nft_by_mint(Map.get(loan, "nftCollateralMint"))
    fp = SharkAttack.FloorWorker.get_floor_price(c)

    pubkey = Map.get(loan, :pubkey, Map.get(loan, "pubkey", Map.get(loan, :loan, "unknown")))

    platform =
      Map.get(loan, :platform, Map.get(loan, "platform", Map.get(loan, :loan, "unknown")))

    ltf = parse_ltf(loan, fp)

    %Nostrum.Struct.Embed{
      author: %Nostrum.Struct.Embed.Author{
        name: "Lender Labs",
        url: "https://lenderlabs.xyz"
      },
      thumbnail: %Nostrum.Struct.Embed.Thumbnail{
        url: get_thumbnail_url(c)
      },
      url: "https://solscan.io/account/#{pubkey}",
      title: "**#{parse_name(nft, c)}** Offer Accepted",
      color: 5_815_448,
      fields: [
        %Nostrum.Struct.Embed.Field{
          name: "Loan Value",
          value: "#{Number.Delimit.number_to_delimited(parse_amount(loan))} ◎",
          inline: true
        },
        %Nostrum.Struct.Embed.Field{
          name: "Interest",
          value: "#{Number.Delimit.number_to_delimited(parse_earnings(loan))} ◎",
          inline: true
        },
        %Nostrum.Struct.Embed.Field{
          name: "Floor Price",
          value: "#{fp |> Number.Delimit.number_to_delimited()}  ◎",
          inline: true
        },
        %Nostrum.Struct.Embed.Field{name: "Platform", value: "#{platform}", inline: true},
        %Nostrum.Struct.Embed.Field{name: "LTF", value: ltf, inline: true}
      ]
    }
  end

  defp build_repaid_loan_embed(loan) do
    orderBook = Map.get(loan, :orderBook, Map.get(loan, "orderBook"))

    c =
      case SharkAttack.Collections.get_collection(orderBook) do
        nil ->
          %Collections.Collection{
            id: nil,
            name: "Unknown",
            logo: nil
          }

        c ->
          c
      end

    nft = SharkAttack.Nfts.get_nft_by_mint(Map.get(loan, :nftCollateralMint))

    duration = :os.system_time(:second) - Map.get(loan, :start, 0)

    pubkey = Map.get(loan, :pubkey, Map.get(loan, "pubkey", Map.get(loan, :loan, "unknown")))

    %Nostrum.Struct.Embed{
      author: %Nostrum.Struct.Embed.Author{
        name: "Lender Labs",
        url: "https://lenderlabs.xyz"
      },
      thumbnail: %Nostrum.Struct.Embed.Thumbnail{
        url: get_thumbnail_url(c)
      },
      title: "**#{parse_name(nft, c)}** Loan Repaid",
      color: 5_815_448,
      url: "https://solscan.io/account/#{pubkey}",
      fields: [
        %Nostrum.Struct.Embed.Field{
          name: "Loan Value",
          value: "#{Number.Delimit.number_to_delimited(parse_amount(loan))} ◎",
          inline: true
        },
        %Nostrum.Struct.Embed.Field{
          name: "Interest",
          value: "#{Number.Delimit.number_to_delimited(parse_earnings(loan))} ◎",
          inline: true
        },
        %Nostrum.Struct.Embed.Field{
          name: "Duration",
          value:
            Timex.Duration.from_erl({0, round(duration), 0})
            |> Timex.format_duration(:humanized)
        }
      ]
    }
  end

  defp parse_ltf(
         _,
         0
       ) do
    "N/A"
  end

  defp parse_ltf(
         _,
         nil
       ) do
    "N/A"
  end

  defp parse_ltf(
         %{
           "amountSol" => amount
         },
         fp
       ) do
    (amount / fp * 100) |> Number.Percentage.number_to_percentage(precision: 0)
  end

  defp parse_ltf(
         %SharkAttack.Loans.Loan{
           amountSol: amount
         },
         fp
       ) do
    (amount / fp * 100) |> Number.Percentage.number_to_percentage(precision: 0)
  end

  def parse_amount(%SharkAttack.Loans.Loan{
        total_owed: nil,
        amountSol: amount
      }) do
    amount
  end

  def parse_amount(%{amountSol: amount}) do
    amount
  end

  def parse_amount(%{"amountSol" => amount}) do
    amount
  end

  def parse_amount(_) do
    0.0
  end

  def parse_earnings(%{earnings: profit}) do
    profit
  end

  def parse_earnings(%{"earnings" => profit}) do
    profit
  end

  def parse_earnings(_) do
    0.0
  end

  defp parse_name(nil, nil) do
    nil
  end

  defp parse_name(%Nft{name: nil}, %Collections.Collection{name: name}) do
    name
  end

  defp parse_name(%Nft{name: name}, _) do
    name
  end

  defp parse_name(_, %Collections.Collection{name: name}) do
    name
  end

  def get_thumbnail_url(nil),
    do:
      "https://cdn.discordapp.com/icons/1064681179367870475/86f082809a9b54dfe68109e1aa074736.png"

  def get_thumbnail_url(%Collections.Collection{logo: nil}),
    do:
      "https://cdn.discordapp.com/icons/1064681179367870475/86f082809a9b54dfe68109e1aa074736.png"

  def get_thumbnail_url(%Collections.Collection{logo: logo}), do: logo
end
