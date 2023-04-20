defmodule SharkAttackWeb.UserController do
  use SharkAttackWeb, :controller
  require Logger

  def index(conn, %{"pk" => address}) do
    user = SharkAttack.Users.get_user_from_address!(address)

    conn
    |> json(user)
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

  def update_purchases(conn, _params) do
    SharkAttack.Users.get_purchases()

    conn
    |> json("ok")
  end
end
