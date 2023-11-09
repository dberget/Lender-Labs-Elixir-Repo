defmodule SharkAttack.Rewards do
  alias SharkAttack.Offers

  @double_collections [215, 18, 371, 367, 276, 19, 73, 678]

  # This is called for all new loan events, so we need to check if its an LL offer.
  def create_entry(%{"is_ll_offer" => false}) do
    nil
  end

  def create_entry(loan) do
    # collection = SharkAttack.Collections.get_collection_from_loan(loan["orderBook"])

    multiplier = 1

    SharkAttack.Points.create(%{
      event_type: "LEND",
      address: loan["lender"],
      amount: calculate_points(loan, multiplier),
      source: loan["pubkey"],
      platform: loan["platform"]
    })
  end

  # Only called from an internal function, so we know its taken from LL site.
  def create_borrow_entry(data) do
    is_ll_offer = SharkAttack.Clients.Helius.has_turtles(data["lender"], 0) > 0

    multiplier = if is_ll_offer, do: 2, else: 1

    multiplier =
      if data["collection_id"] in @double_collections, do: multiplier * 2, else: multiplier

    points = calculate_points(data, multiplier)

    SharkAttack.Points.create(%{
      event_type: "BORROW",
      address: data["borrower"],
      amount: points,
      source: data["address"],
      platform: data["platform"]
    })
  end

  # def is_boosted_offer(offer_address) do
  #   BoostedOffers.get_offer(offer_address)
  # end

  def is_ll_offer(nil) do
    false
  end

  def is_ll_offer(offer_address) do
    case Offers.get_offer(offer_address) do
      nil ->
        false

      _ ->
        true
    end
  end

  def calculate_points(%{"amountSol" => amountSol}, multiplier) do
    points = (amountSol * 10) |> round()

    points * multiplier
  end

  def calculate_points(%{amountSol: amountSol}, multiplier) do
    points = (amountSol * 10) |> round()

    points * multiplier
  end

  def calculate_points(%{"amount" => amountSol}, multiplier) do
    points = (amountSol * 10) |> round()

    points * multiplier
  end

  def calculate_points(%{amount: amountSol}, multiplier) do
    points = (amountSol * 10) |> round()

    points * multiplier
  end
end
