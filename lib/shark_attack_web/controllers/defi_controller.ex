defmodule SharkAttackWeb.DefiController do
  use SharkAttackWeb, :controller
  require Logger

  def dlmm_pools(conn, _params) do
    pools = SharkAttack.DLMMPools.list_pools()

    json(conn, pools)
  end
end
