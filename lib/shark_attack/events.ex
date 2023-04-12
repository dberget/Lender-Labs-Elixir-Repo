defmodule SharkAttack.Events do
  def send_event(type, loan) do
    message =
      SharkAttack.Notifications.NotificationHelpers.build_message(
        type,
        loan
      )

    if message do
      SharkAttack.Notifications.NotificationHelpers.send_message(message)
    end
  end

  def insert_loan_event(type, platform, data) do
    SharkAttack.Repo.insert(%SharkAttack.Events.LoanEvents{
      type: type,
      platform: platform,
      signature: data["signature"],
      data: data |> Jason.encode!()
    })
  end
end
