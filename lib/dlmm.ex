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

    # metera program acct
    accounts = ["LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo"]

    list_pools()
    |> Enum.map(&(Map.take(&1, [:address]) |> Map.values()))
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

  def get_account_info(account_address) do
    case SharkAttack.AccountCache.get_account(account_address) do
      [] ->
        client =
          Solana.RPC.client(network: @rpc_url)

        {:ok, account_data} = SharkAttack.Solana.get_account_info(account_address, client)
        account_data

      [account_data] ->
        account_data
    end
  end

  def get_pool_state(pool_address) do
    case get_account_info(pool_address) do
      %{"data" => [data | _]} ->
        get_active_bin_id(data)

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

  def get_position_state(position_address) do
    client =
      Solana.RPC.client(network: @rpc_url)

    case SharkAttack.Solana.get_account_info(position_address, client) do
      {:ok, response} ->
        parse_position_state(response)

      {:error, error} ->
        {:error, "Failed to fetch account info: #{inspect(error)}"}
    end
  end

  def parse_position_state(response) do
    try do
      decoded_data =
        response
        |> get_in(["data"])
        |> hd()
        |> Base.decode64!()

      <<
        _discriminator::binary-size(8),
        lb_pair::binary-size(32),
        owner::binary-size(32),
        # Skip to binId location
        _other_data::binary-size(7840),
        # At offset 7912
        lower_bin_id::little-signed-32,
        # At offset 7916
        upper_bin_id::little-signed-32,
        _rest::binary
      >> = decoded_data

      %{
        lb_pair: B58.encode58(lb_pair),
        owner: B58.encode58(owner),
        lower_bin_id: lower_bin_id,
        upper_bin_id: upper_bin_id,
        total_size: byte_size(decoded_data)
      }
    rescue
      e ->
        {:error,
         "Failed to decode position data: #{inspect(e)}\nStacktrace: #{Exception.format_stacktrace(__STACKTRACE__)}"}
    end
  end

  def get_active_bin_id(account_data) when is_map(account_data) do
    account_data["data"]
    |> hd()
    |> get_active_bin_id()
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
      _e ->
        # IO.inspect(e, label: "Error parsing binary")
        {:error, "Failed to decode LbPair data"}
    end
  end

  def get_dlmm_position_data(dlmm, position) do
    SharkAttack.Helpers.do_get_request(
      "http://localhost:5001/dlmm/#{dlmm}/#{position.position_address}"
    )
  end
end
