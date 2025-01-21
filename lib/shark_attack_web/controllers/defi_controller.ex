defmodule SharkAttackWeb.DefiController do
  use SharkAttackWeb, :controller
  require Logger

  def dlmm_pools(conn, _params) do
    pools = SharkAttack.DLMMPools.list_pools()

    json(conn, pools)
  end

  def get_user_auto_close(conn, params) do
    auto_close =
      SharkAttack.AutoClose.get_user_auto_close(params["user_address"])

    json(conn, auto_close)
  end

  def add_auto_close(conn, params) do
    # Convert all params to string keys for consistency
    string_params = %{
      "user_address" => params["user_address"],
      "pool_address" => params["pool_address"],
      "position_address" => params["position_address"],
      "sell_direction" => params["sell_direction"],
      "exit_bin_id" => params["exit_bin_id"],
      "nonce_account" => params["nonce_account"],
      "metadata" => params["metadata"],
      "encoded_transaction" => params["encoded_transaction"]
    }

    case SharkAttack.AutoClose.insert_auto_close(string_params) do
      {:ok, res} ->
        conn |> json(res)

      {:error, error} ->
        IO.inspect(error, label: "Error")

        conn |> json(error)
    end
  end
end
