defmodule SharkAttackWeb.ApiController do
  use SharkAttackWeb, :controller

  def index(conn, _params) do
    conn
    |> json(%{message: "Hello from the API!"})
  end

  def get_recent_loans(conn, params) do
    SharkAttack.Stats.update_history_safe(params["pk"])

    loans = SharkAttack.Loans.get_loans_history!(params["pk"], Map.get(params, "limit", 5))

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
              Enum.find(collections, %{}, fn c -> c.sharky_address == k end),
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
      totalInterest: Enum.map(loans, & &1.earnings) |> Enum.sum(),
      foreclosedCount: Enum.count(forelosedLoans)
    }

    conn
    |> json(data)
  end

  def get_borrower_history(conn, params) do
    SharkAttack.Stats.update_history_safe(params["borrower"])
    loans = SharkAttack.Loans.get_loans_history!(params["borrower"], "borrower")

    forelosedLoans = Enum.filter(loans, fn l -> !is_nil(l.forecloseTxId) end)

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

  def get_all_loans(conn, _params) do
    loans = SharkAttack.LoansWorker.get_all_loans()

    conn
    |> json(loans)
  end

  def get_all_collection_loans(conn, _params) do
    loans = SharkAttack.LoansWorker.get_all_collection_loans()

    conn
    |> json(loans)
  end

  def get_lender_loans(conn, %{"cache" => "1"} = params) do
    loans = SharkAttack.LoansWorker.get_lender_loans(params["lender"]) |> Enum.map(&elem(&1, 3))

    # citrusLoans = SharkAttack.SharkyApi.get_lender_loans(params["lender"], "citrus")

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
    loans = SharkAttack.SharkyApi.get_lender_loans(params["lender"])
    citrusLoans = SharkAttack.SharkyApi.get_lender_loans(params["lender"], "citrus")

    takenLoans = get_active_loans(loans, citrusLoans)
    offers = get_active_offers(loans, citrusLoans)

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

  def get_collection(conn, params) do
    case SharkAttack.Collections.get_collection(params["collection_id"]) do
      nil ->
        conn
        |> put_status(404)
        |> json(%{error: "Collection not found"})

      collection ->
        loans_and_offers =
          SharkAttack.LoansWorker.get_collection_loans(Map.get(collection, :sharky_address))

        offers =
          loans_and_offers
          |> Enum.filter(&(&1["state"] == "offered"))
          |> Enum.sort_by(& &1["amountSol"], :desc)

        loans =
          loans_and_offers
          |> Enum.filter(&(&1["state"] == "taken"))
          |> Enum.sort_by(& &1["start"], :desc)

        floor_price = SharkAttack.FloorWorker.get_floor_price(collection.id)

        conn
        |> json(%{
          collection: %{
            collection
            | fp: floor_price,
              offers: offers,
              loans: loans
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

  def get_orderbooks(conn, _params) do
    data = SharkAttack.SharkyApi.get_order_books()

    conn
    |> json(%{data: data})
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

    fp = SharkAttack.FloorWorker.get_floor_price(c.id)

    underWater =
      case loans do
        [] ->
          {0, 0}

        _ ->
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

    grouped_offers =
      offers
      |> Enum.group_by(&(round(&1 * 100) / 100))
      |> Map.keys()
      |> Enum.sort(:desc)

    %{
      id: c.id,
      sharky_address: c.sharky_address,
      duration: c.duration,
      apy: c.apy,
      name: c.name,
      offers: length(offers),
      offersList: grouped_offers,
      loans: length(loans),
      lastTaken: Enum.take(loans, 1),
      logo: c.logo,
      highestOffer: highestOffer,
      countUnderWater: elem(underWater, 0),
      hyperspace_id: c.hyperspace_id,
      averageUnderwater: elem(underWater, 1),
      fp: fp,
      last_24: last_24,
      ltf:
        unless highestOffer == 0 or fp == 0 do
          highestOffer / fp * 100
        end
    }
  end

  def analyze_collection_data(conn, params) do
    loans = SharkAttack.LoansWorker.get_all_collection_loans()

    collections =
      SharkAttack.Collections.list_collections(%{sharky: params["sharky"]})
      |> Enum.map(fn c ->
        fp = SharkAttack.FloorWorker.get_floor_price(c.id)

        {_ob, collection_loans} =
          Enum.find(loans, {nil, []}, fn l -> elem(l, 0) == c.sharky_address end)

        citrus_loans = SharkAttack.SharkyApi.get_collection_loans(c.foxy_address, "citrus")

        # frakt_loans = SharkAttack.SharkyApi.get_collection_loans(c.frakt_address, "frakt")

        sharky = SharkAttack.Analytics.build_overview(c.id, collection_loans, "sharky")
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
      |> Enum.reject(fn l -> l["borrower"] == "" end)
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
          loans: v,
          amount: Enum.map(v, & &1.amount) |> Enum.sum(),
          interest: Enum.map(v, & &1.interest) |> Enum.sum(),
          favorite: get_most_borrowed(v, collections)
        }
      end)
      |> Enum.sort_by(fn v -> v.amount end, :desc)
      |> Enum.take(20)

    lenderGroup =
      loans
      |> Enum.group_by(fn l -> l.lender end)
      |> Enum.map(fn {k, v} ->
        %{
          lender: k,
          loanCount: length(v),
          loans: v,
          amount: Enum.map(v, & &1.amount) |> Enum.sum(),
          profit: Enum.map(v, & &1.interest) |> Enum.sum(),
          favorite: get_most_borrowed(v, collections)
        }
      end)
      |> Enum.sort_by(fn v -> v.amount end, :desc)
      |> Enum.take(20)

    conn
    |> json(%{borrowerGroup: borrowerGroup, lenderGroup: lenderGroup})
  end

  defp get_most_borrowed(values, collections) do
    favorite =
      Enum.frequencies(Enum.map(values, & &1.collection))
      |> Enum.max_by(fn {_, v} -> v end)
      |> elem(0)

    Enum.find(collections, %{}, fn c -> c.sharky_address == favorite end) |> Map.get(:name)
  end

  def get_borrower_collections(conn, params) do
    mints =
      params["borrower"]
      |> SharkAttack.Solana.get_user_token_mints()
      |> Enum.reject(&(&1["tokenAmount"]["amount"] == "0" || &1["state"] == "frozen"))
      |> Enum.map(& &1["mint"])

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

  def get_sharky_indexes(conn, params) do
    res = SharkAttack.SharkyApi.get_sharky_indexes(params["mints"])

    conn |> json(res)
  end

  def remove_loan(conn, params) do
    SharkAttack.LoansWorker.remove_loan(params["loanAddress"])

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

  defp get_active_loans(sharkyLoans, citrusLoans) do
    [
      get_active_sharky_loans(sharkyLoans)
      | get_active_citrus_loans(citrusLoans)
    ]
    |> List.flatten()
  end

  defp get_active_sharky_loans(loans) when is_list(loans) do
    Enum.filter(loans, fn l -> l["state"] == "taken" end)
  end

  defp get_active_sharky_loans(_) do
    []
  end

  defp get_active_citrus_loans(loans) when is_list(loans) do
    Enum.filter(loans, fn l -> l["state"] == "active" end)
  end

  defp get_active_citrus_loans(_) do
    []
  end

  defp get_active_offers(sharkyOffers, citrusOffers) do
    [
      get_active_sharky_offers(sharkyOffers)
      | get_active_citrus_offers(citrusOffers)
    ]
    |> List.flatten()
    |> Enum.sort_by(& &1["offerTime"], :asc)
  end

  defp get_active_sharky_offers(offers) when is_list(offers) do
    Enum.filter(offers, fn l -> l["state"] == "offered" end)
  end

  defp get_active_sharky_offers(_) do
    []
  end

  defp get_active_citrus_offers(offers) when is_list(offers) do
    Enum.filter(offers, fn l -> l["state"] == "waitingForBorrower" end)
  end

  defp get_active_citrus_offers(_) do
    []
  end
end
