defmodule SharkAttack.Tokens do
  require Logger
  import SharkAttack.AccountCache

  def get_token_data(pubkey) do
    %{
      balance: get_account_balance(pubkey),
      mint: get_account_mint(pubkey),
      decimals: get_mint_decimals(get_account_mint(pubkey))
    }
  end

  def get_account_balance(pubkey) do
    case SharkAttack.Solana.get_account_info(pubkey) do
      {:ok, %{"data" => [data, "base64"]}} ->
        data
        |> Base.decode64!()
        |> binary_part(64, 8)
        |> :binary.decode_unsigned(:little)

      {:error, _} ->
        nil
    end
  end

  def get_account_mint(pubkey) do
    SharkAttack.SimpleCache.get(
      SharkAttack.Tokens,
      :get_account_mint_impl,
      [pubkey],
      ttl: 86400  # Cache for 24 hours since decimals don't change
    )
  end

  def get_account_mint_impl(pubkey) do
    case SharkAttack.Solana.get_account_info(pubkey) do
      {:ok, %{"data" => [data, "base64"]}} ->
        data
        |> Base.decode64!()
        |> binary_part(0, 32)
        |> B58.encode58()

      {:error, _} ->
        nil
    end
  end

  def get_mint_decimals(mint_address) do
    SharkAttack.SimpleCache.get(
      SharkAttack.Tokens,
      :get_mint_decimals_impl,
      [mint_address],
      ttl: 86400  # Cache for 24 hours since decimals don't change
    )
  end

  def get_mint_decimals_impl(mint_address) do
    case SharkAttack.Solana.get_account_info(mint_address) do
      {:ok, %{"data" => [data, "base64"]}} ->
        data
        |> Base.decode64!()
        |> binary_part(44, 1)
        |> :binary.decode_unsigned(:little)

      {:error, _} ->
        nil
    end
  end

  def get_token_price(token_address) do
    try do
      case SharkAttack.Birdeye.get_token_overview(token_address) do
        {:ok, overview} ->
          get_in(overview, [:market_metrics, :current_price])

        {:error, reason} ->
          {:error, "Failed to fetch token prices: #{reason}"}

        _ ->
          {:error, "Invalid response from price API"}
      end
    rescue
      e ->
        Logger.error("Error fetching token prices: #{inspect(e)}")
        {:error, "Failed to fetch token prices"}
    end
  end
end
