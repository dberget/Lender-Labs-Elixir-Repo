defmodule SharkAttackWeb.UserController do
  use SharkAttackWeb, :controller
  require Logger

  def index(conn, %{"pk" => address}) do
    user = SharkAttack.Users.get_user_from_address!(address)

    conn
    |> json(user)
  end

  def create(conn, %{"pk" => address}) do
    case SharkAttack.Users.create_user(address) do
      :ok ->
        conn
        |> json("success")

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> json(%{
          error: "Could not create user",
          reason: changeset
        })
    end
  end

  def sign(conn, params) do
    user = SharkAttack.SharkyApi.sign(params["address"])

    conn
    |> json(user)
  end

  def user_wallets(conn, %{"pk" => address}) do
    user = SharkAttack.Users.get_user_from_address!(address)

    wallets = SharkAttack.Users.get_user_wallets(user.address)

    conn
    |> json(wallets)
  end

  def remove_user_wallet(conn, params) do
    SharkAttack.Users.delete_user_wallet(params["id"])

    conn
    |> json("ok")
  end

  def update_user_wallet(conn, params) do
    if params["delete"] do
      SharkAttack.Users.delete_user_wallet(params["id"])
    end

    SharkAttack.Users.add_user_wallet(params["address"], params["user_address"])

    conn
    |> json("ok")
  end

  def get_user_saved_searches(conn, %{"pk" => address}) do
    searches = SharkAttack.Users.get_saved_searches(address)

    conn
    |> json(searches)
  end

  def delete_user_saved_search(conn, params) do
    SharkAttack.Users.delete_saved_search(params["id"])

    conn
    |> json("ok")
  end

  def save_user_search(conn, params) do
    case SharkAttack.Users.create_saved_search(params) do
      {:ok, _search} ->
        conn
        |> json("success")

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> json(%{
          error: "Could not save search",
          reason: changeset
        })
    end
  end

  def update_purchases(conn, _params) do
    SharkAttack.Users.get_purchases()

    conn
    |> json("ok")
  end
end
