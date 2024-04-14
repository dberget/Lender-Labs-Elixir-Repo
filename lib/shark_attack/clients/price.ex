defmodule SharkAttack.PriceCalculator do
  require Logger

  @tensor_pool_owner "4zdNGgAtFsW1cQgHqkiWyRsxaAgxrSRRynnuunxzjxue"

  @taker_fee_bps %{
    "TENSORSWAP" =>  "TensorSwap",
    "MAGICEDEN_V2" => "MagicEden"
  }

  def compute_mint_buy_price(:error, mint) do
    {:error, "Error fetching mint #{mint} from Tensor"}
  end

  def compute_mint_buy_price(response, mint) do
    get_mint_info(response, mint)
    |> compute_buy_price(response)
  end

  defp get_mint_info(%{"data" => %{"mint" => info}}, _mint) when is_map(info), do: info
  defp get_mint_info(_, mint), do: {:error, "Mint #{mint} not found on Tensor"}

  defp compute_buy_price({:error, _} = error, _response), do: error
  defp compute_buy_price(info, response) do
    case info do
      %{"activeListings" => [], "owner" => @tensor_pool_owner} ->
        {:error, "NFT listed on a Pool belonging to Tensor"}

      %{"activeListings" => []} ->
        {:error, "NFT not listed"}

      %{"activeListings" => [first_listing | _]} ->
        calculate_listed_price(first_listing, response, info)
    end
  end

  defp calculate_listed_price(%{"tx" => %{"source" => source, "grossAmount" => gross_amount}}, response, %{"sellRoyaltyFeeBPS" => royalty_bps}) do

    #@taker_fee_bps[tx["source"]]
    case find_fee_details(response["data"]["mpFees"], @taker_fee_bps[source]) do
      nil -> {:error, "NFT listed on Tensor or ME but not recognized"}
      %{"takerFeeBps" => fee_bps} ->
        total_fees = (fee_bps + royalty_bps) / 10_000
        gross_amount = gross_amount |> String.to_integer()
        {:ok, floor(gross_amount * (1 + total_fees))}
    end
  end

  defp find_fee_details(fee_details, source) do
    Enum.find(fee_details, fn %{"mp" => mp} -> mp == source end)
  end

  def calculate_next_spot_price(
         order_type,
         spot_price,
         delta,
         bonding_curve_type,
         counter
       ) do
    Logger.debug(
      "Calculating next spot price for #{spot_price} #{delta} #{bonding_curve_type} #{counter}"
    )

    spot_price = spot_price |> String.to_integer()
    delta = delta |> String.to_integer()
    calc_for_bonding_curve_type(bonding_curve_type, order_type, spot_price, delta, counter)
  end

  defp calc_for_bonding_curve_type("LINEAR", order_type, spot_price, delta, counter) do
    target_counter = if order_type == "Buy", do: counter + 1, else: counter - 1

    delta = if target_counter >= 0, do: delta, else: -delta

    Enum.reduce(1..abs(target_counter), spot_price, fn _, acc -> acc + delta end)
  end

  defp calc_for_bonding_curve_type("EXPONENTIAL", order_type, spot_price, delta, counter) do
    new_counter = if order_type == "Buy", do: counter + 1, else: counter - 1

    new_delta =
      if new_counter > 0, do: (delta + 1.0e4) / 1.0e4, else: 1 / ((delta + 1.0e4) / 1.0e4)

    (spot_price * :math.pow(new_delta, abs(new_counter))) |> floor
  end

  defp calc_for_bonding_curve_type("XYK", order_type, spot_price, delta, counter) do
    nft_tokens_balance = delta * spot_price
    counter_updated = if order_type == "Buy", do: counter, else: counter - 1
    current_delta = delta + 1 - counter_updated
    diff_amount = counter_updated * nft_tokens_balance / current_delta
    new_nft_tokens_balance = nft_tokens_balance + diff_amount

    if order_type == "Buy" do
      new_nft_tokens_balance / (current_delta - 1)
    else
      new_nft_tokens_balance / (current_delta + 1)
    end
  end

  defp calc_for_bonding_curve_type(curve_type, _order_type, _spot_price, _delta, _counter) do
    Logger.debug("Unkown bonding curve type: #{curve_type}")
    0
  end
end