defmodule SharkAttack.Workers.LoanHandler do
  require Logger

  def update_loan(%{"type" => "REPAY_LOAN"} = event) do
    loanAddress = get_loan_address(event)

    loan = SharkAttack.Loans.get_loan(loanAddress)

    SharkAttack.Events.send_event("REPAY_LOAN", loan)

    SharkAttack.LoansWorker.delete_loan(loanAddress)
  end

  def update_loan(%{"type" => "CANCEL_OFFER"} = event) do
    event
    |> get_loan_address()
    |> SharkAttack.LoansWorker.delete_loan()
  end

  def update_loan(%{"type" => "RESCIND_LOAN"} = event) do
    event
    |> get_loan_address()
    |> SharkAttack.LoansWorker.delete_loan()
  end

  def update_loan(%{"type" => "FORECLOSE_LOAN"} = event) do
    loanAddress =
      event
      |> Map.get("instructions")
      |> List.last()
      |> Map.get("accounts", [])
      |> List.first()

    loan = SharkAttack.Loans.get_loan(loanAddress)

    SharkAttack.Events.send_event("FORECLOSE_LOAN", loan)

    SharkAttack.LoansWorker.delete_loan(loanAddress)

    lender = Map.get(loan, :lender, Map.get(loan, "lender"))

    Task.async(fn ->
      SharkAttack.Stats.update_history_safe(lender)
    end)

    :ok
  end

  def update_loan(%{"type" => "UNKNOWN", "source" => "SHARKY_FI"} = event) do
    closed_loan =
      event
      |> Map.get("instructions")
      |> Enum.at(1)
      |> Map.get("accounts", [])
      |> List.first()

    case closed_loan do
      nil ->
        Logger.info("Unknown loan")

      _ ->
        loan = SharkAttack.Loans.get_loan(closed_loan)

        SharkAttack.Events.send_event("REPAY_LOAN", loan)

        SharkAttack.LoansWorker.delete_loan(closed_loan)

        address =
          event
          |> Map.get("instructions")
          |> Enum.at(1)
          |> Map.get("accounts", [])
          |> Enum.at(1)

        SharkAttack.LoansWorker.add_loan(%{loanAddress: address, source: event["source"]})
    end
  end

  def update_loan(%{"type" => "BORROW_SOL_FOR_NFT"} = event) do
    address =
      event
      |> Map.get("instructions")
      |> Enum.at(1)
      |> Map.get("accounts")
      |> List.first()

    SharkAttack.LoansWorker.add_loan(%{loanAddress: address, source: event["source"]})
  end

  def update_loan(%{"type" => "TAKE_LOAN"} = event) do
    address =
      event
      |> Map.get("instructions")
      |> Enum.filter(&(&1["programId"] == "SHARKobtfF1bHhxD2eqftjHBdVSCbKo9JtgK71FhELP"))
      |> List.first()
      |> Map.get("accounts")
      |> Enum.at(4)

    SharkAttack.LoansWorker.add_loan(%{loanAddress: address, source: event["source"]})
  end

  def update_loan(%{"type" => "OFFER_LOAN", "source" => "SHARKY_FI"} = event) do
    event
    |> Map.get("nativeTransfers")
    |> Enum.chunk_every(4)
    |> Enum.each(fn offer ->
      %{"toUserAccount" => loanAddress} = hd(offer)

      SharkAttack.LoansWorker.add_offer(%{loanAddress: loanAddress, source: event["source"]})
    end)
  end

  def update_loan(%{"type" => "OFFER_LOAN", "source" => "CITRUS"} = event) do
    event
    |> Map.get("nativeTransfers")
    |> Enum.chunk_every(2)
    |> Enum.each(fn offer ->
      %{"toUserAccount" => loanAddress} = Enum.at(offer, 0)

      SharkAttack.LoansWorker.add_offer(%{loanAddress: loanAddress, source: event["source"]})
    end)
  end

  def update_loan(%{"type" => "UNKNOWN"} = event) do
    Logger.info("Unhandled Event - source: #{event["source"]}")
  end

  def update_loan(event) do
    Logger.info("Unhandled Event - source: #{event["source"]}, type: #{event["type"]}")
  end

  def get_loan_address(%{"source" => "SHARKY_FI", "type" => "REPAY_LOAN"} = event) do
    event
    |> Map.get("instructions")
    |> Enum.at(1)
    |> Map.get("accounts", [])
    |> List.first()
  end

  def get_loan_address(%{"source" => "CITRUS", "type" => "REPAY_LOAN"} = event) do
    event
    |> Map.get("instructions")
    |> List.last()
    |> Map.get("accounts", [])
    |> List.first()
  end

  def get_loan_address(%{"source" => "SHARKY_FI", "type" => "RESCIND_LOAN"} = event) do
    event |> Map.get("instructions") |> List.first() |> Map.get("accounts", []) |> List.first()
  end

  def get_loan_address(%{"source" => "CITRUS", "type" => "CANCEL_OFFER"} = event) do
    event
    |> Map.get("instructions")
    |> List.first()
    |> Map.get("accounts", [])
    |> List.first()
  end
end
