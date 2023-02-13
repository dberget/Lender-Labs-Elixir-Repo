defmodule SharkAttack.Stats do
  def get_loans() do
    loans = SharkAttack.SharkyApi.get_all_loans()

    Enum.map(loans, &SharkAttack.Loans.create_loan(&1))
  end

  def save_loan(loan) do
    SharkAttack.Loans.create_loan(loan)
  end

  def save_lender_history(pk) do
    data = SharkAttack.SharkyApi.get_history(pk)

    data
    |> Enum.map(&format_historical_loan/1)
    |> Enum.reverse()
    |> Enum.map(&SharkAttack.Loans.create_loan(&1))
  end

  def save_recent_lender_history(pk) do
    data = SharkAttack.SharkyApi.get_recent_history(pk)

    data
    |> Enum.map(&format_historical_loan/1)
    |> Enum.map(&SharkAttack.Loans.create_loan(&1))
  end

  def format_historical_loan(loan) do
    loan
    |> Map.put("loan", loan["pubKey"])
    |> Map.put("orderBook", loan["orderBookPubKey"])
    |> Map.put("nftCollateralMint", loan["collateralMint"])
    |> Map.put("length", loan["durationSeconds"])
    |> Map.put("amountSol", loan["principalLamports"] / 1_000_000_000)
    |> Map.put("earnings", get_earnings(loan))
  end

  defp get_earnings(%{"amountRepaidLamports" => nil}), do: 0

  defp get_earnings(%{
         "amountRepaidLamports" => repaid,
         "principalLamports" => principalLamports,
         "feePaidLamports" => feePaidLamports
       }) do
    (repaid - (principalLamports + feePaidLamports)) / 1_000_000_000
  end

  def get_lender_stats() do
    SharkAttack.Loans.list_loans()
    |> Enum.map(& &1.lender)
    |> Enum.uniq()
    |> Enum.map(fn x -> SharkAttack.Stats.save_lender_history(x) end)
  end
end
