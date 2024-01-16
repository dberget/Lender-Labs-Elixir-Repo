defmodule SharkAttackWeb.RaffleController do
  use SharkAttackWeb, :controller
  require Logger

  def index(conn, _params) do
    raffles =
      SharkAttack.Raffles.get_active_raffles()

    raffle_data =
      raffles
      |> Enum.map(fn raffle ->
        %{
          raffle: raffle,
          entries: raffle.entries,
          total_entries: Enum.map(raffle.entries, fn entry -> entry.entries end) |> Enum.sum()
        }
      end)

    conn
    |> json(raffle_data)
  end

  def get_user_raffle_entries(conn, params) do
    user = SharkAttack.Users.get_user_from_address!(params["user"])

    raffle_entries =
      SharkAttack.Raffles.get_raffle_entries_by_user(user.address)

    conn
    |> json(raffle_entries)
  end

  def insert(conn, params) do
    existing_points = SharkAttack.Points.get_user_points(params["user"])

    with true <- existing_points.total_amount - params["entries"] >= 0,
         {:ok, _} <-
           SharkAttack.Points.create(%{
             address: params["user"],
             amount: params["entries"] * -1,
             event_type: "RAFFLE_ENTRY",
             platform: "LL",
             source: params["raffle_id"] |> Integer.to_string()
           }),
         {:ok, raffle_entry} <- SharkAttack.Raffles.create_raffle_entry(params) do
      conn |> json(raffle_entry)
    else
      false ->
        conn |> json(%{error: "Not enough points"})

      {:error, changeset} ->
        Logger.error("Error creating raffle entry: #{inspect(changeset)}")
        conn |> json(%{error: "Error creating raffle entry"})
    end
  end
end
