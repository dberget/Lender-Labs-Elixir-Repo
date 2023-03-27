defmodule SharkAttack.Notifications do
  def foreclosures() do
    users = SharkAttack.Users.get_users_with_discord_id!()

    SharkAttack.LoansWorker.flush()

    Enum.map(users, fn user ->
      unless user.discordId == nil do
        loans = SharkAttack.LoansWorker.get_lender_loans(user.address) |> Enum.map(&elem(&1, 3))

        Enum.map(loans, fn loan ->
          minutesFromDefault =
            DateTime.diff(DateTime.from_unix!(loan["end"]), DateTime.utc_now(), :minute)

          if(
            minutesFromDefault < 10 and
              minutesFromDefault > -10
          ) do
            SharkAttack.DiscordConsumer.create_dm_channel(user.discordId)
            |> SharkAttack.DiscordConsumer.send_foreclosure_msg(loan)
          end
        end)
      end
    end)
  end
end
