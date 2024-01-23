defmodule SharkAttack.Stats do
  import Ecto.Query, warn: false

  alias SharkAttack.Repo
  require Logger

  def update_loans() do
    # SharkAttack.DiscordConsumer.send_to_webhook(
    #   "me",
    #   "Updating Loans"
    # )

    loans =
      SharkAttack.SharkyApi.get_all_loans() ++
        SharkAttack.SharkyApi.get_all_loans("citrus")

    Enum.map(loans, &SharkAttack.Loans.create_active_loan(&1))

    # SharkAttack.DiscordConsumer.send_to_webhook(
    #   "me",
    #   "Done Updating Loans"
    # )
  end

  def update_ll_offers() do
    offers =
      SharkAttack.Offers.get_offers_since_fees()
      |> Enum.filter(&(is_nil(&1.rescinded) and is_nil(&1.taken)))

    offers
    |> Enum.map(fn l ->
      with %{} <- SharkAttack.Loans.get_loan(l.loan_address),
           %{} <- SharkAttack.LoansWorker.get_offer(l.loan_address) do
        SharkAttack.Offers.rescind_offer(l.loan_address)
      else
        _ ->
          :active_offer

        _ ->
          :active
      end
    end)
  end

  def update_active_loans() do
    loans = SharkAttack.Loans.get_active_loans()

    loans
    |> Enum.take(5)
    |> Enum.map(fn l ->
      res = SharkAttack.LoansWorker.get_loan(l.loan)

      case res do
        {:ok, []} ->
          SharkAttack.Loans.update_loan(l, %{status: "COMPLETE"})

        {:ok, _} ->
          :active
      end
    end)
  end

  def save_loan(loan) do
    SharkAttack.Loans.create_loan(loan)
  end

  # This makes sure you get all loans if none exist so the order is what they expect.
  def update_history_safe(pk) do
    pull_history = SharkAttack.Users.get_user_pull_history?(pk)

    case pull_history.sharky_lend do
      nil ->
        Logger.info("Updating full Lender History - #{pk}")

        SharkAttack.Stats.pull_lending_history(pk)

      {:error, _} ->
        {:error, []}

      _ ->
        Logger.info("Checking last pulled #{pk}")

        if pull_history.updated_at |> Timex.diff(DateTime.utc_now(), :minutes) < -15 do
          update_citrus_history_safe(pk)

          SharkAttack.Stats.save_recent_lender_history(pk)

          pull_history
          |> SharkAttack.Accounts.PullHistory.changeset(%{updated_at: DateTime.utc_now()})
          |> Repo.update()
        end
    end
  end

  def update_borrow_history_safe(pk) do
    pull_history = SharkAttack.Users.get_user_pull_history?(pk)

    case pull_history.sharky_borrow do
      nil ->
        Logger.info("Updating Borrow History")

        SharkAttack.Stats.pull_borrow_history(pk)

      {:error, _} ->
        {:error, []}

      _ ->
        Logger.info("CHECKING BORROWER LAST PULLED #{pk}")

        if pull_history.updated_at |> Timex.diff(DateTime.utc_now(), :minutes) < -30 do
          Logger.info("PULLING BORROWER HISTORY #{pk}")

          SharkAttack.Stats.save_recent_borrow_history(pk)

          pull_history
          |> SharkAttack.Accounts.PullHistory.changeset(%{updated_at: DateTime.utc_now()})
          |> Repo.update()
        end
    end
  end

  def backfill_missing_earnings do
    query =
      from(l in SharkAttack.Loans.Loan,
        where: l.status == "COMPLETE" and l.earnings == 0.0 and is_nil(l.dateForeclosed),
        limit: 250,
        select: l
      )

    loans =
      Repo.all(query)
      |> Enum.group_by(& &1.lender)

    Map.keys(loans)
    |> Enum.map(fn lender ->
      IO.inspect("Backfilling earnings for #{lender}")

      case SharkAttack.SharkyApi.get_history(lender) do
        {:error, _} ->
          {:error, :error}

        data ->
          data
          |> Enum.map(&format_historical_loan(&1, "Sharky"))
          |> Enum.filter(fn l -> is_nil(l["dateForeclosed"]) end)
          |> SharkAttack.Loans.update_or_insert_completed_loans(:earnings)
      end
    end)
  end

  def backfill(lender) do
    case SharkAttack.SharkyApi.get_history(lender) do
      {:error, _} ->
        {:error, :error}

      data ->
        data
        |> Enum.map(&format_historical_loan(&1, "Sharky"))
        |> Enum.filter(fn l -> is_nil(l["dateForeclosed"]) end)
        |> SharkAttack.Loans.update_or_insert_completed_loans(:earnings)
    end
  end

  def pull_lending_history(address) do
    pull_history = SharkAttack.Users.get_user_pull_history?(address)

    SharkAttack.Stats.save_lender_history(address)

    pull_history
    |> SharkAttack.Accounts.PullHistory.changeset(%{address: address, sharky_lend: true})
    |> Repo.insert_or_update()
  end

  def pull_borrow_history(address) do
    pull_history = SharkAttack.Users.get_user_pull_history?(address)

    SharkAttack.Stats.save_borrower_history(address)

    pull_history
    |> SharkAttack.Accounts.PullHistory.changeset(%{address: address, sharky_borrow: true})
    |> Repo.insert_or_update()
  end

  def pull_all_citrus_loans() do
    SharkAttack.SharkyApi.get_citrus_loan_history()
    |> Enum.map(&format_historical_loan(&1, "CITRUS"))
    |> SharkAttack.Loans.update_or_insert_completed_loans()
  end

  def update_citrus_history_safe(pk) do
    case SharkAttack.SharkyApi.get_lender_loans(pk, "citrus") do
      {:error, _error} ->
        []

      loans ->
        loans
        |> Enum.filter(&(&1["state"] == "defaulted" || &1["state"] == "repaid"))
        |> Enum.map(&format_historical_loan(&1, "CITRUS"))
        |> SharkAttack.Loans.update_or_insert_completed_loans()
    end
  end

  def save_lender_history(pk) do
    case SharkAttack.SharkyApi.get_history(pk) do
      {:error, _} ->
        {:error, :error}

      data ->
        data
        |> Enum.map(&format_historical_loan(&1, "Sharky"))
        |> SharkAttack.Loans.update_or_insert_completed_loans()
    end
  end

  def save_borrower_history(pk) do
    data = SharkAttack.SharkyApi.get_borrower_history(pk)

    data
    |> Enum.map(&format_historical_loan(&1, "Sharky"))
    |> SharkAttack.Loans.update_or_insert_completed_loans()
  end

  def save_recent_borrow_history(pk) do
    case SharkAttack.SharkyApi.get_recent_history(pk, "borrow") do
      {:error, _r} ->
        {:error, :error}

      data ->
        data
        |> Enum.map(&format_historical_loan(&1, "Sharky"))
        |> SharkAttack.Loans.update_or_insert_completed_loans()
    end
  end

  def save_recent_lender_history(pk) do
    case SharkAttack.SharkyApi.get_recent_history(pk) do
      {:error, _} ->
        {:error, :error}

      data ->
        data
        |> Enum.map(&format_historical_loan(&1, "Sharky"))
        |> SharkAttack.Loans.update_or_insert_completed_loans()
    end
  end

  def get_daily_volume() do
    Repo.all(SharkAttack.Stats.PlatformVolume)
  end

  def get_foreclosure_summary() do
    Repo.all(SharkAttack.Stats.ForecloseSummaryView)
  end

  def format_historical_loan(loan, "CITRUS") do
    foreclosed_date =
      if loan["state"] == "defaulted" do
        Timex.from_unix(loan["rawData"]["endTime"])
        |> Timex.to_naive_datetime()
        |> NaiveDateTime.truncate(:second)
      end

    date_repaid =
      if loan["state"] == "repaid" do
        Timex.from_unix(loan["rawData"]["endTime"])
        |> Timex.to_naive_datetime()
        |> NaiveDateTime.truncate(:second)
      end

    %{}
    |> Map.put(:loan, loan["pubkey"])
    |> Map.put(:length, loan["length"])
    |> Map.put(:status, "COMPLETE")
    |> Map.put(:platform, "CITRUS")
    |> Map.put(:amountSol, loan["amountSol"] / 1)
    |> Map.put(:lender, loan["lender"])
    |> Map.put(:orderBook, loan["orderBook"])
    |> Map.put(:borrower, loan["borrower"])
    |> Map.put(:end, loan["end"])
    |> Map.put(:start, loan["rawData"]["startTime"])
    |> Map.put(
      :dateOffered,
      Timex.from_unix(loan["rawData"]["creationTime"])
      |> Timex.to_naive_datetime()
      |> NaiveDateTime.truncate(:second)
    )
    |> Map.put(:nftCollateralMint, loan["nftCollateralMint"])
    |> Map.put(
      :dateTaken,
      Timex.from_unix(loan["rawData"]["startTime"])
      |> Timex.to_naive_datetime()
      |> NaiveDateTime.truncate(:second)
    )
    |> Map.put(:dateRepaid, date_repaid)
    |> Map.put(:dateForeclosed, foreclosed_date)
    |> Map.put(:earnings, loan["earnings"])
    |> Map.put(:inserted_at, NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second))
    |> Map.put(:updated_at, NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second))
  end

  def format_historical_loan(loan, "Sharky") do
    %{}
    |> Map.put(:loan, loan["pubKey"])
    |> Map.put(:orderBook, loan["orderBookPubKey"])
    |> Map.put(:nftCollateralMint, loan["collateralMint"])
    |> Map.put(:length, loan["durationSeconds"])
    |> Map.put(:status, "COMPLETE")
    |> Map.put(:platform, "SHARKY")
    |> Map.put(:start, loan["start"])
    |> Map.put(:end, loan["end"])
    |> Map.put(:amountSol, loan["principalLamports"] / 1_000_000_000)
    |> Map.put(:earnings, get_earnings(loan))
    |> Map.put(:borrower, loan["borrower"])
    |> Map.put(:lender, loan["lender"])
    |> Map.put(:dateForeclosed, loan["dateForeclosed"] |> parse_date())
    |> Map.put(:dateOffered, loan["dateOffered"] |> parse_date())
    |> Map.put(:dateRepaid, loan["dateRepaid"] |> parse_date())
    |> Map.put(:dateTaken, loan["dateTaken"] |> parse_date())
    |> Map.put(:forecloseTxId, loan["forecloseTxId"])
    |> Map.put(:offerTxId, loan["offerTxId"])
    |> Map.put(:repayTxId, loan["repayTxId"])
    |> Map.put(:takeTxId, loan["takeTxId"])
    |> Map.put(:inserted_at, NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second))
    |> Map.put(:updated_at, NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second))
  end

  def parse_date(nil), do: nil

  def parse_date(date) do
    date
    |> Timex.parse!("{ISO:Extended:Z}")
    |> Timex.to_naive_datetime()
    |> NaiveDateTime.truncate(:second)
  end

  defp get_earnings(%{"amountRepaidLamports" => nil}), do: 0.0

  defp get_earnings(%{
         "amountRepaidLamports" => repaid,
         "principalLamports" => principalLamports,
         "feePaidLamports" => feePaidLamports
       }) do
    (repaid - (principalLamports + feePaidLamports)) / 1_000_000_000
  end

  def get_lender_stats() do
    SharkAttack.Loans.get_active_loans()
    |> Enum.map(& &1.lender)
    |> Enum.uniq()
    |> Enum.map(fn x -> SharkAttack.Stats.update_history_safe(x) end)
  end

  def get_holder_distribution(addresses) do
    loans =
      SharkAttack.LoansWorker.get_all_loan_data()
      |> Enum.map(fn l ->
        %{
          borrower: l["borrower"],
          lender: l["lender"],
          collection: l["orderBook"],
          amount: l["amountSol"],
          mint: l["nftCollateralMint"],
          interest: l["earnings"],
          platform: l["platform"],
          start: l["start"],
          end: l["end"]
        }
      end)

    history =
      SharkAttack.Loans.get_loans_history_for_addresses(addresses, :month)
      |> Enum.reject(fn l -> is_nil(l.dateRepaid) end)

    addresses
    |> Enum.map(fn add ->
      main = Map.get(SharkAttack.Users.get_user_from_address!(add), :address, add)
      lender_history = history |> Enum.filter(fn l -> l.lender == add end)

      repaid = Enum.map(lender_history, fn l -> l.earnings end) |> Enum.sum()
      [turtle_count, fee_tier] = SharkAttack.Users.get_fee_amount(main)

      %{
        main: main,
        lender: add,
        turtles: turtle_count,
        month_repaid: repaid,
        month_earnings: Enum.map(lender_history, &Map.get(&1, :earnings, 0.0)) |> Enum.sum(),
        fee_estimate: repaid * fee_tier,
        active_volume:
          loans
          |> Enum.filter(fn l -> l.lender == add end)
          |> Enum.map(& &1.amount)
          |> Enum.sum()
      }
    end)
    |> Enum.sort_by(fn v -> v.active_volume end, :desc)
  end

  def get_fee_overview() do
    all_active_fees =
      SharkAttack.LenderFee.get_active_fees()
      |> Repo.preload(:offer)
      |> Enum.filter(&(!is_nil(&1.offer)))

    active_automation_loans =
      SharkAttack.LenderFee.get_all_active_unpaid_automation_loans()
      |> Enum.map(& &1.offer.amount)
      |> Enum.sum()

    active_loan_fees =
      all_active_fees
      |> Enum.filter(& &1.offer.taken)
      |> Enum.map(&Map.get(&1, :amount, 0))
      |> Enum.sum()

    upcoming_fee_schedule =
      all_active_fees
      |> Enum.filter(& &1.offer.taken)
      |> Enum.group_by(fn f ->
        f.inserted_at
        |> Timex.to_date()
        |> Timex.shift(days: 7)
      end)
      |> Enum.map(fn {date, fees} ->
        %{
          date: date,
          amount: Enum.map(fees, &(Map.get(&1, :amount, 0) / 1_000_000_000)) |> Enum.sum()
        }
      end)
      |> Enum.sort_by(fn v -> v.date end, {:desc, Date})

    active_total =
      all_active_fees
      |> Enum.map(&Map.get(&1, :amount, 0))
      |> Enum.sum()

    collected_fees =
      SharkAttack.LenderFee.get_collected_fees()

    fees_grouped_by_week =
      collected_fees
      |> Enum.group_by(fn f ->
        f.updated_at
        |> Timex.to_date()
        |> Timex.Date.beginning_of_week(:sunday)
      end)
      |> Enum.map(fn {date, fees} ->
        %{
          date: date,
          amount: Enum.map(fees, &(Map.get(&1, :amount, 0) / 1_000_000_000)) |> Enum.sum()
        }
      end)
      |> Enum.sort_by(fn v -> v.date end, {:desc, Date})

    collected_total =
      collected_fees
      |> Enum.map(&Map.get(&1, :amount, 0))
      |> Enum.sum()

    collected_last_24 =
      collected_fees
      |> Enum.filter(fn f ->
        Timex.compare(f.updated_at, Timex.now() |> Timex.shift(hours: -24)) > -1
      end)
      |> Enum.map(&Map.get(&1, :amount, 0))
      |> Enum.sum()

    %{
      active_total: active_total / 1_000_000_000,
      active_offers: (active_total - active_loan_fees) / 1_000_000_000,
      active_loans: active_loan_fees / 1_000_000_000,
      auto_defaults: SharkAttack.AutoForeclose.get_foreclosed_loan_count() * 0.01144768,
      collected_last_24: collected_last_24 / 1_000_000_000,
      collected: collected_total / 1_000_000_000,
      collected_by_week: fees_grouped_by_week,
      automation_loans_tvl: active_automation_loans / 1_000_000_000,
      automation_offer_tvl: get_automation_tvl(),
      upcoming_fee_schedule: upcoming_fee_schedule
    }
  end

  def get_automation_tvl() do
    query =
      from offer in SharkAttack.Loans.Offer,
        where: offer.automation == true,
        where: is_nil(offer.taken),
        where: is_nil(offer.rescinded),
        select: sum(offer.amount) / 1_000_000_000

    SharkAttack.Repo.all(query)
  end
end
