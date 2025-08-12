defmodule SharkAttackWeb.StakeController do
  use SharkAttackWeb, :controller
  require Logger

  def total(conn, _params) do
    res = SharkAttack.Staking.get_staked_turtle_count()

    conn
    |> json(res)
  end

  def stake(conn, params) do
    res = SharkAttack.SharkyApi.stake(params)

    conn
    |> json(res)
  end

  def unstake(conn, params) do
    res = SharkAttack.SharkyApi.unstake(params)

    conn
    |> json(res)
  end

  def get_stake_info(conn, %{"address" => address} = params) do
    try do
      validator = Map.get(params, "validator")
      mint = Map.get(params, "mint")

      kamino_obligations = SharkAttack.SharkyApi.get_kamino_obligations(address)
      IO.inspect(kamino_obligations, label: "kamino obligations")

      kamino_deposit =
        kamino_obligations
        |> Map.get("obligationData", [])
        |> Map.get("userTotalDeposit", 0)

      stake_info =
        SharkAttack.Stake.get_total_stake_held(address, validator, mint)

      sol_price = SharkAttack.Stake.get_sol_price()

      conn
      |> json(%{
        data: %{
          stake_info: stake_info,
          kamino_multiply: String.to_float(kamino_deposit) / sol_price,
          directed_validator:
            kamino_obligations
            |> Map.get("obligationData", [])
            |> Map.get("directedValidator", "")
        },
        params: %{
          address: address,
          validator: validator,
          mint: mint
        }
      })
    rescue
      error ->
        Logger.error("Error getting stake info for address #{address}: #{inspect(error)}")

        conn
        |> put_status(:bad_request)
        |> json(%{
          success: false,
          error: "Failed to retrieve stake information"
        })
    end
  end

  def get_stake_info(conn, _params) do
    conn
    |> put_status(:bad_request)
    |> json(%{
      success: false,
      error: "Address parameter is required"
    })
  end
end
