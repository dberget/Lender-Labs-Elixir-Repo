defmodule SharkAttack.Notifications.NotificationHelpers do
  alias SharkAttack.Collections
  alias SharkAttack.Collections.Nft
  alias SharkAttack.Accounts.{User, UserSettings}

  @dao_webook_addresses ["4skxqydEdR5C1BMshJKmVW1D6sxvZPK9ABVFPuBSsWbK"]

  def send_message({:foreclosure, embed}) do
    SharkAttack.DiscordConsumer.send_to_webhook(
      :foreclosure,
      embed
    )
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
         %User{discordId: discordId, user_settings: %UserSettings{} = settings} <- user,
         false <- is_nil(discordId),
         {:ok, true} <- Map.fetch(settings, setting) do
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

  def build_message("SHARKY_FI", "REPAY_LOAN", event) do
    %{"toUserAccount" => to} = hd(event["nativeTransfers"])

    case check_is_user_and_subscribed?(
           to,
           :loan_repaid
         ) do
      false ->
        nil

      {:dao, address} ->
        SharkAttack.DiscordConsumer.send_to_webhook(
          "me",
          "Should be sending loan_repaid to dao - #{event["signature"]}"
        )

        {:dao, address, build_repaid_loan_embed(event)}

      {:user, discordId} ->
        SharkAttack.DiscordConsumer.send_to_webhook(
          "me",
          "Should be sending loan_repaid to #{discordId} - #{event["signature"]}"
        )

        {:user, discordId, build_repaid_loan_embed(event)}
    end
  end

  def build_message("SHARKY_FI", "UNKNOWN", event) do
    repaid_lender = event["instructions"] |> Enum.at(1) |> Map.get("accounts") |> Enum.at(3)
    new_lender = event["instructions"] |> Enum.at(1) |> Map.get("accounts") |> Enum.at(4)

    case check_is_user_and_subscribed?(
           repaid_lender,
           :loan_repaid
         ) do
      false ->
        nil

      {:dao, address} ->
        {:dao, address, build_repaid_loan_embed(event)}
        |> SharkAttack.Notifications.NotificationHelpers.send_message()

      {:user, discordId} ->
        SharkAttack.DiscordConsumer.send_to_webhook(
          "me",
          "Should be sending loan_repaid for extend to #{discordId} - #{event["signature"]}"
        )

        {:user, discordId, build_repaid_loan_embed(event)}
        |> SharkAttack.Notifications.NotificationHelpers.send_message()
    end

    case check_is_user_and_subscribed?(
           new_lender,
           :loan_taken
         ) do
      false ->
        nil

      {:dao, address} ->
        {:dao, address, build_take_loan_embed(event)}

      {:user, discordId} ->
        SharkAttack.DiscordConsumer.send_to_webhook(
          "me",
          "Should be sending loan_taken for extend to #{discordId} - #{event["signature"]}"
        )

        {:user, discordId, build_take_loan_embed(event)}
    end
  end

  def build_message("SHARKY_FI", "TAKE_LOAN", event) do
    from = event["instructions"] |> Enum.at(1) |> Map.get("accounts") |> List.first()

    case check_is_user_and_subscribed?(
           from,
           :loan_taken
         ) do
      false ->
        nil

      {:dao, address} ->
        {:dao, address, build_take_loan_embed(event)}

      {:user, discordId} ->
        SharkAttack.DiscordConsumer.send_to_webhook(
          "me",
          "Should be sending loan_taken to #{discordId} - #{event["signature"]}"
        )

        {:user, discordId, build_take_loan_embed(event)}
    end
  end

  def build_message("SHARKY_FI", "FORECLOSE_LOAN", event) do
    loan_address =
      event
      |> Map.get("instructions")
      |> Enum.at(1)
      |> Map.get("accounts")
      |> List.first()

    %{"mint" => mint} = hd(event["tokenTransfers"])

    nft = SharkAttack.Nfts.get_nft_by_mint(mint)

    c = SharkAttack.Collections.get_collection_from_mint(mint)

    fp = SharkAttack.FloorWorker.get_floor_price(c) |> Number.Delimit.number_to_delimited()

    loan = SharkAttack.Loans.get_loan(loan_address)

    amount = parse_amount(loan)
    name = parse_name(nft, c)

    embed = %Nostrum.Struct.Embed{
      thumbnail: %Nostrum.Struct.Embed.Thumbnail{
        url: get_thumbnail_url(c)
      },
      title: "**#{name}** Foreclosure",
      url: "https://solscan.io/tx/#{event["signature"]}",
      color: 5_815_448,
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

    {:foreclosure, embed}
  end

  def build_message(_platform, _, _event) do
    nil
  end

  def build_take_loan_embed(event) do
    %{"nativeBalanceChange" => amount} = hd(event["accountData"])

    %{"mint" => mint} = hd(event["tokenTransfers"])

    c =
      case SharkAttack.Collections.get_collection_from_mint(mint) do
        nil ->
          %Collections.Collection{
            id: nil,
            name: "Unknown",
            logo: nil
          }

        c ->
          c
      end

    nft = SharkAttack.Nfts.get_nft_by_mint(mint)
    fp = SharkAttack.FloorWorker.get_floor_price(c) |> Number.Delimit.number_to_delimited()

    %Nostrum.Struct.Embed{
      author: %Nostrum.Struct.Embed.Author{
        name: "Lender Labs",
        url: "https://lenderlabs.xyz"
      },
      thumbnail: %Nostrum.Struct.Embed.Thumbnail{
        url: get_thumbnail_url(c)
      },
      title: "**#{parse_name(nft, c)}** Offer Accepted",
      url: "https://solscan.io/tx/#{event["signature"]}",
      color: 5_815_448,
      fields: [
        %Nostrum.Struct.Embed.Field{
          name: "Loan Value",
          value: "#{Number.Delimit.number_to_delimited(amount / 1_000_000_000)} ◎",
          inline: true
        },
        %Nostrum.Struct.Embed.Field{name: "Floor Price", value: "#{fp}  ◎", inline: true}
      ]
    }
  end

  defp build_repaid_loan_embed(event) do
    %{"amount" => amount} = hd(event["nativeTransfers"])
    %{"mint" => mint} = hd(event["tokenTransfers"])

    c =
      case SharkAttack.Collections.get_collection_from_mint(mint) do
        nil ->
          %Collections.Collection{
            id: nil,
            name: "Unknown",
            logo: nil
          }

        c ->
          c
      end

    nft = SharkAttack.Nfts.get_nft_by_mint(mint)

    loan_address =
      Map.get(event, "instructions") |> List.last() |> Map.get("accounts") |> List.first()

    loan = SharkAttack.Loans.get_loan(loan_address)

    duration = :os.system_time(:second) - Map.get(loan, :start, 0)

    %Nostrum.Struct.Embed{
      author: %Nostrum.Struct.Embed.Author{
        name: "Lender Labs",
        url: "https://lenderlabs.xyz"
      },
      thumbnail: %Nostrum.Struct.Embed.Thumbnail{
        url: get_thumbnail_url(c)
      },
      title: "**#{parse_name(nft, c)}** Loan Repaid",
      url: "https://solscan.io/tx/#{event["signature"]}",
      color: 5_815_448,
      fields: [
        %Nostrum.Struct.Embed.Field{
          name: "Loan Value",
          value: "#{Number.Delimit.number_to_delimited(amount / 1_000_000_000)} ◎",
          inline: true
        },
        %Nostrum.Struct.Embed.Field{
          name: "Duration",
          value:
            Timex.Duration.from_erl({0, round(duration), 0})
            |> Timex.format_duration(:humanized),
          inline: true
        }
      ]
    }
  end

  def parse_amount(%SharkAttack.Loans.Loan{
        total_owed: nil,
        amountSol: amount,
        earnings: profit
      }) do
    amount + profit + profit * 0.16
  end

  def parse_amount(%SharkAttack.Loans.Loan{total_owed: amount}) do
    amount
  end

  def parse_amount(%{amountSol: amount, earnings: profit}) do
    amount + profit + profit * 0.16
  end

  def parse_amount(_) do
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
