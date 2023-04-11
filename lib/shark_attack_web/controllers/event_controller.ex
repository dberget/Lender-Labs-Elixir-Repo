defmodule SharkAttackWeb.EventController do
  use SharkAttackWeb, :controller
  require Logger

  def index(conn, params) do
    event = Map.get(params, "_json") |> hd

    SharkAttack.DiscordConsumer.send_to_webhook(
      "me",
      "#{event["type"]} - #{event["signature"]}"
    )

    SharkAttack.LoansWorker.update_loan(event, event["type"])

    handle_message(event)

    conn
    |> json(%{message: "ok"})
  end

  defp handle_message(event) do
    message =
      SharkAttack.Notifications.NotificationHelpers.build_message(
        event["source"],
        event["type"],
        event
      )

    if message do
      SharkAttack.Notifications.NotificationHelpers.send_message(message)

      SharkAttack.DiscordConsumer.send_to_webhook(
        "me",
        "Sent #{event["signature"]}"
      )
    end
  end
end
