defmodule SharkAttackWeb.ApiController do
  use SharkAttackWeb, :controller

  def index(conn, _params) do
    IO.inspect("here")

    conn
    |> json(%{message: "Hello from the API!"})
  end
end
