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
      "id" => "cache-hit",
      "jsonrpc" => "2.0",
      "result" => %{
        "context" => %{
          "apiVersion" => "1.17.31",
          "slot" => 263_519_770
        },
        "value" => cached_data
      }
    }
  end

  defp do_remote_request(params, remaining, encoding, cached_results) do
    # Extracting the original address_list for later reordering of results
    [original_address_list, _] = params["params"]

    # Update params with the remaining addresses to be requested
    updated_params = Map.put(params, "params", [remaining, encoding])

    # Performing the remote request
    res = do_post_request(@rpc, updated_params)

    combined_remaining = Enum.zip(remaining, res["result"]["value"])

    merged_data = merge_results(combined_remaining, cached_results, original_address_list)

    %{
      "id" => res["id"],
      "jsonrpc" => "2.0",
      "result" => %{
        "context" => %{
          "apiVersion" => "1.17.31",
          "slot" => res["result"]["context"]["slot"]
        },
        "value" => merged_data
      }
    }
  end

  defp merge_results(remote_data, cached_data, address_list) do
    # Combine data with addresses as keys
    combined_data = Map.new(remote_data ++ cached_data)

    # Order combined data according to the original address_list
    address_list
    |> Enum.map(fn pk -> format_account(combined_data[pk]) end)
  end

  defp format_account(%Geyser.SubscribeUpdateAccountInfo{} = account) do
    # Logger.warn("Formatting cached account")

    %{
      "data" => [account.data |> Base.encode64(), "base64"],
      "executable" => account.executable,
      "lamports" => account.lamports,
      "owner" => account.owner |> B58.encode58(),
      "rentEpoch" => account.rent_epoch,
      "space" => ""
    }
  end

  defp format_account(account) do
    account
  end
end
