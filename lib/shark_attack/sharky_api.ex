defmodule SharkAttack.SharkyApi do
  def get_order_books() do
    res = SharkAttack.Helpers.do_get_request("http://localhost:5000/order_book/list")

    Map.get(res, "orderBooks", []) |> Enum.filter(fn x -> x["name"] !== nil end)
  end

  def get_raw_order_books() do
    res = SharkAttack.Helpers.do_get_request("http://localhost:5000/order_book/rawlist")

    Map.get(res, "orderBooks", []) |> Enum.filter(fn x -> x["name"] !== nil end)
  end

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
      "http://localhost:5000/offers/loan/#{address}/#{pubkey}/#{loan_amount}"
    )
  end

  def revoke_offer(wallet_address, loan_pubkey) do
    SharkAttack.Helpers.do_post_request("http://localhost:5000/offers/revoke", %{
      wallet: wallet_address,
      loanPubKey: loan_pubkey
    })
  end
end
