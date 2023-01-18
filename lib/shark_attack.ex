defmodule SharkAttack do
  # %{
  #   payer: "payer-pubkey",
  #   ltf_target: 0.75,
  #   orderbook: "orderBook-pubkey",
  #   floor_price: 1,
  #   target_loan_amount: 0
  # }

  def getWallet(),
    do: Solana.Key.pair_from_file("/Users/davidberget/.config/solana/albatross.json")

  def build_collection_data() do
    orderbooks = SharkAttack.SharkyApi.get_order_books()
    floors = SharkAttack.SharkyApi.get_floor_prices()

    modify_data(orderbooks, floors)
  end

  defp modify_data(order_books, floor_prices) do
    Enum.map(order_books, fn order_book ->
      floor_price =
        floor_prices
        |> Map.get(order_book["name"], %{})
        |> Map.get("floorPriceSol", 0)
        |> format_floor_price()

      best_loan_ltf = calculate_current_ltf(Map.get(order_book, "bestLoan", 0), floor_price)

      target_loan_amount = calculate_loan_amount(floor_price, 0.8)

      order_book
      |> Map.put("floor_price", floor_price)
      |> Map.put(
        "current_ltf",
        best_loan_ltf
      )
      |> Map.put("target_loan_amount", target_loan_amount)
    end)
  end

  defp format_floor_price(price) when is_float(price) do
    price |> Float.round(2)
  end

  defp format_floor_price(price) do
    price
  end

  defp calculate_loan_amount(floor_price, ltf_target) do
    (floor_price * ltf_target) |> Float.round(2)
  end

  defp calculate_current_ltf(_loan_amount, 0) do
    0
  end

  defp calculate_current_ltf(nil, _floor_price) do
    0
  end

  defp calculate_current_ltf(loan_amount, floor_price) do
    (loan_amount / floor_price * 100) |> Number.Percentage.number_to_percentage(precision: 0)
  end

  def get_solana_balance() do
    res =
      SharkAttack.Helpers.do_get_request(
        "https://public-api.solscan.io/account/BYyyoDn3LB6dNcc7MZmiyqoPmptccVjdW6jHD5j7M91W"
      )

    Map.get(res, "lamports", 0) / 1_000_000_000
  end
end
