defmodule SharkAttack.Stats do
  def update_loans() do
    loans = SharkAttack.SharkyApi.get_all_loans()

    Enum.map(loans, &SharkAttack.Loans.create_active_loan(&1))
  end

  def update_active_loans() do
    loans = SharkAttack.Loans.get_active_loans()

    loans
    |> Enum.take(5)
    |> Enum.map(fn l ->
      res = SharkAttack.LoansWorker.get_loan(l.loan)

      case res do
        {:ok, []} ->
          SharkAttack.Loans.update_loan(l, %{status: "COMPLETE"})

        {:ok, _} ->
          :active
      end
    end)
  end

  def save_loan(loan) do
    SharkAttack.Loans.create_loan(loan)
  end

  # This makes sure you get all loans if none exist so the order is what they expect.
  def update_history_safe(pk) do
    update_citrus_history_safe(pk)

    case SharkAttack.Loans.get_loans_history!(pk, 1) do
      [] ->
        SharkAttack.Stats.save_lender_history(pk)

      {:error, _} ->
        {:error, []}

      _ ->
        SharkAttack.Stats.save_recent_lender_history(pk)
    end
  end

  def pull_all_citrus_loans() do
    SharkAttack.Collections.list_collections()
    |> Enum.map(& &1.foxy_address)
    |> Enum.reject(&is_nil/1)
    |> Enum.flat_map(&SharkAttack.SharkyApi.get_collection_loans(&1, "citrus"))
    |> Enum.filter(fn loan -> loan["state"] in ["defaulted", "repaid"] end)
    |> Enum.map(&format_historical_citrus_loan/1)
    |> Enum.map(&SharkAttack.Loans.update_or_insert_completed_loan(&1))
  end

  def update_citrus_history_safe(pk) do
    case SharkAttack.SharkyApi.get_lender_loans(pk, "citrus") do
      {:error, _} ->
        []

      loans ->
        loans
        |> Enum.filter(&(&1["state"] == "defaulted" || &1["state"] == "repaid"))
        |> Enum.map(&format_historical_citrus_loan/1)
        |> Enum.map(&SharkAttack.Loans.update_or_insert_completed_loan(&1))
    end
  end

  def save_lender_history(pk) do
    data = SharkAttack.SharkyApi.get_history(pk)

    data
    |> Enum.map(&format_historical_sharky_loan/1)
    |> Enum.reverse()
    |> Enum.map(&SharkAttack.Loans.update_or_insert_completed_loan(&1))
  end

  def save_recent_lender_history(pk) do
    case SharkAttack.SharkyApi.get_recent_history(pk) do
      {:error, _} ->
        {:error, :error}

      data ->
        data
        |> Enum.map(&format_historical_sharky_loan/1)
        |> Enum.map(&SharkAttack.Loans.update_or_insert_completed_loan(&1))
    end
  end

  def format_historical_citrus_loan(loan) do
    foreclosed_date =
      if loan["state"] == "defaulted" do
        Timex.from_unix(loan["rawData"]["endTime"])
      end

    date_repaid =
      if loan["state"] == "repaid" do
        Timex.from_unix(loan["rawData"]["endTime"])
      end

    loan
    |> Map.put("loan", loan["pubkey"])
    |> Map.put("length", loan["length"])
    |> Map.put("status", "COMPLETE")
    |> Map.put("platform", "CITRUS")
    |> Map.put("amountSol", loan["amountSol"])
    |> Map.put("dateOffered", Timex.from_unix(loan["rawData"]["creationTime"]))
    |> Map.put("dateTaken", Timex.from_unix(loan["rawData"]["startTime"]))
    |> Map.put("dateRepaid", date_repaid)
    |> Map.put("dateForeclosed", foreclosed_date)
    |> Map.put("earnings", loan["earnings"])
  end

  def format_historical_sharky_loan(loan) do
    loan
    |> Map.put("loan", loan["pubKey"])
    |> Map.put("orderBook", loan["orderBookPubKey"])
    |> Map.put("nftCollateralMint", loan["collateralMint"])
    |> Map.put("length", loan["durationSeconds"])
    |> Map.put("status", "COMPLETE")
    |> Map.put("platform", "SHARKY")
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
