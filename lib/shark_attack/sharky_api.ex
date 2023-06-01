defmodule SharkAttack.SharkyApi do
  require Logger

  def get_order_books() do
    res = SharkAttack.Helpers.do_get_request("http://localhost:5001/order_book/list")

    Map.get(res, "orderBooks", []) |> Enum.filter(fn x -> x["name"] !== nil end)
  end

  def get_raw_order_books() do
    res = SharkAttack.Helpers.do_get_request("http://localhost:5001/order_book/rawlist")

    Map.get(res, "orderBooks", []) |> Enum.filter(fn x -> x["name"] !== nil end)
  end

  def sign(address) do
    res =
      SharkAttack.Helpers.do_get_request("http://localhost:5001/authenticate?address=#{address}")

    res
  end

  def verify(message, user_address) do
    res =
      SharkAttack.Helpers.do_post_request(
        "http://localhost:5001/verify",
        %{msg: message, user_address: user_address}
      )

    res
  end

  def get_sharky_indexes(mints) do
    SharkAttack.Helpers.do_post_request(
      "https://sharky-backend.herokuapp.com/nft-list/check-mints?network=mainnet&deployEnvironment=production",
      %{"mints" => mints}
    )
  end

  def get_all_loans() do
    res = SharkAttack.Helpers.do_get_request("http://localhost:5001/loans/taken")

    case res do
      {:error, body} ->
        {:error, body}

      body ->
        Map.get(body, "loanData", [])
    end
  end

  def get_loan(%{loanAddress: pk, source: "CITRUS"}) do
    case SharkAttack.Helpers.do_get_request("http://localhost:5001/loans/loan/citrus/#{pk}") do
      {:error, body} ->
        {:error, body}

      body ->
        Map.get(body, "loanData", %{})
    end
  end

  def get_loan(%{loanAddress: pk}) do
    case SharkAttack.Helpers.do_get_request("http://localhost:5001/loans/loan/#{pk}") do
      {:error, body} ->
        {:error, body}

      body ->
        Map.get(body, "loanData", %{})
    end
  end

  def get_all_loan_data("citrus") do
    SharkAttack.Collections.list_collections()
    |> Enum.map(& &1.foxy_address)
    |> Enum.reject(&is_nil/1)
    |> Enum.flat_map(&get_collection_loans(&1, "citrus"))
    |> Enum.reject(&(&1["state"] == "defaulted" || &1["state"] == "repaid"))
  end

  def get_all_loan_data() do
    res = SharkAttack.Helpers.do_get_request("http://localhost:5001/loans/all")

    Map.get(res, "loanData", [])
  end

  def get_floor_prices() do
    res = SharkAttack.Helpers.do_get_request("https://sharky.fi/api/floor-prices")

    Map.get(res, "floorPrices", %{})
  end

  def get_mint_lists(pubkey) do
    SharkAttack.Helpers.do_get_request("http://localhost:5001/order_book/mintList/#{pubkey}")
  end

  def get_orderbook_offers(pubKey) do
    SharkAttack.Helpers.do_get_request("http://localhost:5001/offers/ob/#{pubKey}")
  end

  def get_user_open_offers(address) do
    SharkAttack.Helpers.do_get_request("http://localhost:5001/offers/#{address}")
  end

  def get_lender_loans(address) do
    res = SharkAttack.Helpers.do_get_request("http://localhost:5001/loans/#{address}")

    case res do
      {:error, _body} ->
        Logger.error("Falling back to use cache")

        SharkAttack.LoansWorker.get_lender_loans(address) |> Enum.map(&elem(&1, 3))

      body ->
        Map.get(body, "data", [])
    end
  end

  def get_lender_loans(address, "citrus") do
    res = SharkAttack.Helpers.do_get_request("http://localhost:5001/loans/citrus/#{address}")

    case res do
      {:error, _body} ->
        Logger.error("get_citrus_lender_loans")

        []

      body ->
        Map.get(body, "loanData", [])
    end
  end

  def get_complete_citrus_loans(address) do
    res = SharkAttack.Helpers.do_get_request("http://localhost:5001/order_book/citrus/#{address}")

    case res do
      {:error, body} ->
        {:error, body}

      body ->
        Map.get(body, "loanData", [])
    end
  end

  def get_collection_loans(nil, "frakt"), do: []

  def get_collection_loans("", "citrus"), do: []

  def get_collection_loans(nil, "citrus"), do: []

  def get_collection_loans(address, "citrus") do
    res =
      SharkAttack.Helpers.do_get_request(
        "http://localhost:5001/order_book/citrus/#{address}?state=active"
      )

    case res do
      {:error, body} ->
        []

      body ->
        Map.get(body, "loanData", [])
    end
  end

  def get_collection_loans(address, "frakt") do
    res = SharkAttack.Helpers.do_get_request("http://localhost:5001/order_book/frakt/#{address}")

    case res do
      {:error, body} ->
        {:error, body}

      body ->
        Map.get(body, "loanData", [])
    end
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
      "http://localhost:5001/offers/ix/#{address}/#{pubkey}/#{loan_amount}"
    )
  end

  def revoke_offer(wallet_address, loan_pubkey) do
    SharkAttack.Helpers.do_post_request("http://localhost:5001/offers/revoke", %{
      wallet: wallet_address,
      loanPubKey: loan_pubkey
    })
  end

  def get_recent_history(lender) do
    case SharkAttack.Helpers.do_get_request(
           "https://sharky.fi/api/loan/my-loans?lender=#{lender}&network=mainnet&deployEnvironment=production"
         ) do
      {:error, body} ->
        {:error, body}

      body ->
        Map.get(body, "historyLoans", [])
    end
  end

  def get_recent_history(lender, "borrow") do
    case SharkAttack.Helpers.do_get_request(
           "https://sharky.fi/api/loan/my-loans?borrow=#{lender}&network=mainnet&deployEnvironment=production"
         ) do
      {:error, body} ->
        {:error, body}

      body ->
        Map.get(body, "historyLoans", [])
    end
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

  def get_borrower_history(address, offset \\ 0, all_items \\ []) do
    limit = 50

    case SharkAttack.Helpers.do_get_request(
           "https://sharky.fi/api/loan/my-loans?borrower=#{address}&network=mainnet&deployEnvironment=production&offset=#{offset}"
         ) do
      data ->
        all_items = all_items ++ data["historyLoans"]

        if data["historyLoans"] |> length >= limit do
          get_borrower_history(address, offset + limit, all_items)
        else
          all_items
        end
    end
  end
end
