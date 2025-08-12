defmodule SharkAttack.Stake do
  # Function header with default values
  def get_total_stake_held(address, validator \\ nil, mint \\ nil)

  # Main implementation
  def get_total_stake_held(address, validator, mint) do
    # Normalize parameters - use defaults for nil or empty strings
    normalized_validator = normalize_validator(validator)
    normalized_mint = normalize_mint(mint)

    liquid_stake = get_liquid_stake_held(address, normalized_mint)
    stake_accounts = get_stake_account_total(address, normalized_validator)
    total_stake = liquid_stake + stake_accounts

    %{
      total_stake: total_stake,
      liquid_stake: liquid_stake,
      stake_accounts: stake_accounts,
      ui_amount: total_stake / 10 ** 9
    }
  end

  # Helper functions to normalize parameters
  defp normalize_validator(nil), do: ""
  defp normalize_validator(""), do: ""
  defp normalize_validator(validator), do: validator

  defp normalize_mint(nil), do: ""
  defp normalize_mint(""), do: ""
  defp normalize_mint(mint), do: mint

  def get_stake_account_total(address, validator) do
    SharkAttack.Solana.get_program_accounts(
      "Stake11111111111111111111111111111111111111",
      %{
        "commitment" => "confirmed",
        "encoding" => "jsonParsed",
        "filters" => [%{memcmp: %{offset: 44, bytes: address}}]
      }
    )
    |> parse_stake_accounts(validator)
  end

  def get_liquid_stake_held(address, token_mint) do
    user_tokens = SharkAttack.Solana.get_user_token_mints(address)
    filtered_tokens = Enum.filter(user_tokens, fn mint -> mint["mint"] == token_mint end)

    case filtered_tokens do
      [%{"tokenAmount" => %{"amount" => amount}}] ->
        String.to_integer(amount)

      [] ->
        0

      _ ->
        # Handle unexpected multiple results by summing them
        filtered_tokens
        |> Enum.map(fn %{"tokenAmount" => %{"amount" => amount}} -> String.to_integer(amount) end)
        |> Enum.sum()
    end
  end

  def parse_stake_accounts(accounts, validator) do
    Enum.filter(accounts, fn account ->
      account["account"]["data"]["parsed"]["info"]["stake"]["delegation"]["voter"] ==
        validator
    end)
    |> Enum.map(fn account ->
      account["account"]["data"]["parsed"]["info"]["stake"]["delegation"]["stake"]
      |> String.to_integer()
    end)
    |> Enum.sum()
  end

  def get_sol_price() do
    SharkAttack.Helpers.do_get_request(
      "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
    )
    |> Map.get("solana", %{})
    |> Map.get("usd", 0)
  end
end
