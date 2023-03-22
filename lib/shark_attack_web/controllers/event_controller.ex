defmodule SharkAttackWeb.EventController do
  use SharkAttackWeb, :controller
  alias SharkAttack.Collections
  alias SharkAttack.Collections.Nft
  alias SharkAttack.Accounts.{User, UserSettings}

  require Logger

  @dao_webook_addresses ["4skxqydEdR5C1BMshJKmVW1D6sxvZPK9ABVFPuBSsWbK"]

  def index(conn, params) do
    event = Map.get(params, "_json") |> hd

    send_message(event["source"], event["type"], event)
    SharkAttack.LoansWorker.update_loan(event, event["type"])

    conn
    |> json(%{message: "ok"})
  end

  defp send_message("SHARKY_FI", "REPAY_LOAN", event) do
    %{"toUserAccount" => to} = hd(event["nativeTransfers"])

    case check_is_user_and_subscribed?(
           "BS61tv1KbsPhns3ppU8pmWozfReZjhxFL2MPhBdDWNEm",
           :loan_repaid
         ) do
      false ->
        nil

      {:dao, address} ->
        embed = build_repaid_loan_embed(event)

        address
        |> SharkAttack.DiscordConsumer.send_to_webhook(embed)

      {:user, discordId} ->
        embed = build_repaid_loan_embed(event)

        discordId
        |> SharkAttack.DiscordConsumer.create_dm_channel()
        |> SharkAttack.DiscordConsumer.send_raw_message(embed)
    end
  end

  defp send_message("SHARKY_FI", "TAKE_LOAN", event) do
    from = event["instructions"] |> Enum.at(1) |> Map.get("accounts") |> hd

    case check_is_user_and_subscribed?(
           "BS61tv1KbsPhns3ppU8pmWozfReZjhxFL2MPhBdDWNEm",
           :loan_taken
         ) do
      false ->
        nil

      {:dao, address} ->
        embed = build_take_loan_embed(event)

        address
        |> SharkAttack.DiscordConsumer.send_to_webhook(embed)

      {:user, discordId} ->
        embed = build_take_loan_embed(event)

        discordId
        |> SharkAttack.DiscordConsumer.create_dm_channel()
        |> SharkAttack.DiscordConsumer.send_raw_message(embed)
    end
  end

  defp send_message("SHARKY_FI", "FORECLOSE_LOAN", event) do
    loan_address =
      event
      |> Map.get("instructions")
      |> Enum.at(1)
      |> Map.get("accounts")
      |> List.first()

    %{"mint" => mint} = hd(event["tokenTransfers"])

    nft = SharkAttack.Nfts.get_nft_by_mint(mint)

    c = SharkAttack.Collections.get_collection_from_mint(mint)
    fp = SharkAttack.FloorWorker.get_floor_price(c.id)

    loan = SharkAttack.Loans.get_loan(loan_address)

    amount = Map.get(loan, :amountSol, 0.0) + Map.get(loan, :earnings, 0.0)

    name = parse_name(nft, c)

    embed = %Nostrum.Struct.Embed{
      thumbnail: %Nostrum.Struct.Embed.Thumbnail{
        url: c.logo
      },
      title: "**#{name}** Foreclosure",
      url: "https://solscan.io/tx/#{event["signature"]}",
      color: 5_815_448,
      fields: [
        %Nostrum.Struct.Embed.Field{
          name: "Loan Value",
          value: "#{Float.round(amount, 2)} ◎",
          inline: true
        },
        %Nostrum.Struct.Embed.Field{
          name: "Floor Price",
          value: "#{Float.round(fp, 2)} ◎",
          inline: true
        }
      ]
    }

    SharkAttack.DiscordConsumer.send_to_webhook(
      "foreclosure",
      embed
    )
  end

  defp send_message(_platform, _, _event) do
    :ok
  end

  defp build_take_loan_embed(event) do
    %{"nativeBalanceChange" => amount} = hd(event["accountData"])

    %{"mint" => mint} = hd(event["tokenTransfers"])

    c = SharkAttack.Collections.get_collection_from_mint(mint)
    fp = SharkAttack.FloorWorker.get_floor_price(c.id)

    %Nostrum.Struct.Embed{
      author: %Nostrum.Struct.Embed.Author{
        name: "Lender Labs",
        url: "https://lenderlabs.xyz"
      },
      thumbnail: %Nostrum.Struct.Embed.Thumbnail{
        url: c.logo
      },
      title: "**#{c.name}** Offer Accepted",
      url: "https://solscan.io/tx/#{event["signature"]}",
      color: 5_815_448,
      fields: [
        %Nostrum.Struct.Embed.Field{
          name: "Loan Value",
          value: "#{Float.round(amount / 1_000_000_000, 2)} ◎",
          inline: true
        },
        %Nostrum.Struct.Embed.Field{name: "Floor Price", value: "#{fp}  ◎", inline: true}
      ]
    }
  end

  defp build_repaid_loan_embed(event) do
    %{"amount" => amount} = hd(event["nativeTransfers"])

    %{"mint" => mint} = hd(event["tokenTransfers"])

    c = SharkAttack.Collections.get_collection_from_mint(mint)

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
        url: c.logo
      },
      title: "**#{c.name}** Loan Repaid",
      url: "https://solscan.io/tx/#{event["signature"]}",
      color: 5_815_448,
      fields: [
        %Nostrum.Struct.Embed.Field{
          name: "Loan Value",
          value: "#{Float.round(amount / 1_000_000_000, 2)} ◎",
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

  defp parse_name(%Nft{name: nil}, %Collections.Collection{name: name}) do
    name
  end

  defp parse_name(%Nft{name: name}, _) do
    name
  end

  defp is_subscribed_dao?(address) do
    case address in @dao_webook_addresses do
      true ->
        {:dao, address}

      _ ->
        false
    end
  end

  defp check_is_user_and_subscribed?(address, setting) do
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
end
