defmodule SharkAttackWeb.RPCController do
  use SharkAttackWeb, :controller
  require Logger
  import SharkAttack.Helpers
  @rpc "https://mainnet.helius-rpc.com/?api-key=8fea9de0-b3d0-4bf4-a1fb-0945dfd91d42"

  def index(conn, %{"method" => "getAccountInfo"} = params) do
    res =
      case :ets.lookup(:accounts, params["pubkey"]) do
        [{_, account}] ->
          Logger.info("Cache hit")

          data =
            format_account(account)

          %{
            "id" => "cache-hit",
            "jsonrpc" => "2.0",
            "result" => %{
              "context" => %{
                "apiVersion" => "1.17.31",
                "slot" => 263_519_770
              },
              "value" => data
            }
          }

        [] ->
          do_post_request(@rpc, params)
      end

    json(conn, res)
  end

  def index(conn, %{"method" => "getMultipleAccounts"} = params) do
    process_request(conn, params)
  end

  def index(conn, params) do
    res =
      do_post_request(@rpc, params)

    json(conn, res)
  end

  def process_request(conn, params) do
    [address_list, encoding] = params["params"]

    results = fetch_cached_accounts(address_list)
    remaining = find_remaining_addresses(address_list, results)

    result =
      if remaining == [] do
        cache_hit_response(results)
      else
        do_remote_request(params, remaining, encoding, results)
      end

    json(conn, result)
  end

  defp fetch_cached_accounts(address_list) do
    :ets.foldl(
      fn {pk, account}, acc ->
        if pk in address_list, do: [{pk, account} | acc], else: acc
      end,
      [],
      :accounts
    )
  end

  defp find_remaining_addresses(address_list, results) do
    address_list
    |> Enum.reject(&List.keyfind(results, &1, 0))
  end

  defp format_cached_data(results) do
    results
    |> Enum.map(fn {_, account} -> format_account(account) end)
  end

  defp cache_hit_response(cached_result) do
    cached_data = format_cached_data(cached_result)

    %{
      "jsonrpc" => "2.0",
      "result" => %{
        "context" => %{
          "apiVersion" => "2.2.0",
          "slot" => 313_629_867
        },
        "value" => cached_data
      },
      "id" => 1
    }
  end

  defp do_remote_request(params, remaining, encoding, cached_results) do
    case do_post_request(@rpc, %{params | "params" => [remaining, encoding]}) do
      %{"result" => %{"value" => remote_accounts} = result} ->
        # Combine cached and remote results

        all_accounts =
          (cached_results ++ Enum.zip(remaining, remote_accounts))
          |> Enum.sort_by(fn {addr, _} ->
            Enum.find_index(params["params"] |> hd(), &(&1 == addr))
          end)
          |> Enum.map(fn {_, account} -> account end)

        # Return formatted response using original result context
        %{
          "id" => params["id"],
          "jsonrpc" => "2.0",
          "result" => %{result | "value" => all_accounts}
        }

      error ->
        error
    end
  end

  defp format_account(account) do
    %{
      "data" => [format_data(account["data"]), "base64"],
      "executable" => false,
      "lamports" => account["lamports"],
      "owner" => account["owner"],
      "rentEpoch" => account["rent_epoch"],
      "space" => account["space"]
    }
  end

  def format_data([data, "base64"]), do: data

  def format_data([data, format]) do
    IO.inspect(format, label: "NOT BASE64")

    data
  end

  def format_data(data), do: data
end
