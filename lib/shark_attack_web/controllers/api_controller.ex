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
    loans = :ets.match(:loans, {:_, :_, :"$1"}) |> List.flatten()

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

  def get_collection_list(conn, _params) do
    collections = SharkAttack.Collections.list_collections()

    conn
    |> json(%{data: collections})
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
