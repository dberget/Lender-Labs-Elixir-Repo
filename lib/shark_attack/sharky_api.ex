defmodule SharkAttack.SharkyApi do
  require Logger

  def get_order_books() do
    res = SharkAttack.Helpers.do_get_request("http://localhost:5001/order_book/list")

    Map.get(res, "orderBooks", []) |> Enum.filter(fn x -> x["name"] !== nil end)
  end

  def send_bundle(params) do
    res = SharkAttack.Helpers.do_post_request("http://localhost:5001/send_bundle", params)

    res
  end

  def claim_rewards(params) do
    res = SharkAttack.Helpers.do_post_request("http://localhost:5001/claim_rewards", params)

    res["result"]
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
      "https://sharky.fi/api/collection/check-mints?network=mainnet&deployEnvironment=production",
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

  def get_all_loans("citrus") do
    res = SharkAttack.Helpers.do_get_request("http://localhost:5001/loans/all/citrus")

    Map.get(res, "loanData", [])
    |> Enum.filter(&(&1["state"] == "active"))
  end

  def get_loan(%{loanAddress: nil}) do
    {:error, "Loan not found"}
  end

  def get_loan(%{loanAddress: pk, source: "CITRUS"}) do
    case SharkAttack.Helpers.do_get_request("http://localhost:5001/loans/loan/citrus/#{pk}") do
      {:error, body} ->
        {:error, body}

      body ->
        IO.inspect(body)

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

  def get_loan(pk, data) do
    case SharkAttack.Helpers.do_post_request("http://localhost:5001/loans/loan/#{pk}", %{
           data: data
         }) do
      {:error, body} ->
        {:error, body}

      body ->
        Map.get(body, "loanData", %{})
    end
  end

  def get_citrus_loan_history() do
    res = SharkAttack.Helpers.do_get_request("http://localhost:5001/loans/all/citrus")

    Map.get(res, "loanData", [])
    |> Enum.filter(&(&1["state"] == "defaulted" || &1["state"] == "repaid"))
  end

  def get_all_loan_data("citrus") do
    res = SharkAttack.Helpers.do_get_request("http://localhost:5001/loans/all/citrus")

    Map.get(res, "loanData", [])
    |> Enum.reject(&(&1["state"] == "defaulted" || &1["state"] == "repaid"))
  end

  def get_all_loan_data() do
    res = SharkAttack.Helpers.do_get_request("http://localhost:5001/loans/all")

    Map.get(res, "loanData", [])
  end

  def get_mint_lists(pubkey) do
    SharkAttack.Helpers.do_get_request("http://localhost:5001/order_book/mintList/#{pubkey}")
  end

  def get_lender_loans(address) do
    res = SharkAttack.Helpers.do_get_request("http://localhost:5001/loans/#{address}")

    case res do
      {:error, _body} ->
        Logger.error("Falling back to use cache")

        SharkAttack.LoansWorker.get_lender_loans(address) |> Enum.map(&elem(&1, 3))

      body ->
        Map.get(body, "loanData", [])
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
      {:error, _body} ->
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

  def get_borrow_tx(%{index: index, borrower: borrower, offer: offer, mint: mint}) do
    case SharkAttack.Helpers.do_get_request(
           "http://localhost:5001/offers/borrow/ix?borrower=#{borrower}&offer=#{offer}&mint=#{mint}&index=#{index}"
         ) do
      {:error, body} ->
        {:error, body}

      body ->
        IO.inspect(body)
        Map.get(body, "ix", [])
    end
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
           "https://sharky.fi/api/loan/my-loans?borrower=#{lender}&network=mainnet&deployEnvironment=production"
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
      {:error, reason} ->
        {:error, reason}

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
      {:error, :timeout} ->
        []

      data ->
        all_items = all_items ++ data["historyLoans"]

        if data["historyLoans"] |> length >= limit do
          get_borrower_history(address, offset + limit, all_items)
        else
          all_items
        end
    end
  end

  def stake(params) do
    SharkAttack.Helpers.do_post_request("http://localhost:5001/stake", params)
  end

  def unstake(params) do
    SharkAttack.Helpers.do_post_request("http://localhost:5001/unstake", params)
  end

  @doc """
  Fetches Kamino obligation data for a given wallet address.
  Returns user obligation data including deposits, borrows, and net account value.
  """
  def get_kamino_obligations(wallet_address) do
    case SharkAttack.Helpers.do_get_request(
           "http://localhost:5001/kamino/obligations/#{wallet_address}"
         ) do
      {:error, body} ->
        {:error, body}

      body ->
        body
    end
  end

  @doc """
  Fetches the directed stake validator for a given wallet address.
  Returns the validator information for the user's directed stake.
  """
  def get_directed_stake_validator(wallet_address) do
    case SharkAttack.Helpers.do_get_request(
           "http://localhost:5001/vsol/directed-stake/#{wallet_address}"
         ) do
      {:error, body} ->
        {:error, body}

      body ->
        body
    end
  end
end
