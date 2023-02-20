defmodule SharkAttack.SharkyApi do
  def get_order_books() do
    res = SharkAttack.Helpers.do_get_request("http://localhost:5000/order_book/list")

    Map.get(res, "orderBooks", []) |> Enum.filter(fn x -> x["name"] !== nil end)
  end

  def get_raw_order_books() do
    res = SharkAttack.Helpers.do_get_request("http://localhost:5000/order_book/rawlist")

    Map.get(res, "orderBooks", []) |> Enum.filter(fn x -> x["name"] !== nil end)
  end

  def get_all_loans() do
    res = SharkAttack.Helpers.do_get_request("http://localhost:5000/loans/all")

    Map.get(res, "loanData", [])
  end

  @spec get_floor_prices :: any
  def get_floor_prices() do
    res = SharkAttack.Helpers.do_get_request("https://sharky.fi/api/floor-prices")

    Map.get(res, "floorPrices", %{})
  end

  def get_orderbook_offers(pubKey) do
    SharkAttack.Helpers.do_get_request("http://localhost:5000/offers/ob/#{pubKey}")
  end

  def get_user_open_offers(address) do
    SharkAttack.Helpers.do_get_request("http://localhost:5000/offers/#{address}")
  end

  def get_user_open_offers_for_order_book(user_address, order_book_address) do
    user_address
    |> get_user_open_offers()
    |> get_in(["offerData", "activeOffers"])
    |> Enum.filter(&(&1["orderBook"] == order_book_address))
  end

  def submit_offer(_address, %{
        loan_amount: loan_amount,
        available_balance: available_balance
      })
      when loan_amount > available_balance do
    {:error, :insufficient_balance}
  end

  def submit_offer(address, %{
        loan_amount: loan_amount,
        pubkey: pubkey
      }) do
    SharkAttack.Helpers.do_get_request(
      "http://localhost:5000/offers/ix/#{address}/#{pubkey}/#{loan_amount}"
    )
  end

  def revoke_offer(wallet_address, loan_pubkey) do
    SharkAttack.Helpers.do_post_request("http://localhost:5000/offers/revoke", %{
      wallet: wallet_address,
      loanPubKey: loan_pubkey
    })
  end

  def get_recent_history(lender) do
    res =
      SharkAttack.Helpers.do_get_request(
        "https://sharky.fi/api/loan/my-loans?lender=#{lender}&network=mainnet&deployEnvironment=production"
      )

    Map.get(res, "historyLoans", [])
  end

  def get_history(lender, offset \\ 0, all_items \\ []) do
    limit = 50

    case SharkAttack.Helpers.do_get_request(
           "https://sharky.fi/api/loan/my-loans?lender=#{lender}&network=mainnet&deployEnvironment=production&offset=#{offset}"
         ) do
      data ->
        all_items = all_items ++ data["historyLoans"]

        if data["historyLoans"] |> length >= limit do
          get_history(lender, offset + limit, all_items)
        else
          all_items
        end
    end
  end
end
