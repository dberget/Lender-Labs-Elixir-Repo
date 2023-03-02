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

    loans = SharkAttack.Loans.get_loans_history!(params["pk"])

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
    |> json(%{data: loans})
  end

  def get_all_collection_loans(conn, _params) do
    loans = SharkAttack.LoansWorker.get_all_collection_loans()

    conn
    |> json(loans)
  end

  def get_lender_loans(conn, params) do
    loans =
      SharkAttack.LoansWorker.get_lender_loans(params["lender"], params["collection"])
      |> Enum.map(&elem(&1, 3))

    takenLoans = Enum.filter(loans, fn l -> l["state"] == "taken" end)
    offers = Enum.filter(loans, fn l -> l["state"] == "offered" end)

    loanSummary = %{
      totalSolLoaned:
        Enum.map(takenLoans, fn l -> String.to_float(l["amountSol"]) end) |> Enum.sum(),
      totalEarnings: Enum.map(takenLoans, fn l -> l["earnings"] end) |> Enum.sum(),
      activeLoans: takenLoans
    }

    offerSummary = %{
      totalSolOffered:
        Enum.map(offers, fn l -> String.to_float(l["amountSol"]) end) |> Enum.sum(),
      activeOffers: offers
    }

    conn
    |> json(%{offerSummary: offerSummary, loanSummary: loanSummary})
  end

  def get_collection(conn, params) do
    collection = SharkAttack.Collections.get_collection_by_address(params["collection_id"])

    loans_and_offers = SharkAttack.LoansWorker.get_collection_loans(collection.sharky_address)

    offers =
      loans_and_offers
      |> Enum.filter(&(&1["state"] == "offered"))
      |> Enum.sort_by(& &1["amountSol"], :desc)

    loans =
      loans_and_offers
      |> Enum.filter(&(&1["state"] == "taken"))
      |> Enum.sort_by(& &1["start"], :desc)

    conn
    |> json(%{collection: collection, offers: offers, loans: loans})
  end

  def get_collection_offers(conn, params) do
    loans =
      SharkAttack.LoansWorker.get_collection_loans(params["collection"])
      |> Enum.filter(&(&1["state"] == "offered"))
      |> Enum.sort_by(& &1["amountSol"], :desc)

    conn
    |> json(%{data: loans})
  end

  def get_orderbooks(conn, _params) do
    data = SharkAttack.SharkyApi.get_order_books()

    conn
    |> json(%{data: data})
  end

  def save_favorite(conn, _params) do
    conn
    |> json(%{message: "Hello from the API!"})
  end

  def flush_loans(conn, _params) do
    SharkAttack.LoansWorker.flush()
  end

  def get_collection_list(conn, params) do
    collections = SharkAttack.Collections.list_collections(%{sharky: params["sharky"]})

    # [id, [loans]]
    loans = SharkAttack.LoansWorker.get_all_collection_loans()

    collections =
      Enum.map(collections, fn c ->
        {_ob, collection_loans} =
          Enum.find(loans, {nil, []}, fn l -> elem(l, 0) == c.sharky_address end)

        %{
          c
          | offers: collection_loans |> Enum.filter(&(&1["state"] == "offered")),
            loans: collection_loans |> Enum.filter(&(&1["state"] == "taken"))
        }
      end)

    conn
    |> json(collections)
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
