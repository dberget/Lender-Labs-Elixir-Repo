defmodule SharkAttackWeb.RaffleController do
  use SharkAttackWeb, :controller
  require Logger

  @pool_address "TRTPt95VNwzPMrmB3D4zceqVACipq35QWoQ1xhNorck"
  @lamports_per_sol 1_000_000_000

  def index(conn, params) do
    raffles =
      SharkAttack.Raffles.get_active_raffles()

    raffle_data =
      raffles
      |> Enum.map(fn raffle ->
        %{
          raffle: raffle,
          entries: raffle.entries,
          total_entries: Enum.map(raffle.entries, fn entry -> entry.entries end) |> Enum.sum(),
          user_entries:
            raffle.entries
            |> Enum.filter(fn entry -> entry.user == params["user"] end)
            |> Enum.map(fn entry -> entry.entries end)
            |> Enum.sum()
        }
      end)

    pool_balance = SharkAttack.Solana.fetch_native_balance(@pool_address)

    existing_points =
      SharkAttack.Points.get_user_points(params["user"])

    all_points =
      SharkAttack.Points.all()
      |> Enum.map(fn p -> p.total_amount end)
      |> Enum.sum()

    price_per_point = pool_balance / all_points

    conn
    |> json(%{
      raffle_data: raffle_data,
      claim_data: %{
        pool_balance: pool_balance,
        user_points: existing_points.total_amount,
        all_points: all_points,
        price_per_point: price_per_point,
        redeemable_sol: existing_points.total_amount * (pool_balance / all_points)
      }
    })
  end

  def get_user_raffle_entries(conn, params) do
    raffle_entries =
      SharkAttack.Raffles.get_raffle_entries_by_user(params["user"])

    conn
    |> json(raffle_entries)
  end

  def claim_sol(conn, params) do
    existing_points =
      SharkAttack.Points.get_user_points(params["user"])

    {amount, ""} = Integer.parse(params["amount"])

    IO.inspect(amount, label: "amount")
    IO.inspect(existing_points.total_amount, label: "existing_points_total")

    case existing_points.total_amount < amount do
      true ->
        conn
        |> json(%{error: "not enough points"})

      false ->
        pool_balance = SharkAttack.Solana.fetch_native_balance(@pool_address)

        all_points =
          SharkAttack.Points.all()
          |> Enum.map(fn p -> p.total_amount end)
          |> Enum.sum()

        points_per_sol = pool_balance / all_points

        tx =
          %{}
          |> Map.put("user", params["user"])
          |> Map.put("lamports", (amount * points_per_sol) |> floor())
          |> Map.put("points", amount)
          |> SharkAttack.SharkyApi.claim_rewards()

        {:ok, _point_entry} =
          SharkAttack.Points.create(%{
            address: params["user"],
            source: tx,
            amount: amount * -1,
            event_type: "CLAIM_SOL",
            platform: "LL"
          })

        conn
        |> json(%{
          tx: tx,
          point_entry: amount
        })
    end
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
