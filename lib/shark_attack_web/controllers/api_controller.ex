defmodule SharkAttackWeb.ApiController do
  use SharkAttackWeb, :controller

  def index(conn, _params) do
    IO.inspect("here")

    conn
    |> json(%{message: "Hello from the API!"})
  end

  def save_favorite(conn, params) do
    IO.inspect("save_favorite")

    conn
    |> json(%{message: "Hello from the API!"})
  end
end
