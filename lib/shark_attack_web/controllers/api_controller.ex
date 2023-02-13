defmodule SharkAttackWeb.ApiController do
  use SharkAttackWeb, :controller

  def index(conn, _params) do
    conn
    |> json(%{message: "Hello from the API!"})
  end

  def save_discord(conn, params) do
    case SharkAttack.Users.create_user(params) do
      {:ok, _user} ->
        conn
        |> json(%{message: "Success!"})

      {:error, _changeset} ->
        conn
        |> json(%{message: "Error, please try again"})
    end
  end

  def get_history(conn, params) do
    loans = SharkAttack.Loans.get_loans_history!(params["pk"])

    # recent = hd(loans) |> IO.inspect()

    case loans do
      [] ->
        SharkAttack.Stats.save_lender_history(params["pk"])

      _ ->
        SharkAttack.Stats.save_recent_lender_history(params["pk"])
    end

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
    loans = SharkAttack.SharkyApi.get_all_loans()

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
