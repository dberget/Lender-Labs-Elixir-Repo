defmodule SharkAttackWeb.EventController do
  use SharkAttackWeb, :controller

  def index(conn, params) do
    event = Map.get(params, "_json") |> hd

    # IO.inspect(event["type"], label: "type")
    # IO.inspect(event["source"], label: "source")
    # IO.inspect(event["signature"], label: "sig")

    IO.inspect(event)

    send_message(event["source"], event["type"], event)

    conn
    |> json(%{message: "ok"})
  end

  def send_message("SHARKY_FI", "REPAY_LOAN", event) do
    %{"toUserAccount" => to, "amount" => amount} = hd(event["nativeTransfers"])

    user = SharkAttack.Users.get!(to)

    if user do
      # loanPk = Map.get(Enum.at(event["instructions"], 1), "accounts") |> hd
      # IO.inspect(loanPk, label: "loanpk")

      SharkAttack.DiscordConsumer.create_dm_channel(user.discordId)
      |> SharkAttack.DiscordConsumer.send_raw_message(
        "Loan Repaid",
        "Your loan has been repaid! You have earned #{Float.round(amount / 1_000_000_000, 2)} SOL. https://solscan.io/tx/#{event["signature"]}"
      )
    end

    :ok
  end
end
