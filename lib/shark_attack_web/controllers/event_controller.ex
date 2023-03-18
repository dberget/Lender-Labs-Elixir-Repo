defmodule SharkAttackWeb.EventController do
  use SharkAttackWeb, :controller
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

  # defp send_message("SHARKY_FI", "REPAY_LOAN", event) do
  #   %{"toUserAccount" => to, "amount" => amount} = hd(event["nativeTransfers"])

  #   case check_is_user_and_subscribed?(
  #          to,
  #          :loan_repaid
  #        ) do
  #     false ->
  #       nil

  #     {:dao, address} ->
  #       %{"mint" => mint} = hd(event["tokenTransfers"])

  #       name = SharkAttack.Nfts.get_nft_name_from_api(mint)

  #       address
  #       |> SharkAttack.DiscordConsumer.send_to_webhook(
  #         "#{name} Repaid",
  #         "Your #{Float.round(amount / 1_000_000_000, 2)} SOL loan has been repaid!"
  #       )

  #     {:user, discordId} ->
  #       %{"mint" => mint} = hd(event["tokenTransfers"])

  #       name = SharkAttack.Nfts.get_nft_name_from_api(mint)

  #       discordId
  #       |> SharkAttack.DiscordConsumer.create_dm_channel()
  #       |> SharkAttack.DiscordConsumer.send_raw_message(
  #         "#{name} Repaid",
  #         "Your #{Float.round(amount / 1_000_000_000, 2)} SOL loan has been repaid!"
  #       )
  #   end
  # end

  defp send_message("SHARKY_FI", "TAKE_LOAN", event) do
    from = event["instructions"] |> Enum.at(1) |> Map.get("accounts") |> hd

    %{"nativeBalanceChange" => amount} = hd(event["accountData"])

    case check_is_user_and_subscribed?(
           from,
           :loan_taken
         ) do
      false ->
        nil

      {:dao, address} ->
        %{"mint" => mint} = hd(event["tokenTransfers"])

        name = SharkAttack.Nfts.get_nft_name_from_api(mint)

        address
        |> SharkAttack.DiscordConsumer.send_to_webhook(
          "#{name} Repaid",
          "Your #{Float.round(amount / 1_000_000_000, 2)} SOL loan has been repaid!"
        )

      {:user, discordId} ->
        %{"mint" => mint} = hd(event["tokenTransfers"])

        name = SharkAttack.Nfts.get_nft_name_from_api(mint)

        discordId
        |> SharkAttack.DiscordConsumer.create_dm_channel()
        |> SharkAttack.DiscordConsumer.send_raw_message(
          "Offer accepted for #{name}!",
          "#{Float.round(amount / 1_000_000_000, 2)} SOL offer accepted!"
        )
    end
  end

  defp send_message("SHARKY_FI", "REPAY_LOAN", event) do
    loan_address =
      event
      |> Map.get("instructions")
      |> Enum.at(1)
      |> Map.get("accounts")
      |> hd()

    %{"mint" => mint} = hd(event["tokenTransfers"])

    # nft = SharkAttack.Nfts.get_nft_by_mint(mint)
    name = SharkAttack.Nfts.get_nft_name_from_api(mint)

    c = SharkAttack.Collections.get_collection_from_mint(mint)
    fp = SharkAttack.FloorWorker.get_floor_price(c.id)

    loan =
      SharkAttack.LoansWorker.get_loan(loan_address)
      |> List.first(%{"amountSol" => "?"})

    embed = %Nostrum.Struct.Embed{
      author: %Nostrum.Struct.Embed.Author{
        name: "Lender Labs",
        url: "https://lenderlabs.xyz"
      },
      thumbnail: %Nostrum.Struct.Embed.Thumbnail{
        url: c.logo
      },
      title: "**#{c.name}** Foreclosure",
      description: "#{name} has been foreclosed!",
      url: "https://solscan.io/tx/#{event["signature"]}",
      color: 5_815_448,
      fields: [
        %Nostrum.Struct.Embed.Field{
          name: "Loan Value",
          value: "#{loan["amountSol"]} ◎",
          inline: true
        },
        %Nostrum.Struct.Embed.Field{name: "Floor Price", value: "#{fp}  ◎", inline: true}
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
