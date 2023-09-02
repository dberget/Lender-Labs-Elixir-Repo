defmodule SharkAttackWeb.RewardController do
  use SharkAttackWeb, :controller
  require Logger

  def list(conn, _params) do
    rewards = SharkAttack.Points.all()

    conn
    |> json(rewards)
  end
end
