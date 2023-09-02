defmodule SharkAttack.Rewards do
  alias SharkAttack.Offers

  # This is called for all new loan events, so we need to check if its an LL offer.
  def create_entry(%{"is_ll_offer" => false}) do
    nil
  end

  def create_entry(loan) do
    SharkAttack.Points.create(%{
      event_type: "LEND",
      address: loan["lender"],
      amount: calculate_points(loan),
      source: loan["pubkey"]
    })
  end

  # Only called from an internal function, so we know its taken from LL site.
  def create_borrow_entry(loan) do
    SharkAttack.Points.create(%{
      event_type: "BORROW",
      address: loan["borrower"],
      amount: calculate_points(loan),
      source: loan["address"]
    })
  end

  def is_boosted_offer(offer_address) do
    BoostedOffers.get_offer(offer_address)
  end

  def is_ll_offer(offer_address) do
    case Offers.get_offer(offer_address) do
      nil ->
        false

      _ ->
        true
    end
  end

  def calculate_points(%{"amountSol" => amountSol}) do
    (amountSol / 10) |> Float.round(2)
  end

  def calculate_points(%{amountSol: amountSol}) do
    (amountSol / 10) |> Float.round(2)
  end

  def calculate_points(%{"amount" => amountSol}) do
    (amountSol / 10) |> Float.round(2)
  end

  def calculate_points(%{amount: amountSol}) do
    (amountSol / 10) |> Float.round(2)
  end
end
