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
end
