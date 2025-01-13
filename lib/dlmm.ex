defmodule SharkAttack.DLMMPools do
  alias SharkAttack.Repo
  alias SharkAttack.Defi.DLMM
  import SharkAttack.Helpers

  @rpc_url "https://stylish-misty-replica.solana-mainnet.quiknode.pro/b8961d53b160fcc4e0557911b4ed5e6e3ebf9ac8"
  # @rpc_url "https://mainnet.helius-rpc.com/?api-key=87f15176-5b11-42e2-92a3-4332752769a4"

  def update_pools_api() do
    IO.puts("Updating DLMM pools")
    res = do_get_request("https://app.meteora.ag/clmm-api/pair/all_by_groups")
    pools = list_pools() |> Enum.map(&Map.get(&1, :address))

    res["groups"]
    |> Enum.each(fn group ->
      group["pairs"]
      |> Enum.each(fn pair ->
        unless Enum.any?(pools, &(&1 == pair["address"])) do
          create_pool(pair)
        end
      end)
    end)
  end

  def list_pools() do
    Repo.all(DLMM)
  end

  def get_accounts() do
    # way too many accounts when doing all the gpas
    # gpas =
    #   SharkAttack.Solana.get_program_accounts("LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo")
    #   |> Enum.map(&Map.get(&1, "pubkey"))

    accounts = ["LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo"]

    list_pools()
    |> Enum.map(&(Map.take(&1, [:address, :reserve_x, :reserve_y]) |> Map.values()))
    |> tap(fn x ->
      length(x) |> IO.inspect(label: "length")
    end)
    |> List.flatten()
    |> Enum.dedup()
    |> Enum.concat(accounts)
  end

  def create_pool(attrs) do
    case Repo.get_by(DLMM, address: attrs["address"]) do
      nil ->
        # Pool doesn't exist, create it
        %DLMM{}
        |> DLMM.changeset(attrs)
        |> Repo.insert()

      existing_pool ->
        # Pool exists, check if we need to update

        {:ok, existing_pool}
    end
  end

  def get_pool_state(pool_address) do
    client =
      Solana.RPC.client(network: @rpc_url)

    case SharkAttack.Solana.get_account_info(pool_address, client) do
      {:ok, response} ->
        # Parse the response
        account_data =
          response
          |> get_in(["data"])
          |> hd()

        # Deserialize the account data
        get_active_bin_id(account_data)

      {:error, error} ->
        {:error, "Failed to fetch account info: #{inspect(error)}"}
    end
  end

  def get_active_bin_id(raw_data) when is_binary(raw_data) do
    try do
      decoded_data = Base.decode64!(raw_data)

      # Parse with the correct offset for active_id
      <<
        _prefix::binary-size(76),
        active_id::little-signed-32,
        _rest::binary
      >> = decoded_data

      %{
        active_id: active_id
      }
    rescue
      e ->
        IO.inspect(e, label: "Error parsing binary")
        {:error, "Failed to decode LbPair data"}
    end
  end
end
