defmodule SharkAttack.Notifications do
  require Logger

  def foreclosures() do
    users = SharkAttack.Users.get_users_with_discord_id!()

    Enum.map(users, fn user ->
      user.address
      |> SharkAttack.LoansWorker.get_lender_loans()
      |> Enum.map(&elem(&1, 3))
      |> Enum.filter(fn loan -> loan["state"] == "taken" end)
      |> Enum.map(fn loan ->
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
    end)
  end

  def send_weekly_summary() do
    users = SharkAttack.Users.get_users_with_discord_id!()

    users = Enum.filter(users, fn user -> Map.fetch!(user.user_settings, :summary_report) end)

    Enum.map(users, fn user ->
      loans = SharkAttack.Loans.get_loans_history(user.address, :week)

      embed = format_weekly_summary(user, loans)

      user.discordId
      |> SharkAttack.DiscordConsumer.create_dm_channel()
      |> SharkAttack.DiscordConsumer.send_raw_message(embed)
    end)
  end

  defp format_weekly_summary(_user, []), do: nil

  defp format_weekly_summary(user, loans) do
    Logger.info("Sending weekly summary to #{user.discordId}")

    loan_amounts = Enum.map(loans, fn l -> l.amountSol end)

    largest_loan = loan_amounts |> Enum.max() |> Number.Delimit.number_to_delimited()
    ltv = loan_amounts |> Enum.sum()

    shortest_loan_seconds =
      loans
      |> Enum.filter(&is_nil(&1.dateForeclosed))
      |> Enum.map(&Timex.diff(&1.dateRepaid, &1.dateTaken, :seconds))
      |> Enum.min(fn -> 0 end)

    shortest_loan =
      Timex.Duration.from_erl({0, shortest_loan_seconds, 0})
      |> Timex.format_duration(:humanized)
      |> String.split(",")
      |> Enum.take(2)
      |> Enum.join(", ")

    profit =
      loans
      |> Enum.filter(&(!is_nil(&1.earnings)))
      |> Enum.map(fn l -> l.earnings end)
      |> Enum.sum()

    average_duration =
      loans
      |> Enum.filter(&(!is_nil(&1.dateRepaid)))
      |> Enum.map(fn l -> Timex.diff(l.dateRepaid, l.dateTaken, :seconds) end)
      |> Enum.sum()
      |> Kernel./(Enum.count(loans))
      |> round()

    average_duration_formatted =
      Timex.Duration.from_erl({0, average_duration, 0})
      |> Timex.format_duration(:humanized)
      |> String.split(",")
      |> Enum.take(2)
      |> Enum.join(", ")

    %Nostrum.Struct.Embed{
      author: %Nostrum.Struct.Embed.Author{
        name: "Lender Labs",
        url: "https://lenderlabs.xyz"
      },
      thumbnail: %Nostrum.Struct.Embed.Thumbnail{
        url:
          "https://cdn.discordapp.com/icons/1064681179367870475/86f082809a9b54dfe68109e1aa074736.png"
      },
      title: "#{String.slice(user.address, 0..4)} Weekly Summary",
      url: "https://lenderlabs.xyz",
      color: 5_815_448,
      fields: [
        %Nostrum.Struct.Embed.Field{
          name: "Total Loans",
          value: Enum.count(loans),
          inline: true
        },
        %Nostrum.Struct.Embed.Field{
          name: "Profit",
          value: "#{Number.Delimit.number_to_delimited(profit)} ◎",
          inline: true
        },
        %Nostrum.Struct.Embed.Field{
          name: "% Return",
          value: "#{(profit / ltv * 100) |> Number.Delimit.number_to_delimited()} %",
          inline: true
        },
        %Nostrum.Struct.Embed.Field{
          name: "Total Lent",
          value: "#{ltv |> Number.Delimit.number_to_delimited()} ◎",
          inline: true
        },
        %Nostrum.Struct.Embed.Field{
          name: "Ave. Loan",
          value: "#{(ltv / Enum.count(loans)) |> Number.Delimit.number_to_delimited()} ◎",
          inline: true
        },
        %Nostrum.Struct.Embed.Field{
          name: "Largest Loan",
          value: "#{largest_loan} ◎",
          inline: true
        },
        %Nostrum.Struct.Embed.Field{
          name: "Defaults",
          value:
            loans |> Enum.filter(&(!is_nil(&1.forecloseTxId))) |> Enum.count() |> to_string(),
          inline: true
        },
        %Nostrum.Struct.Embed.Field{
          name: "Average Duration",
          value: average_duration_formatted,
          inline: true
        },
        %Nostrum.Struct.Embed.Field{
          name: "Shortest Loan",
          value: shortest_loan,
          inline: true
        }
      ]
    }
  end
end
