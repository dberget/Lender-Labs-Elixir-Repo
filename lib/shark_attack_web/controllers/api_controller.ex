defmodule SharkAttackWeb.ApiController do
  use SharkAttackWeb, :controller

  def index(conn, _params) do
    conn
    |> json(%{message: "Hello from the API!"})
  end

  def get_recent_loans(conn, params) do
    SharkAttack.Stats.update_history_safe(params["pk"])

    loans = SharkAttack.Loans.get_loans_history!(params["pk"], Map.get(params, "limit", 5))

    # forelosedLoans = Enum.filter(loans, fn l -> !is_nil(l.forecloseTxId) end)

    conn
    |> json(%{data: loans})
  end

  def get_history(conn, params) do
    SharkAttack.Stats.update_history_safe(params["pk"])

    collections = SharkAttack.Collections.list_collections()
    loans = SharkAttack.Loans.get_loans_history!(params["pk"])

    forelosedLoans = Enum.filter(loans, fn l -> !is_nil(l.forecloseTxId) end)

    data = %{
      loans:
        loans
        |> Enum.map(fn l ->
          %{
            l
            | collection_name:
                Map.get(
                  Enum.find(collections, fn c -> c.sharky_address == l.orderBook end),
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

    citrusLoans = SharkAttack.SharkyApi.get_lender_loans(params["lender"], "citrus")

    takenLoans =
      [
        Enum.filter(loans, fn l -> l["state"] == "taken" end)
        | Enum.filter(citrusLoans, fn l -> l["state"] == "active" end)
      ]
      |> List.flatten()

    offers =
      [
        Enum.filter(loans, fn l -> l["state"] == "offered" end)
        | Enum.filter(citrusLoans, fn l -> l["state"] == "waitingForBorrower" end)
      ]
      |> List.flatten()
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

    # SharkAttack.LoansWorker.get_lender_loans(params["lender"], params["collection"])
    # |> Enum.map(&elem(&1, 3))

    citrusLoans = SharkAttack.SharkyApi.get_lender_loans(params["lender"], "citrus")

    takenLoans =
      [
        Enum.filter(loans, fn l -> l["state"] == "taken" end)
        | Enum.filter(citrusLoans, fn l -> l["state"] == "active" end)
      ]
      |> List.flatten()

    offers =
      [
        Enum.filter(loans, fn l -> l["state"] == "offered" end)
        | Enum.filter(citrusLoans, fn l -> l["state"] == "waitingForBorrower" end)
      ]
      |> List.flatten()
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
    collection = SharkAttack.Collections.get_collection(params["collection_id"])

    loans_and_offers = SharkAttack.LoansWorker.get_collection_loans(collection.sharky_address)

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

        sharky = SharkAttack.Analytics.build_overview(c.id, collection_loans, "sharky")
        citrus = SharkAttack.Analytics.build_overview(c.id, citrus_loans, "citrus")

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
end
