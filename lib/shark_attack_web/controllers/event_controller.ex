defmodule SharkAttackWeb.EventController do
  use SharkAttackWeb, :controller

  def index(conn, params) do
    event = Map.get(params, "_json") |> hd

    send_message(event["source"], event["type"], event)

    conn
    |> json(%{message: "ok"})
  end

  def send_message("SHARKY_FI", "REPAY_LOAN", event) do
    %{"toUserAccount" => to, "amount" => amount} = hd(event["nativeTransfers"])

    user = SharkAttack.Users.get!(to)

    if user do
      %{"mint" => mint} = hd(event["tokenTransfers"])

      res =
        SharkAttack.Helpers.do_post_request(
          "https://api.helius.xyz/v1/nfts?api-key=d250e974-e6c5-4428-a9ca-25f8cd271444",
          %{mints: [mint]}
        )

      name = res |> hd |> Map.get("name")

      SharkAttack.DiscordConsumer.create_dm_channel(user.discordId)
      |> SharkAttack.DiscordConsumer.send_raw_message(
        "#{name} Repaid",
        "Your loan for #{name} has been repaid! You have earned #{Float.round(amount / 1_000_000_000, 2)} SOL. https://solscan.io/tx/#{event["signature"]}"
      )
    end

    :ok
  end

  def send_message("SHARKY_FI", "TAKE_LOAN", event) do
    %{"fromUserAccount" => from} = hd(event["nativeTransfers"])

    %{"nativeBalanceChange" => amount} = hd(event["accountData"])

    user = SharkAttack.Users.get!(from)

    if user do
      %{"mint" => mint} = hd(event["tokenTransfers"])

      res =
        SharkAttack.Helpers.do_post_request(
          "https://api.helius.xyz/v1/nfts?api-key=d250e974-e6c5-4428-a9ca-25f8cd271444",
          %{mints: [mint]}
        )

      name = res |> hd |> Map.get("name")

      SharkAttack.DiscordConsumer.create_dm_channel(user.discordId)
      |> SharkAttack.DiscordConsumer.send_raw_message(
        "Offer accepted for #{name}!",
        "#{Float.round(amount / 1_000_000_000, 2)} SOL Offer accepted for #{name}! https://solscan.io/tx/#{event["signature"]}"
      )
    end

    :ok
  end
end
