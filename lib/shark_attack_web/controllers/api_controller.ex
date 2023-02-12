defmodule SharkAttackWeb.ApiController do
  use SharkAttackWeb, :controller

  def index(conn, _params) do
    IO.inspect("here")

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

    case loans do
      nil ->
        SharkAttack.Stats.save_lender_history(params["pk"])

      _ ->
        SharkAttack.SharkyApi.get_recent_history(params["pk"])
    end

    loans = SharkAttack.Loans.get_loans_history!(params["pk"])

    conn
    |> json(%{data: loans})
  end

  def get_all_loans(conn, _params) do
    loans = SharkAttack.SharkyApi.get_all_loans()

    conn
    |> json(%{data: loans})
  end

  def save_favorite(conn, _params) do
    IO.inspect("save_favorite")

    conn
    |> json(%{message: "Hello from the API!"})
  end
end
