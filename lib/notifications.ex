defmodule SharkAttack.Notifications do
  def foreclosures() do
    users = SharkAttack.Users.list!()

    IO.inspect("FLUSH")
    SharkAttack.LoansWorker.flush()

    Enum.map(users, fn user ->
      loans = SharkAttack.LoansWorker.get_lender_loans(user.address) |> Enum.map(&elem(&1, 3))

      Enum.map(loans, fn loan ->
        if(
          loan["secondsUntilForeclosable"] < 10 * 60 and
            loan["secondsUntilForeclosable"] > -10 * 60
        ) do
          SharkAttack.DiscordConsumer.create_dm_channel(user.discordId)
          |> SharkAttack.DiscordConsumer.send_foreclosure_msg(loan)
        end
      end)
    end)
  end
end
