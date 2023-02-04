defmodule SharkAttack.Monitor do
  alias SharkAttack.Loans
  alias SharkAttack.Loans.LoanPlan

  #   # [
  #   %{
  #     "amountSol" => "6.00",
  #     "loan" => "ERtUTskodn2pqSPL5YhrDZ4KVeXrVToXukLW7uBo9uAu",
  #     "offerTime" => 1673018038000,
  #     "orderBook" => "4D8buxB4wBquP8Y18gY32jkPmjSpcC1MtQruEFGkdScA"
  #   }
  # ]
  # loanPlan \\ %{
  #   loan_style: "best",
  #   wallet_address: "BS61tv1KbsPhns3ppU8pmWozfReZjhxFL2MPhBdDWNEm",
  #   target_collection: "AiYV1ZfNTNdcfyCsxQVGJUqdhHvfiMkkW1Dtif1RHf3o",
  #   target_ltf: 0.50
  # }
  def monitor_offers(user_id) do
    collection_data = SharkAttack.build_collection_data()

    user_id
    |> Loans.get_user_loan_plans()
    |> Enum.map(&monitor_loan_plans(&1, collection_data))
  end

  def monitor_loan_plans(%LoanPlan{plan_settings: plan_settings} = loan_plan, collection_data) do
    orderBook =
      collection_data |> Enum.find(fn x -> x["pubkey"] == plan_settings.collection_address end)

    open_offers =
      SharkAttack.SharkyApi.get_user_open_offers_for_order_book(
        loan_plan.user_address,
        orderBook["pubkey"]
      )

    # activeOffers = get_in(open_offers, ["offerData", "activeOffers"])
    # Enum.map(activeOffers, fn x -> check_offer(x, orderBook, loan_plan) end)
    process_open_offers(open_offers, orderBook, loan_plan)
  end

  def process_open_offers([], _orderBook, _loanPlan) do
    nil
  end

  def process_open_offers(offers, orderBook, loanPlan) do
    Enum.map(offers, fn x -> check_offer(x, orderBook, loanPlan) end)
  end

  def check_offer(
        %{
          "amountSol" => amount
        } = offer,
        orderBook,
        %LoanPlan{plan_settings: plan_settings} = loanPlan
      ) do
    current_best_offer = Map.get(orderBook, "bestLoan", 0)
    current_offer = amount |> String.to_float()

    have_best_offer = current_offer == current_best_offer

    target_loan_amount =
      SharkAttack.calculate_target_loan_amount(orderBook["floor_price"], plan_settings.target_ltf)

    under_target_ltf = current_offer < target_loan_amount

    target_ltf_amount_difference =
      ((target_loan_amount - current_offer) / target_loan_amount)
      |> abs()

    # todo - max_target_loan_amount
    over_max_ltf = current_offer > target_loan_amount

    notify(
      offer,
      {have_best_offer, under_target_ltf, target_ltf_amount_difference, over_max_ltf,
       target_loan_amount},
      loanPlan,
      orderBook["name"]
    )

    # adjust_offer(
    #   offer,
    #   {have_best_offer, under_target_ltf, target_ltf_amount_difference, over_max_ltf},
    #   loanPlan
    # )
  end

  def adjust_offer(
        _offer,
        {true, true, target_ltf_amount_difference, _over_max_ltf, _target_loan_amount},
        _loanPlan
      )
      when target_ltf_amount_difference < 0.15 do
    # Loan is fine
    :ok
  end

  def adjust_offer(
        offer,
        {true, true, target_ltf_amount_difference, _over_max_ltf, target_loan_amount},
        %LoanPlan{plan_settings: plan_settings} = loanPlan
      )
      when target_ltf_amount_difference > 0.15 do
    # Loan should be updated
    # SharkAttack.SharkyApi.revoke_offer(loanPlan.wallet_address, offer["loan"])

    # SharkAttack.Loaner.calculate_loan(%{
    #   loan_style: plan_settings.loan_style,
    #   wallet_address: plan_settings.wallet_address,
    #   target_collection: offer["orderBook"]
    # })
  end

  def adjust_offer(
        offer,
        {_have_best_offer, _under_target_ltf, target_ltf_amount_difference, _over_max_ltf,
         target_loan_amount},
        %LoanPlan{plan_settings: plan_settings} = loanPlan
      )
      when target_ltf_amount_difference > 0.15 do
    SharkAttack.SharkyApi.revoke_offer(plan_settings.wallet_address, offer["loan"])

    # SharkAttack.Loaner.calculate_loan(%{
    #   loan_style: plan_settings.loan_style,
    #   wallet_address: loanPlan.wallet_address,
    #   target_collection: offer["orderBook"]
    # })
  end

  def adjust_offer(
        _offer,
        {have_best_offer, under_target_ltf, target_ltf_amount_difference, over_max_ltf,
         target_loan_amount},
        _loanPlan
      ) do
    # Not sure what to do.

    {:add_new_clause, have_best_offer, under_target_ltf, target_ltf_amount_difference,
     over_max_ltf}
  end

  def notify(
        _offer,
        {true, true, target_ltf_amount_difference, _over_max_ltf, _target_loan_amount},
        _loanPlan,
        _name
      )
      when target_ltf_amount_difference < 0.15 do
    # Loan is fine
    :ok
  end

  def notify(
        offer,
        {true, true, target_ltf_amount_difference, _over_max_ltf, target_loan_amount},
        %LoanPlan{plan_settings: plan_settings} = loanPlan,
        name
      )
      when target_ltf_amount_difference > 0.15 do
    # Loan should be updated
    # SharkAttack.SharkyApi.revoke_offer(loanPlan.wallet_address, offer["loan"])

    # new_offer =
    #   SharkAttack.Loaner.calculate_loan(%{
    #     loan_style: plan_settings.loan_style,
    #     wallet_address: loanPlan.wallet_address,
    #     target_ltf: plan_settings.target_ltf,
    #     target_collection: offer["orderBook"]
    #   })

    SharkAttack.DiscordConsumer.send_message(1_066_125_250_980_499_466, %{
      loan: offer["loan"],
      orderbook: name,
      current: offer["amountSol"],
      new: target_loan_amount
    })
  end

  def notify(
        offer,
        {_have_best_offer, _under_target_ltf, target_ltf_amount_difference, _over_max_ltf,
         target_loan_amount},
        _loanPlan,
        name
      )
      when target_ltf_amount_difference > 0.15 do
    SharkAttack.DiscordConsumer.send_message(1_066_125_250_980_499_466, %{
      loan: offer["loan"],
      orderbook: name,
      current: offer["amountSol"],
      new: target_loan_amount
    })
  end

  def notify(
        _offer,
        {have_best_offer, under_target_ltf, target_ltf_amount_difference, over_max_ltf},
        _loanPlan
      ) do
    # Not sure what to do.

    {:add_new_clause, have_best_offer, under_target_ltf, target_ltf_amount_difference,
     over_max_ltf}
  end
end
