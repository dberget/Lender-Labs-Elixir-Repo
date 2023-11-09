defmodule SharkAttackWeb.UserController do
  use SharkAttackWeb, :controller
  alias SharkAttack.Repo
  require Logger

  def index(conn, %{"pk" => address}) do
    user =
      case SharkAttack.Users.get_user_from_address!(address) do
        nil ->
          turtles_count = SharkAttack.Clients.Helius.has_turtles(address)

          if turtles_count > 0 do
            SharkAttack.Users.create_user(address)
          end

          %{
            address: address,
            user_settings: %{
              loan_taken: true,
              loan_repaid: true,
              loan_foreclosure: true,
              ltf_alert: false,
              summary_report: true,
              frakt_raffles: false
            }
          }

        user ->
          user
          |> Repo.preload(:user_settings)
      end

    turtles_count = SharkAttack.Clients.Helius.has_turtles(user.address)

    points = SharkAttack.Points.get_user_points(address)

    conn
    |> json(%{
      address: user.address,
      settings: user.user_settings,
      turtles_count: turtles_count,
      points: points
    })
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

  def is_holder(conn, %{"pk" => address}) do
    case SharkAttack.Users.get_user_from_address!(address) do
      nil ->
        turtles_count = SharkAttack.Clients.Helius.has_turtles(address, 0)

        conn
        |> json(%{is_holder: turtles_count > 0})

      user ->
        turtles_count = SharkAttack.Clients.Helius.has_turtles(user.address, 0)

        conn
        |> json(%{is_holder: turtles_count > 0})
    end
  end

  def reset_user_cache(conn, %{"pk" => address}) do
    SharkAttack.Clients.Helius.clear_cache(address)

    conn
    |> json("ok")
  end

  def reset_turtle_cache(conn, _params) do
    SharkAttack.SimpleCache.reset()

    conn
    |> json("ok")
  end

  def get_user_summary(conn, params) do
    user = SharkAttack.Users.get_user_from_address!(params["address"])
    last_called = SharkAttack.RateLimiter.get(params["address"])

    has_discord = user.discordId != nil

    errorMsg =
      if has_discord,
        do: "You can only send once per day",
        else: "You must subscribe in discord to use this feature"

    valid_to_call =
      has_discord and
        case last_called do
          nil ->
            true

          _ ->
            Timex.compare(Timex.today(), last_called) == 1
        end

    case valid_to_call do
      false ->
        conn
        |> put_status(400)
        |> json(%{
          error: errorMsg
        })

      true ->
        data = SharkAttack.Notifications.send_weekly_summary(params["address"])

        SharkAttack.RateLimiter.put(params["address"], Timex.today())

        json(conn, data)
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

  def save_settings(conn, %{"pk" => address, "settings" => new_settings}) do
    settings = SharkAttack.Users.get_settings(address)
    SharkAttack.Users.save_user_setting(settings, new_settings)

    conn
    |> json(settings)
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
