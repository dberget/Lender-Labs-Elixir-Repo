defmodule SharkAttackWeb.ApiController do
  use SharkAttackWeb, :controller

  def index(conn, _params) do
    IO.inspect("here")

    conn
    |> json(%{message: "Hello from the API!"})
  end

  def save_discord(conn, params) do
    case SharkAttack.Users.create_user(params) do
      {:ok, user} ->
        conn
        |> json(%{message: "Success!"})

      {:error, changeset} ->
        conn
        |> json(%{message: "Error, please try again"})
    end
  end

  def save_favorite(conn, _params) do
    IO.inspect("save_favorite")

    conn
    |> json(%{message: "Hello from the API!"})
  end
end
