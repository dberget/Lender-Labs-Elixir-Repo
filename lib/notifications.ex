defmodule SharkAttack.Notifications do
  alias SharkAttack.SharkyApi

  def foreclosures() do
    users = SharkAttack.Users.list!()

    all_loans =
      SharkyApi.get_all_loans()
      |> Enum.sort(fn a, b -> a["secondsUntilForeclosable"] < b["secondsUntilForeclosable"] end)

    Enum.map(users, fn user ->
      loans = Enum.filter(all_loans, fn l -> l["lender"] == user.address end)

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
