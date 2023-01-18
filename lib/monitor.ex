defmodule SharkAttack.Monitor do
  #   # [
  #   %{
  #     "amountSol" => "6.00",
  #     "loan" => "ERtUTskodn2pqSPL5YhrDZ4KVeXrVToXukLW7uBo9uAu",
  #     "offerTime" => 1673018038000,
  #     "orderBook" => "4D8buxB4wBquP8Y18gY32jkPmjSpcC1MtQruEFGkdScA"
  #   }
  # ]
  def get_user_offer_data(
        loanPlan \\ %{
          loan_style: "best",
          wallet_address: "BYyyoDn3LB6dNcc7MZmiyqoPmptccVjdW6jHD5j7M91W",
          target_collection: "AiYV1ZfNTNdcfyCsxQVGJUqdhHvfiMkkW1Dtif1RHf3o"
        }
      ) do
    open_offers = SharkAttack.SharkyApi.get_user_open_offers(loanPlan.wallet_address)

    all_collection_data = SharkAttack.build_collection_data()
    activeOffers = get_in(open_offers, ["offerData", "activeOffers"])

    Enum.map(activeOffers, fn x -> check_offer(x, all_collection_data, loanPlan) end)
  end

  def check_offer(
        %{
          "amountSol" => amount,
          "orderBook" => orderBookPubKey
        } = offer,
        collections,
        loanPlan
      ) do
    orderBook = Enum.find(collections, fn x -> x["pubkey"] == orderBookPubKey end)

    current_best_offer = Map.get(orderBook, "bestLoan", 0)
    current_offer = amount |> String.to_float()

    have_best_offer = current_offer == current_best_offer

    under_target_ltf = current_offer < orderBook["target_loan_amount"]

    target_ltf_amount_difference =
      ((orderBook["target_loan_amount"] - current_offer) / orderBook["target_loan_amount"])
      |> abs()

    # todo - max_target_loan_amount
    over_max_ltf = current_offer > orderBook["target_loan_amount"]

    adjust_offer(
      offer,
      {have_best_offer, under_target_ltf, target_ltf_amount_difference, over_max_ltf},
      loanPlan
    )
  end

  def adjust_offer(
        _offer,
        {true, true, target_ltf_amount_difference, _over_max_ltf},
        _loanPlan
      )
      when target_ltf_amount_difference < 0.15 do
    # Loan is fine
    :ok
  end

  def adjust_offer(
        offer,
        {true, true, target_ltf_amount_difference, _over_max_ltf},
        loanPlan
      )
      when target_ltf_amount_difference > 0.15 do
    # Loan should be updated
    IO.inspect(offer)

    SharkAttack.SharkyApi.revoke_offer(loanPlan.wallet_address, offer["loan"])

    SharkAttack.Loaner.calculate_loan(%{
      loan_style: loanPlan.loan_style,
      wallet_address: loanPlan.wallet_address,
      target_collection: offer["orderBook"]
    })
  end

  def adjust_offer(
        offer,
        {_have_best_offer, _under_target_ltf, target_ltf_amount_difference, _over_max_ltf},
        loanPlan
      )
      when target_ltf_amount_difference > 0.15 do
    SharkAttack.SharkyApi.revoke_offer(loanPlan.wallet_address, offer["loan"]) |> IO.inspect()

    SharkAttack.Loaner.calculate_loan(%{
      loan_style: loanPlan.loan_style,
      wallet_address: loanPlan.wallet_address,
      target_collection: offer["orderBook"]
    })
  end

  def adjust_offer(
        _offer,
        {have_best_offer, under_target_ltf, target_ltf_amount_difference, over_max_ltf},
        _loanPlan
      ) do
    # Not sure what to do.

    {:add_new_clause, have_best_offer, under_target_ltf, target_ltf_amount_difference,
     over_max_ltf}
  end
end
