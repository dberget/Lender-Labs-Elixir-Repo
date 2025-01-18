defmodule SharkAttackWeb.DefiController do
  use SharkAttackWeb, :controller
  require Logger

  def dlmm_pools(conn, _params) do
    pools = SharkAttack.DLMMPools.list_pools()

    json(conn, pools)
  end

  def add_auto_close(conn, params) do
    res =
      SharkAttack.AutoClose.insert_auto_close(%{
        user_address: params["user_address"],
        pool_address: params["pool_address"],
        position_address: params["position_address"],
        sell_direction: params["sell_direction"],
        exit_bin_id: params["exit_bin_id"],
        nonce_account: params["nonce_account"],
        metadata: params["metadata"],
        encoded_transaction: params["encoded_transaction"],
        status: "ACTIVE"
      })

    conn |> json(res)
  end
end
