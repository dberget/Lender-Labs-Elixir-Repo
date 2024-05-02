defmodule SharkAttackWeb.RPCController do
  use SharkAttackWeb, :controller
  require Logger
  import SharkAttack.Helpers
  @rpc "https://mainnet.helius-rpc.com/?api-key=8fea9de0-b3d0-4bf4-a1fb-0945dfd91d42"

  def index(conn, %{"method" => "getAccountInfo"} = params) do
    # IO.inspect(params)

    res =
      do_post_request(@rpc, params)

    json(conn, res)
  end

  def index(conn, %{"method" => "getMultipleAccounts"} = params) do
    # IO.inspect(params)

    res =
      do_post_request(@rpc, params)

    json(conn, res)
  end

  def index(conn, params) do
    IO.inspect(params)

    res =
      do_post_request(@rpc, params)

    json(conn, res)
  end
end
