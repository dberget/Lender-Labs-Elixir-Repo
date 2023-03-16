defmodule SharkAttackWeb.EventController do
  use SharkAttackWeb, :controller
  alias SharkAttack.Repo
  alias SharkAttack.Accounts.{User, UserSetting}

  require Logger

  def index(conn, params) do
    event = Map.get(params, "_json") |> hd

    send_message(event["source"], event["type"], event)

    SharkAttack.LoansWorker.update_loan(event, event["type"])

    conn
    |> json(%{message: "ok"})
  end

  defp send_message("SHARKY_FI", "REPAY_LOAN", event) do
    %{"toUserAccount" => to, "amount" => amount} = hd(event["nativeTransfers"])

    with %User{} = user <-
           SharkAttack.Users.get_user_from_address!(
             to,
             :user_settings
           ),
         %User{discordId: discordId, user_settings: %UserSetting{} = settings} <- user,
         false <- is_nil(discordId),
         %UserSetting{loan_repaid: true} <- settings do
      %{"mint" => mint} = hd(event["tokenTransfers"])

      res =
        SharkAttack.Helpers.do_post_request(
          "https://api.helius.xyz/v1/nfts?api-key=d250e974-e6c5-4428-a9ca-25f8cd271444",
          %{mints: [mint]}
        )

      name = res |> hd |> Map.get("name")

      discordId
      |> SharkAttack.DiscordConsumer.create_dm_channel()
      |> SharkAttack.DiscordConsumer.send_raw_message(
        "#{name} Repaid",
        "Your #{Float.round(amount / 1_000_000_000, 2)} SOL loan has been repaid!"
      )
    else
      _ -> nil
    end
  end

  defp send_message("SHARKY_FI", "TAKE_LOAN", event) do
    from = event["instructions"] |> Enum.at(1) |> Map.get("accounts") |> hd

    %{"nativeBalanceChange" => amount} = hd(event["accountData"])

    with %User{} = user <-
           SharkAttack.Users.get_user_from_address!(
             from,
             :user_settings
           ),
         %User{discordId: discordId, user_settings: %UserSetting{} = settings} <- user,
         false <- is_nil(discordId),
         %UserSetting{loan_taken: true} <- settings do
      %{"mint" => mint} = hd(event["tokenTransfers"])

      res =
        SharkAttack.Helpers.do_post_request(
          "https://api.helius.xyz/v1/nfts?api-key=d250e974-e6c5-4428-a9ca-25f8cd271444",
          %{mints: [mint]}
        )

      name = res |> hd |> Map.get("name")

      discordId
      |> SharkAttack.DiscordConsumer.create_dm_channel()
      |> SharkAttack.DiscordConsumer.send_raw_message(
        "Offer accepted for #{name}!",
        "#{Float.round(amount / 1_000_000_000, 2)} SOL offer accepted!"
      )
    else
      _ -> nil
    end
  end

  defp send_message(_platform, _, _event) do
    :ok
  end
end
