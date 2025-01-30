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

  def get_most_active_pools(conn, _params) do
    pools =
      SharkAttack.DLMMPools.list_pools()
      |> Enum.map(fn pool ->
        %{
          pool: pool,
          activity: SharkAttack.AccountMonitor.get_pool_activity(pool.address)
        }
      end)
      |> Enum.uniq_by(& &1.pool.address)
      |> Enum.sort_by(& &1.activity, :desc)
      |> Enum.take(50)

    json(conn, pools)
  end

  def get_pools_by_token(conn, params) do
    pools =
      params["token_address"]
      |> SharkAttack.DLMMPools.get_pools_by_token()
      |> Enum.map(fn pool ->
        %{
          pool: pool,
          activity: SharkAttack.AccountMonitor.get_pool_activity(pool.address)
        }
      end)
      |> Enum.sort_by(& &1.activity, :desc)
      |> Enum.take(10)

    dedup_token_addresses_x = pools |> Enum.map(& &1.pool.mint_x)
    dedup_token_addresses_y = pools |> Enum.map(& &1.pool.mint_y)

    token_analysis =
      (dedup_token_addresses_x ++ dedup_token_addresses_y)
      |> Enum.uniq()
      |> Enum.map(fn token_address ->
        {:ok, token_analysis} =
          case SharkAttack.Birdeye.analyze_market(token_address)
               |> IO.inspect(label: "Token Analysis") do
            {:ok, analysis} ->
              {:ok, analysis}

            {:error, _} ->
              {:ok, nil}
          end

        token_analysis
      end)

    json(conn, %{pools: pools, token_analysis: token_analysis})
  end

  def disable_auto_close(conn, params) do
    SharkAttack.AutoClose.disable_auto_close(params["id"])

    json(conn, "ok")
  end

  def get_total_value(conn, params) do
    pool =
      params["pool_address"]
      |> SharkAttack.DLMMPools.get_pool_by_address()

    %{balance: balance_x, mint: mint_x, decimals: decimals_x} =
      pool.reserve_x
      |> SharkAttack.Tokens.get_token_data()

    %{balance: balance_y, mint: mint_y, decimals: decimals_y} =
      pool.reserve_y
      |> SharkAttack.Tokens.get_token_data()

    tvl =
      SharkAttack.Tokens.get_token_price(mint_x) * (balance_x / 10 ** decimals_x) +
        SharkAttack.Tokens.get_token_price(mint_y) * (balance_y / 10 ** decimals_y)

    json(conn, %{tvl: tvl})
  end
end
