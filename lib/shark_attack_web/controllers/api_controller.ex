defmodule SharkAttackWeb.ApiController do
  alias SharkAttack.DiscordConsumer
  alias SharkAttack.Discord
  alias SharkAttack.SharkyApi
  use SharkAttackWeb, :controller

  def index(conn, _params) do
    conn
    |> json(%{message: "Hello from the API!"})
  end

  def bundle(conn, params) do
    case SharkyApi.send_bundle(params) do
      {:error, _res} ->
        conn
        |> put_status(400)
        |> json("error")

      res ->
        conn
        |> json(res)
    end
  end

  def get_recent_loans(conn, params) do
    SharkAttack.Stats.update_history_safe(params["pk"])

    loans =
      case params["completed"] do
        "true" ->
          SharkAttack.Loans.get_loans_history!(params["pk"], Map.get(params, "limit", 5))

        _ ->
          SharkAttack.LoansWorker.get_lender_loans(params["pk"])
          |> Enum.reduce([], fn {_key, _loan, _lender, value}, acc ->
            if value["state"] in ["taken", "active"] do
              [value | acc]
            else
              acc
            end
          end)
          |> Enum.sort_by(& &1["start"], :desc)
          |> Enum.take(Map.get(params, "limit", 5))
      end

    conn
    |> json(%{data: loans})
  end

  def get_history(conn, %{"collection" => "1"} = params) do
    SharkAttack.Stats.update_history_safe(params["pk"])

    collections = SharkAttack.Collections.list_collections()

    loans = SharkAttack.Loans.get_loans_history!(params["pk"])

    grouped_loans =
      loans
      |> Enum.group_by(fn l -> l.orderBook end)
      |> Enum.map(fn {k, v} ->
        %{
          name:
            Map.get(
              Enum.find(collections, %{}, fn c -> c.sharky_address == k or c.foxy_address == k end),
              :name,
              "Unknown"
            ),
          count: Enum.count(v),
          profit: v |> Enum.map(& &1.earnings) |> Enum.sum(),
          tvl: Enum.map(v, fn l -> l.amountSol end) |> Enum.sum(),
          defaulted: Enum.filter(v, fn l -> !is_nil(l.forecloseTxId) end) |> Enum.count(),
          average_loan: (Enum.map(v, fn l -> l.amountSol end) |> Enum.sum()) / Enum.count(v),
          unique_borrowers: Enum.map(v, fn l -> l.borrower end) |> Enum.uniq() |> Enum.count(),
          average_profit: (v |> Enum.map(& &1.earnings) |> Enum.sum()) / Enum.count(v),
          average_offer_duration:
            Timex.Duration.from_erl(
              {0,
               round(
                 (v
                  |> Enum.filter(&is_nil(&1.dateForeclosed))
                  |> Enum.map(&Timex.diff(&1.dateTaken, &1.dateOffered, :seconds))
                  |> Enum.sum()) /
                   Enum.count(v)
               ), 0}
            )
            |> Timex.format_duration(:humanized),
          average_loan_duration:
            Timex.Duration.from_erl(
              {0,
               round(
                 (v
                  |> Enum.filter(&is_nil(&1.dateForeclosed))
                  |> Enum.map(&Timex.diff(&1.dateRepaid, &1.dateTaken, :seconds))
                  |> Enum.sum()) /
                   Enum.count(v)
               ), 0}
            )
            |> Timex.format_duration(:humanized)
        }
      end)

    conn
    |> json(grouped_loans)
  end

  def get_history(conn, params) do
    SharkAttack.Stats.update_history_safe(params["pk"])

    collections = SharkAttack.Collections.list_collections()
    loans = SharkAttack.Loans.get_loans_history!(params["pk"])

    forelosedLoans = Enum.filter(loans, fn l -> !is_nil(l.dateForeclosed) end)

    data = %{
      loans:
        loans
        |> Enum.map(fn l ->
          %{
            l
            | collection_name:
                Map.get(
                  Enum.find(collections, %{}, fn c ->
                    c.sharky_address == l.orderBook || c.foxy_address == l.orderBook
                  end),
                  :name,
                  l.orderBook
                )
          }
        end),
      foreclosed: forelosedLoans,
      totalSolLoaned: Enum.map(loans, fn l -> l.amountSol end) |> Enum.sum(),
      totalInterest: Enum.map(loans, &Map.get(&1, :earnings, 0.0)) |> Enum.sum(),
      foreclosedCount: Enum.count(forelosedLoans)
    }

    conn
    |> json(data)
  end

  def get_borrower_history(conn, params) do
    SharkAttack.Stats.update_borrow_history_safe(params["borrower"])

    loans = SharkAttack.Loans.get_loans_history!(params["borrower"], "borrower")

    forelosedLoans = Enum.filter(loans, fn l -> !is_nil(l.dateForeclosed) end)

    data = %{
      loans: loans,
      foreclosed: forelosedLoans,
      totalSolLoaned: Enum.map(loans, fn l -> l.amountSol end) |> Enum.sum(),
      totalInterest: Enum.map(loans, & &1.earnings) |> Enum.sum(),
      foreclosedCount: Enum.count(forelosedLoans)
    }

    conn
    |> json(data)
  end

  def get_borrower_summary(conn, params) do
    SharkAttack.Stats.update_borrow_history_safe(params["pk"])

    historical_loans = SharkAttack.Loans.get_loans_history!(params["pk"], "borrower")
    historical_loan_count = Enum.count(historical_loans)

    loans = SharkAttack.LoansWorker.get_borrower_loans(params["pk"])

    forelosedLoans = Enum.filter(historical_loans, fn l -> !is_nil(l.dateForeclosed) end)
    forelosedLoanCount = forelosedLoans |> Enum.count()

    data = %{
      completed_loans: historical_loan_count,
      foreclosed: forelosedLoans,
      active_loan_count: Enum.count(loans),
      loans: loans |> Enum.sort_by(& &1["end"]),
      totalSolLoaned: Enum.map(historical_loans, fn l -> l.amountSol end) |> Enum.sum(),
      totalInterest: Enum.map(historical_loans, & &1.earnings) |> Enum.sum(),
      activeSolLoaned: Enum.map(loans, & &1["amountSol"]) |> Enum.sum(),
      activeInterest: Enum.map(loans, & &1["earnings"]) |> Enum.sum(),
      default_ratio: get_default_ratio(forelosedLoanCount, historical_loan_count),
      avg_repayment:
        Timex.Duration.from_erl(
          {0,
           round(
             historical_loans
             |> Enum.filter(&is_nil(&1.dateForeclosed))
             |> Enum.map(&Timex.diff(&1.dateRepaid, &1.dateTaken, :seconds))
             |> Enum.reject(&is_tuple/1)
             |> Enum.sum()
             |> get_avg_repayment(historical_loan_count)
           ), 0}
        )
        |> Timex.format_duration(:humanized),
      foreclosedCount: forelosedLoanCount
    }

    conn
    |> json(data)
  end

  def get_avg_repayment(0, _total_loans) do
    0
  end

  def get_avg_repayment(sum, historical_loan_count) do
    sum / historical_loan_count
  end

  def get_default_ratio(0, _total_loans) do
    0
  end

  def get_default_ratio(foreclosed_loans, total_loans) do
    foreclosed_loans / total_loans * 100
  end

  def get_borrower_loans(conn, params) do
    loans =
      SharkAttack.LoansWorker.get_all_loans()
      |> Enum.filter(&(&1["borrower"] == params["borrower"]))
      |> Enum.map(&Map.drop(&1, ["secondsUntilForeclosable"]))
      |> Enum.sort_by(& &1["end"], :asc)

    summary = %{
      totalSolLoaned: Enum.map(loans, fn l -> l["amountSol"] end) |> Enum.sum(),
      totalInterest: Enum.map(loans, fn l -> l["earnings"] end) |> Enum.sum()
    }

    conn |> json(%{loans: loans, summary: summary})
  end

  def get_collection_trading_history(conn, params) do
    {id, ""} = Integer.parse(params["collection_id"])

    volume_data =
      SharkAttack.FloorWorker.get_volume(id)

    history =
      SharkAttack.Tensor.get_trading_history(
        volume_data["tslug"],
        Map.get(params, "count_back", 60)
      )

    conn
    |> json(history)
  end

  def get_all_loans(conn, _params) do
    loans = SharkAttack.LoansWorker.get_all_loan_data()

    conn
    |> json(loans)
  end

  def get_all_collection_loans(conn, _params) do
    loans = SharkAttack.LoansWorker.get_all_collection_loans()

    conn
    |> json(loans)
  end

  def get_lending_summary(conn, _params) do
    loans = SharkAttack.LoansWorker.get_all_loans()
    ll_loans = loans |> Enum.filter(& &1["is_ll_offer"])

    count_uw =
      loans
      |> Enum.group_by(fn l -> l["orderBook"] end)
      |> Enum.reduce(0, fn {orderBook, loans}, count ->
        c = SharkAttack.Collections.get_collection_from_loan(orderBook)
        floor_price = Map.get(c, :id) |> SharkAttack.FloorWorker.get_floor_price()

        {coll_count, _} = get_underwater_loans(loans, floor_price)

        count + coll_count
      end)

    {tvl, last_24, last_7} =
      loans
      |> Enum.reduce({0, 0, 0}, fn l, {tvl, last_24, last_7} ->
        second_diff = DateTime.diff(DateTime.utc_now(), DateTime.from_unix!(l["start"]), :second)

        cond do
          second_diff <= 86400 ->
            {tvl + l["amountSol"], last_24 + l["amountSol"], last_7}

          second_diff <= 604_800 ->
            {tvl + l["amountSol"], last_24, last_7 + l["amountSol"]}

          true ->
            {tvl + l["amountSol"], last_24, last_7}
        end
      end)

    data = %{
      activeLoans: Enum.count(loans),
      ll_tvl: ll_loans |> Enum.map(& &1["amountSol"]) |> Enum.sum(),
      tvl: tvl,
      tvl_24: last_24,
      tvl_7: last_7,
      underWater: count_uw
    }

    conn
    |> json(data)
  end

  def get_ll_volume(conn, _params) do
    loans = SharkAttack.LoansWorker.get_all_loans()

    ll_loans = loans |> Enum.filter(& &1["is_ll_offer"])

    data = %{
      activeLoans: Enum.count(ll_loans),
      ll_tvl: ll_loans |> Enum.map(& &1["amountSol"]) |> Enum.sum()
    }

    conn
    |> json(data)
  end

  def get_lender_loans(conn, %{"cache" => "1"} = params) do
    loans =
      SharkAttack.LoansWorker.get_lender_loans(params["lender"])
      |> Enum.map(&elem(&1, 3))
      |> Enum.filter(fn l -> l["platform"] == "Sharky" end)

    takenLoans =
      Enum.filter(loans, fn l -> l["state"] == "taken" end)
      |> List.flatten()

    offers =
      Enum.filter(loans, fn l -> l["state"] == "offered" end)
      |> Enum.sort_by(& &1["offerTime"], :asc)

    loanSummary = %{
      totalSolLoaned: Enum.map(takenLoans, fn l -> l["amountSol"] end) |> Enum.sum(),
      totalEarnings: Enum.map(takenLoans, fn l -> l["earnings"] end) |> Enum.sum(),
      activeLoans: takenLoans
    }

    offerSummary = %{
      totalSolOffered: Enum.map(offers, fn l -> l["amountSol"] end) |> Enum.sum(),
      activeOffers: offers
    }

    conn
    |> json(%{offerSummary: offerSummary, loanSummary: loanSummary})
  end

  def get_lender_loans(conn, params) do
    loans =
      SharkAttack.LoansWorker.get_lender_loans(params["lender"])
      |> Enum.map(&elem(&1, 3))

    takenLoans =
      loans
      |> Enum.filter(fn l -> l["state"] in ["taken", "active"] end)

    offers =
      loans
      |> Enum.filter(fn l -> l["state"] in ["offered", "waitingForBorrower"] end)

    {totalSolLoaned, totalEarnings, activeLoans} =
      takenLoans
      |> Enum.reduce({0, 0, []}, fn loan, {sumSol, sumEarnings, loans} ->
        {sumSol + loan["amountSol"], sumEarnings + loan["earnings"],
         [calculate_ltv_value(loan) | loans]}
      end)

    loanSummary = %{
      totalSolLoaned: totalSolLoaned,
      totalEarnings: totalEarnings,
      activeLoans: activeLoans
    }

    {totalSolOffered, activeOffers} =
      offers
      |> Enum.reduce({0, []}, fn offer, {sumSol, offers} ->
        {sumSol + offer["amountSol"], [calculate_ltv_value(offer) | offers]}
      end)

    offerSummary = %{totalSolOffered: totalSolOffered, activeOffers: activeOffers}

    conn
    |> json(%{offerSummary: offerSummary, loanSummary: loanSummary})
  end

  def get_unpaid_fees(conn, params) do
    unpaid_fees =
      SharkAttack.LenderFee.get_unpaid_automation_fees(params["lender"])

    conn
    |> json(%{unpaid_fees: unpaid_fees})
  end

  def get_citrus_listings(conn, _params) do
    offers =
      SharkAttack.LoansWorker.get_all_offers()
      |> Enum.filter(&(&1["state"] == "waitingForLender"))

    conn
    |> json(offers)
  end

  def get_collection(conn, params) do
    case SharkAttack.Collections.get_collection(params["collection_id"], params["platform"]) do
      nil ->
        conn
        |> put_status(404)
        |> json(%{error: "Collection not found"})

      collection ->
        floor_price = SharkAttack.FloorWorker.get_floor_price(collection.id)

        sharky_loans_and_offers =
          SharkAttack.LoansWorker.get_collection_loans(collection.sharky_address)

        citrus_loans_and_offers =
          SharkAttack.LoansWorker.get_collection_loans(collection.foxy_address)
          |> Enum.map(fn loan ->
            calculate_ltv_value(loan, floor_price)
          end)

        loans_and_offers = [sharky_loans_and_offers, citrus_loans_and_offers] |> List.flatten()

        offers =
          loans_and_offers
          |> Enum.filter(
            &(&1["state"] == "offered" ||
                (&1["state"] == "waitingForBorrower" &&
                   &1["borrower"] == "11111111111111111111111111111111"))
          )
          |> Enum.sort_by(& &1["amountSol"], :desc)

        loans =
          loans_and_offers
          |> Enum.filter(&(&1["state"] == "taken" || &1["state"] == "active"))
          |> Enum.sort_by(& &1["start"], :desc)

        underWater = get_underwater_loans(loans, floor_price)
        volume = SharkAttack.FloorWorker.get_volume(collection)

        conn
        |> json(%{
          collection: %{
            id: collection.id,
            sharky_address: collection.sharky_address,
            foxy_address: collection.foxy_address,
            rain_fi_id: collection.rain_fi_id,
            frakt_address: collection.frakt_address,
            duration: collection.duration,
            logo: collection.logo,
            apy: collection.apy,
            name: collection.name,
            fp: floor_price,
            lastTaken: Enum.take(loans, 1) |> List.first(%{}) |> Map.drop(["rawData"]),
            offers: offers,
            loans: loans,
            countUnderWater: elem(underWater, 0),
            averageUnderwater: elem(underWater, 1),
            volume: volume
          }
        })
    end
  end

  def get_collection_offers(conn, params) do
    # users = SharkAttack.Users.list!() |> Enum.map(& &1.address)

    offers =
      SharkAttack.LoansWorker.get_collection_loans(params["collection"])
      |> Enum.filter(&(&1["state"] == "offered"))
      |> Enum.sort_by(& &1["amountSol"], :desc)

    # grouped_offers =
    #   offers
    #   |> Enum.group_by(&(round(&1["amountSol"] * 100) / 100))

    # max =
    #   grouped_offers
    #   |> Map.keys()
    #   |> Enum.max()

    # Map.get(grouped_offers, max)

    conn
    |> json(offers)
  end

  def get_collection_foreclosures(conn, params) do
    collection = SharkAttack.Collections.get_collection(params["collection"])

    data = SharkAttack.Loans.get_collection_foreclosures(collection.id)

    count_per_day =
      data
      |> Enum.group_by(&(Map.get(&1, :dateForeclosed) |> Timex.to_date()))
      |> Enum.map(fn {date, loans} -> %{date: date, count: Enum.count(loans)} end)
      |> Enum.sort_by(& &1.date, {:desc, Date})
      |> Enum.take(30)

    conn
    |> json(%{data: count_per_day})
  end

  def get_user_favorites(conn, params) do
    loans = SharkAttack.LoansWorker.get_all_collection_loans()

    collections =
      SharkAttack.Users.get_user_favorites(params["address"])
      |> Enum.map(fn c -> format_collection(c, loans) end)

    conn
    |> json(collections)
  end

  def save_favorite(conn, params) do
    SharkAttack.Users.save_favorite(params["address"], params["collection"])

    conn
    |> json(%{message: "ok"})
  end

  def remove_favorite(conn, params) do
    SharkAttack.Users.delete_favorite(params["collection"], params["address"])

    conn
    |> json(%{message: "ok"})
  end

  def flush_loans(conn, _params) do
    SharkAttack.LoansWorker.flush()

    conn
    |> json(%{message: "Flushed!"})
  end

  def get_collection_list(conn, params) do
    loans = SharkAttack.LoansWorker.get_all_collection_loans()

    collections =
      SharkAttack.Collections.list_collections(%{sharky: params["sharky"]})
      |> Enum.map(fn c -> format_collection(c, loans) end)
      |> Enum.reject(fn c -> c.fp == 0 and c.loans == 0 and c.offers == 0 end)

    conn
    |> json(collections)
  end

  defp format_collection(c, loans) do
    {_ob, collection_loans} =
      Enum.find(loans, {nil, []}, fn l -> elem(l, 0) == c.sharky_address end)

    offers =
      collection_loans
      |> Enum.filter(&(&1["state"] == "offered"))
      |> Enum.map(& &1["amountSol"])
      |> Enum.sort(:desc)

    highestOffer =
      case offers do
        [] ->
          0

        _ ->
          Enum.max(offers, fn -> 0 end)
      end

    loans =
      collection_loans
      |> Enum.filter(&(&1["state"] == "taken"))
      |> Enum.sort_by(& &1["start"], :desc)

    last_24 =
      loans
      |> Enum.filter(fn l ->
        DateTime.diff(DateTime.utc_now(), DateTime.from_unix!(l["start"]), :second) < 86400
      end)
      |> length()

    last_hour =
      loans
      |> Enum.filter(fn l ->
        DateTime.diff(DateTime.utc_now(), DateTime.from_unix!(l["start"]), :second) < 3600
      end)
      |> length()

    fp = SharkAttack.FloorWorker.get_floor_price(c.id)

    volume = SharkAttack.FloorWorker.get_volume(c)
    underWater = get_underwater_loans(loans, fp)

    grouped_offers =
      offers
      |> Enum.group_by(&(round(&1 * 100) / 100))
      |> Map.keys()
      |> Enum.sort(:desc)

    %{
      id: c.id,
      sharky_address: c.sharky_address,
      foxy_address: c.foxy_address,
      duration: c.duration,
      apy: c.apy,
      name: c.name,
      offers: length(offers),
      offersList: grouped_offers,
      allOffers: offers,
      loans: length(loans),
      lastTaken: Enum.take(loans, 1) |> List.first(%{}) |> Map.drop(["rawData"]),
      logo: c.logo,
      highestOffer: highestOffer,
      countUnderWater: elem(underWater, 0),
      me_slug: c.me_slug,
      volume: volume,
      averageUnderwater: elem(underWater, 1),
      fp: fp,
      last_24: last_24,
      last_hour: last_hour,
      ltf:
        unless highestOffer == 0 or fp == 0 or is_nil(fp) do
          highestOffer / fp * 100
        end
    }
  end

  defp get_underwater_loans(_, nil), do: {0, 0}

  defp get_underwater_loans([], _fp), do: {0, 0}

  defp get_underwater_loans(loans, fp) do
    underWaterLoans = Enum.filter(loans, fn l -> l["amountSol"] + l["earnings"] > fp end)

    case underWaterLoans do
      [] ->
        {0, 0}

      _ ->
        lengthUnderWaterLoans = length(underWaterLoans)

        averageUnderwater =
          (Enum.map(underWaterLoans, &(&1["amountSol"] + &1["earnings"]))
           |> Enum.sum()) /
            lengthUnderWaterLoans

        {lengthUnderWaterLoans, averageUnderwater}
    end
  end

  def analyze_collection_data(conn, _params) do
    loans = SharkAttack.LoansWorker.get_all_collection_loans()

    collections =
      SharkAttack.Collections.list_collections()
      |> Enum.map(fn c ->
        fp = SharkAttack.FloorWorker.get_floor_price(c.id)

        {_ob, sharky_loans} =
          Enum.find(loans, {nil, []}, fn l -> elem(l, 0) == c.sharky_address end)

        {_ob, citrus_loans} =
          Enum.find(loans, {nil, []}, fn l -> elem(l, 0) == c.foxy_address end)

        # frakt_loans = SharkAttack.SharkyApi.get_collection_loans(c.frakt_address, "frakt")

        sharky = SharkAttack.Analytics.build_overview(c.id, sharky_loans, "sharky")
        citrus = SharkAttack.Analytics.build_overview(c.id, citrus_loans, "citrus")

        # frakt = SharkAttack.Analytics.build_overview(c.id, frakt_loans, "citrus")

        rollup = %{
          offers: sharky.offers + citrus.offers,
          loans: sharky.loans + citrus.loans,
          countUnderWater: sharky.countUnderWater + citrus.countUnderWater,
          averageUnderwater: SharkAttack.Analytics.average_underwater(sharky, citrus),
          last_24: sharky.last_24 + citrus.last_24,
          tvl: sharky.tvl + citrus.tvl
        }

        %{
          id: c.id,
          name: c.name,
          sharky_address: c.sharky_address,
          rollup: rollup,
          citrus: citrus,
          sharky: sharky,
          logo: c.logo,
          hyperspace_id: c.hyperspace_id,
          fp: fp
        }
      end)
      |> Enum.reject(fn c -> c.fp == 0 and c.sharky.loans == 0 and c.sharky.offers == 0 end)

    conn
    |> json(collections)
  end

  def whales(conn, _params) do
    collections = SharkAttack.Collections.list_collections()

    loans =
      SharkAttack.LoansWorker.get_all_loans()
      |> Enum.reject(fn l ->
        l["borrower"] == "" or l["borrower"] == "11111111111111111111111111111111"
      end)
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

    borrowerGroup =
      loans
      |> Enum.group_by(fn l -> l.borrower end)
      |> Enum.map(fn {k, v} ->
        %{
          borrower: k,
          loanCount: length(v),
          amount: Enum.map(v, & &1.amount) |> Enum.sum(),
          interest: Enum.map(v, & &1.interest) |> Enum.sum(),
          favorite: get_most_borrowed(v, collections)
        }
      end)
      |> Enum.sort_by(fn v -> v.amount end, :desc)

    offers = SharkAttack.Offers.last_month_offers()

    lenderGroup =
      loans
      |> Enum.group_by(fn l -> l.lender end)
      |> Enum.map(fn {k, v} ->
        %{
          lender: k,
          loanCount: length(v),
          amount: Enum.map(v, & &1.amount) |> Enum.sum(),
          profit: Enum.map(v, & &1.interest) |> Enum.sum(),
          is_ll_user: Enum.any?(offers, &(&1.lender == k)),
          favorite: get_most_borrowed(v, collections)
        }
      end)
      |> Enum.sort_by(fn v -> v.amount end, :desc)

    conn
    |> json(%{
      unique_borrowers: borrowerGroup |> length(),
      unique_lenders: lenderGroup |> length(),
      borrowerGroup: borrowerGroup |> Enum.take(500),
      lenderGroup: lenderGroup |> Enum.take(500)
    })
  end

  def get_holder_distribution(conn, _params) do
    lenders =
      SharkAttack.Offers.last_month_offers() |> Enum.map(& &1.lender) |> Enum.uniq()

    lenderGroup =
      SharkAttack.Stats.get_holder_distribution(lenders)

    fee_total = lenderGroup |> Enum.map(& &1.fee_estimate) |> Enum.sum()
    tvl = lenderGroup |> Enum.map(& &1.month_repaid) |> Enum.sum()
    earnings = lenderGroup |> Enum.map(& &1.month_earnings) |> Enum.sum()
    lender_count = lenderGroup |> Enum.count()

    conn
    |> json(%{
      holders: lenderGroup,
      lender_count: lender_count,
      total_repaid: tvl,
      holder_earnings: earnings,
      estimated_fees_sol: fee_total
    })
  end

  defp get_most_borrowed(values, collections) do
    favorite =
      Enum.frequencies(Enum.map(values, & &1.collection))
      |> Enum.max_by(fn {_, v} -> v end)
      |> elem(0)

    Enum.find(collections, %{}, fn c ->
      c.sharky_address == favorite or c.foxy_address == favorite
    end)
    |> Map.get(:name)
  end

  def get_borrower_collections(conn, params) do
    borrower_loans =
      SharkAttack.LoansWorker.get_borrower_loans(params["borrower"])
      |> Enum.map(fn l -> l["nftCollateralMint"] end)

    mints =
      params["borrower"]
      |> SharkAttack.Solana.get_user_token_mints()
      |> Enum.filter(&(&1["tokenAmount"]["amount"] == "1"))
      |> Enum.reject(&(&1["delegatedAmount"]["amount"] === "1"))
      |> Enum.map(& &1["mint"])
      |> Enum.reject(fn m -> m in borrower_loans end)

    collections =
      mints
      |> SharkAttack.Collections.get_collections_from_mint_list()
      |> Enum.map(fn c ->
        %{
          c
          | fp: SharkAttack.FloorWorker.get_floor_price(c.id)
        }
      end)
      |> Enum.sort_by(& &1.fp, :desc)

    %{"indexes" => indexes} = SharkAttack.SharkyApi.get_sharky_indexes(mints)

    conn |> json(%{collections: collections, indexes: indexes})
  end

  def get_daily_volume(conn, _params) do
    conn
    |> json(%{data: SharkAttack.Stats.get_daily_volume()})
  end

  def get_foreclosure_summary(conn, _params) do
    conn
    |> json(%{data: SharkAttack.Stats.get_foreclosure_summary()})
  end

  def get_sharky_indexes(conn, params) do
    res = SharkAttack.SharkyApi.get_sharky_indexes(params["mints"])

    conn |> json(res)
  end

  def remove_loan(conn, params) do
    SharkAttack.LoansWorker.delete_loan(params["loanAddress"])
    SharkAttack.Offers.rescind_offer(params["loanAddress"])

    conn
    |> json(%{message: "ok"})
  end

  def save_nft_image(conn, params) do
    res =
      SharkAttack.Nfts.update_nft(
        %SharkAttack.Collections.Nft{mint: params["nft_mint"]},
        %{image: params["image"]}
      )

    conn |> json(%{data: res})
  end

  def save_loan_taken(conn, params) do
    res =
      try do
        Map.update(params, "amount", 0, &(&1 / 1_000_000_000))
        |> SharkAttack.Rewards.create_borrow_entry()

        SharkAttack.Loans.insert_taken_loan(params)
      rescue
        error ->
          SharkAttack.DiscordConsumer.send_to_webhook(
            "me",
            "Unable to save rewards: #{inspect(error)} \n #{inspect(params)}"
          )
      end

    json(conn, res)
  end

  def get_nft(conn, params) do
    res = SharkAttack.Nfts.get_and_save_nft_data(params["mint"])

    conn |> json(res)
  end

  def get_fee_history(conn, params) do
    res = SharkAttack.LenderFee.get_fees_for_user(params["address"])

    conn |> json(res)
  end

  def search_collections(conn, params) do
    collections = SharkAttack.Collections.search_collection_by_name(params["name"])

    conn
    |> json(%{data: collections})
  end

  def update_offer(conn, params) do
    SharkAttack.Offers.update_or_create_offer(params)

    conn
    |> json(%{message: "ok"})
  end

  def update_loan_earnings(conn, params) do
    loan = SharkAttack.Loans.get_loan!(params["loan"])

    case SharkAttack.Loans.update_loan(loan, %{
           earnings: params["earnings"]
         }) do
      {:ok, _loan} ->
        conn
        |> json(%{message: "Updated!"})

      {:error, _changeset} ->
        conn
        |> json(%{message: "Error, please try again"})
    end
  end

  defp calculate_ltv_value(%{"amountSol" => 0, "state" => "waitingForBorrower"} = loan) do
    collection = SharkAttack.Collections.get_collection_from_loan(loan["orderBook"])

    floor_price = SharkAttack.FloorWorker.get_floor_price(Map.get(collection, :id))

    calculate_ltv_value(loan, floor_price)
  end

  defp calculate_ltv_value(loan) do
    loan
  end

  defp calculate_ltv_value(loan, nil) do
    loan
  end

  defp calculate_ltv_value(
         %{"amountSol" => 0, "state" => "waitingForBorrower"} = loan,
         fp
       ) do
    ltv_amount = get_in(loan, ["rawData", "ltvTerms", "ltvBps"]) / 10000 * fp
    max_offer = get_in(loan, ["rawData", "ltvTerms", "maxOffer"]) / 1_000_000_000

    Map.put(
      loan,
      "amountSol",
      if ltv_amount > max_offer do
        max_offer
      else
        ltv_amount
      end
    )
  end

  defp calculate_ltv_value(loan, _collection) do
    loan
  end

  def add_auto_foreclose(conn, params) do
    res =
      SharkAttack.AutoForeclose.insert_auto_foreclose(
        params["user_address"],
        params["loan_id"],
        params["nonce_account"],
        params["transaction"]
      )

    conn |> json(res)
  end

  def cancel_auto_foreclose(conn, params) do
    res = SharkAttack.AutoForeclose.close_nonce_accounts([params["nonce_account"]])
    conn |> json(res)
  end

  def get_user_nonces(conn, %{"lender" => lender, "type" => "foreclose"}) do
    res = SharkAttack.AutoForeclose.get_nonce_accounts(lender)
    conn |> json(res)
  end

  def get_user_nonces(conn, %{"lender" => lender, "type" => "rescind"}) do
    res = SharkAttack.AutoRescind.get_nonce_accounts(lender)
    conn |> json(res)
  end

  def add_auto_rescind(conn, params) do
    res =
      SharkAttack.AutoRescind.insert_auto_rescind(
        params["user_address"],
        params["loan_id"],
        params["nonce_account"],
        params["transaction"],
        SharkAttack.Helpers.safe_string_to_integer(params["duration"]),
        SharkAttack.Helpers.safe_string_to_integer(params["max_ltf"])
      )

    conn |> json(res)
  end

  def cancel_auto_rescind(conn, params) do
    res = SharkAttack.AutoRescind.close_nonce_accounts([params["nonce_account"]])
    conn |> json(res)
  end

  def fee_overview(conn, _params) do
    res = SharkAttack.Stats.get_fee_overview()

    conn |> json(res)
  end

  def track_fee(conn, params) do
    case SharkAttack.LenderFee.insert_lender_fee(
           params["user_address"],
           params["loan_id"],
           params["nonce_account"],
           params["amount"]
         ) do
      {:ok, _fee} ->
        conn
        |> json(%{success: true})

      {:error, changeset} ->
        DiscordConsumer.send_to_webhook(
          "me",
          "Unable to save fee: #{inspect(changeset)} \n #{inspect(params)}"
        )

        conn
        |> put_status(400)
        |> json(%{error: "Error, please try again"})
    end
  end
end
