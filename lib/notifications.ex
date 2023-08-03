defmodule SharkAttack.Notifications do
  require Logger

  def foreclosures() do
    Logger.info("Checking for foreclosures")

    # SharkAttack.DiscordConsumer.send_to_webhook("me", "Checking for foreclosures")

    users =
      SharkAttack.Users.get_users_with_discord_id!()
      |> Enum.filter(fn user -> Map.fetch!(user.user_settings, :loan_foreclosure) end)

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
          SharkAttack.DiscordConsumer.send_to_webhook(
            "me",
            "Sendng Foreclosure Alert to #{user.discordId} - #{minutesFromDefault} - #{loan["pubkey"]}"
          )

          SharkAttack.DiscordConsumer.create_dm_channel(user.discordId)
          |> SharkAttack.DiscordConsumer.send_foreclosure_msg(minutesFromDefault)
        end
      end)
    end)
  end

  def send_weekly_summary() do
    users = SharkAttack.Users.get_users_with_discord_id!()

    users = Enum.filter(users, fn user -> Map.fetch!(user.user_settings, :summary_report) end)

    Enum.map(users, fn user ->
      try do
        loans = SharkAttack.Loans.get_loans_history(user.address, :week)
        embed = format_weekly_summary(user, loans)

        user.discordId
        |> SharkAttack.DiscordConsumer.create_dm_channel()
        |> SharkAttack.DiscordConsumer.send_raw_message(embed)
      rescue
        _e ->
          Logger.error("Error sending weekly summary to #{user.discordId}")
      end
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

  def hourly_position_alerts() do
    all_collections = SharkAttack.Collections.list_collections()

    users = SharkAttack.Users.get_users_with_discord_id!()

    Enum.map(users, fn user ->
      user_loans =
        user.address
        |> SharkAttack.LoansWorker.get_lender_loans()
        |> Enum.map(&elem(&1, 3))
        |> Enum.filter(fn loan -> loan["state"] == "offered" end)

      grouped_loans = Enum.group_by(user_loans, fn l -> l["orderBook"] end)

      Enum.map(grouped_loans, fn {orderBook, loans} ->
        loan = Enum.sort_by(loans, fn l -> l["amountSol"] end, :desc) |> List.first()

        ordered_loans =
          SharkAttack.LoansWorker.get_collection_loans(orderBook)
          |> Enum.filter(fn loan -> loan["state"] == "offered" end)
          |> Enum.sort_by(fn l -> l["amountSol"] end, :desc)

        pos = Enum.find_index(ordered_loans, fn l -> l["pubkey"] == loan["pubkey"] end)

        user.discordId
        |> SharkAttack.DiscordConsumer.create_dm_channel()
        |> SharkAttack.DiscordConsumer.send_message(%{
          collection:
            Enum.find(all_collections, &(&1.sharky_address == orderBook)) |> Map.get(:name),
          position: pos
        })
      end)
    end)
  end

  def best_position_alert() do
    all_collections = SharkAttack.Collections.list_collections()

    users = SharkAttack.Users.get_users_with_discord_id!()

    Enum.map(users, fn user ->
      user_loans =
        user.address
        |> SharkAttack.LoansWorker.get_lender_loans()
        |> Enum.map(&elem(&1, 3))
        |> Enum.filter(fn loan -> loan["state"] == "offered" end)

      grouped_loans = Enum.group_by(user_loans, fn l -> l["orderBook"] end)

      Enum.map(grouped_loans, fn {orderBook, loans} ->
        loan = Enum.sort_by(loans, fn l -> l["amountSol"] end, :desc) |> List.first()

        ordered_loans =
          SharkAttack.LoansWorker.get_collection_loans(orderBook)
          |> Enum.filter(fn loan -> loan["state"] == "offered" end)
          |> Enum.sort_by(fn l -> l["amountSol"] end, :desc)

        pos = Enum.find_index(ordered_loans, fn l -> l["pubkey"] == loan["pubkey"] end)

        cond do
          pos > 0 ->
            collection =
              Enum.find(all_collections, &(&1.sharky_address == orderBook)) |> Map.get(:name)

            embed = %Nostrum.Struct.Embed{
              thumbnail: %Nostrum.Struct.Embed.Thumbnail{
                url:
                  "https://cdn.discordapp.com/icons/1064681179367870475/86f082809a9b54dfe68109e1aa074736.png"
              },
              title: "Best Offer Lost",
              description: "No longer the best offer for #{collection}.
                 Update: https://lenderlabs.xyz/"
            }

            user.discordId
            |> SharkAttack.DiscordConsumer.create_dm_channel()
            |> SharkAttack.DiscordConsumer.send_raw_message(embed)

          true ->
            nil
        end
      end)
    end)
  end

  def track_notification(params) do
    %SharkAttack.Notifications.EventNotification{}
    |> SharkAttack.Notifications.EventNotification.changeset(params)
    |> SharkAttack.Repo.insert()
  end

  def get_notification!(id) do
    SharkAttack.Repo.get!(SharkAttack.Notifications.EventNotification, id)
  end

  def mark_notification_as_sent(id) do
    notification = SharkAttack.Notifications.get_notification!(id)

    notification
    |> SharkAttack.Notifications.EventNotification.changeset(%{sent: true})
    |> SharkAttack.Repo.update()
  end
end
