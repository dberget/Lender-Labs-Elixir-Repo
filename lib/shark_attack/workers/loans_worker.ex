defmodule SharkAttack.LoansWorker do
  @moduledoc """
  Monitor Sharky Loans
  """
  alias SharkAttack.SharkyApi

  use GenServer

  require Logger

  def start_link(opts \\ []) do
    GenServer.start_link(__MODULE__, opts, name: __MODULE__)
  end

  def get_all_loan_data() do
    :ets.match(:collection_loans, {:_, :_, :_, :"$1"}) |> List.flatten()
  end

  def get_all_loans() do
    :ets.match_object(:loans, {:_, :"$1"})
    |> Enum.map(fn {_key, value} -> value end)
  end

  def get_borrower_loans(borrower) do
    :ets.match_object(:loans, {:_, :"$1"})
    |> Enum.map(fn {_key, value} -> value end)
    |> Enum.filter(&(&1["borrower"] == borrower))
  end

  def get_lender_loans(lender) do
    :ets.match_object(:collection_loans, {:_, :_, lender, :"$1"})
  end

  def get_lender_loans(lender, nil) do
    get_lender_loans(lender)
  end

  def get_lender_loans(lender, collection) do
    :ets.match_object(:collection_loans, {collection, :_, lender, :"$1"})
  end

  def get_all_offers() do
    :ets.match_object(:offers, {:_, :"$1"})
    |> Enum.map(fn {_key, value} -> value end)
  end

  def get_loan(loan) do
    {:ok, :ets.match(:collection_loans, {:_, loan, :_, :"$1"}) |> List.flatten() |> List.first()}
  end

  def get_offer(offer_address) do
    case :ets.lookup(:offers, offer_address) |> List.first() do
      {_address, offer} ->
        offer

      _ ->
        %{}
    end
  end

  def get_collection_loans(nil) do
    []
  end

  def get_collection_loans(collection) do
    :ets.lookup(:collection_loans, collection)
    |> Enum.map(fn {_key, _loan, _lender, value} -> value end)
  end

  def get_all_collection_loans() do
    :ets.match(:collection_loans, {:"$1", :_, :_, :"$2"})
    |> Enum.reduce(%{}, fn [orderbook_id, loan_data], acc ->
      Map.update(acc, orderbook_id, [loan_data], fn list -> [loan_data | list] end)
    end)
  end

  def delete_loan(loanAddress) do
    GenServer.cast(__MODULE__, {:delete, loanAddress})
  end

  def add_loan(loanData) do
    GenServer.cast(__MODULE__, {:add_new_loan, loanData, 0})
  end

  def add_offer(loanData) do
    GenServer.cast(__MODULE__, {:add_new_offer, loanData, 0})
  end

  def insert_loan(nil) do
    nil
  end

  def insert_loan(loan) do
    loanAddress = Map.get(loan, "pubkey")

    offer = get_offer(loanAddress)

    offerTime =
      case Map.get(loan, "offerTime") do
        nil -> Map.get(offer, "offerTime", Timex.to_unix(Timex.now()) * 1000)
        offerTime -> offerTime
      end

    loan =
      loan
      |> Map.put("is_ll_offer", SharkAttack.Rewards.is_ll_offer(loanAddress))
      |> Map.put(
        "offerTime",
        offerTime
      )

    :ets.insert(:loans, {loanAddress, loan})

    :ets.delete(:offers, loanAddress)

    :ets.match_delete(:collection_loans, {:_, loanAddress, :_, :_})

    :ets.insert(
      :collection_loans,
      {loan["orderBook"], loanAddress, loan["lender"], loan}
    )

    try do
      SharkAttack.Events.send_event("TAKE_LOAN", loan)

      SharkAttackWeb.LoansChannel.push(loan)

      SharkAttack.Rewards.create_entry(loan)

      if loan["is_ll_offer"] do
        SharkAttack.Offers.update_offer(loan["pubkey"], "taken")
      end

      SharkAttack.Loans.create_active_loan(loan)
    rescue
      e ->
        Logger.error("Error inserting new loan: #{inspect(e)}")

        SharkAttack.DiscordConsumer.send_to_webhook(
          "me",
          "Error inserting new loan: #{inspect(e)} - #{inspect(loan)}"
        )
    end
  end

  def flush() do
    # SharkAttack.DiscordConsumer.send_to_webhook("me", "Flushing loans")

    try do
      citrusLoans = SharkyApi.get_all_loan_data("citrus")
      sharkyLoans = SharkyApi.get_all_loan_data()

      labs_offers =
        SharkAttack.Offers.get_active_offers() |> Enum.map(& &1.loan_address) |> MapSet.new()

      loanData =
        (sharkyLoans ++ citrusLoans)
        |> Enum.map(fn loan ->
          is_ll_offer = MapSet.member?(labs_offers, loan["pubkey"])

          Map.put(loan, "is_ll_offer", is_ll_offer)
        end)

      collection_loans =
        loanData
        |> Enum.map(&{&1["orderBook"], &1["pubkey"], &1["lender"], &1})

      :ets.delete_all_objects(:collection_loans)
      :ets.insert(:collection_loans, collection_loans)

      loans =
        loanData
        |> Enum.filter(&(&1["state"] == "taken" || &1["state"] == "active"))
        |> Enum.map(&{&1["pubkey"], &1})

      :ets.delete_all_objects(:loans)
      :ets.insert(:loans, loans)

      offers =
        loanData
        |> Enum.filter(&(&1["state"] in ["offered", "waitingForBorrower", "waitingForLender"]))
        |> Enum.map(&{&1["pubkey"], &1})

      :ets.delete_all_objects(:offers)
      :ets.insert(:offers, offers)

      # SharkAttack.DiscordConsumer.send_to_webhook("me", "Done Flushing loans")
    rescue
      e ->
        Logger.warn("Error Flushing loans: #{inspect(e)}")

        # SharkAttack.DiscordConsumer.send_to_webhook(
        #   "me",
        #   "Error Flushing loans: #{inspect(e)}"
        # )
    end
  end

  @impl true
  def init([]) do
    # SharkAttack.DiscordConsumer.send_to_webhook("me", "Initing Loans Worker")

    generate_tables()

    flush()

    {:ok, []}
  end

  # @impl true
  # def handle_continue(:post_init, state) do
  #   IO.puts("Loans Worker Started, now flushing")

  #   flush()

  #   {:noreply, state}
  # end

  @impl true
  def terminate(reason, _state) do
    SharkAttack.DiscordConsumer.send_to_webhook(
      "me",
      "Loans Worker Terminating: #{inspect(reason)}"
    )

    :shutdown
  end

  def handle_info({:add_new_offer, loanData, attempts}, state) do
    Logger.info("Reattempting to add new offer: #{loanData.loanAddress}")

    add_new_offer(loanData, attempts)

    {:noreply, state}
  end

  def handle_info({:add_new_loan, loanData, attempts}, state) do
    Logger.info("Reattempting to add new loan: #{loanData.loanAddress}")

    add_new_loan(loanData, attempts)

    {:noreply, state}
  end

  @impl true
  def handle_info(:fetch, state) do
    {:noreply, state}
  end

  def handle_cast(
        {:add_new_offer, loanData, attempts},
        state
      ) do
    Logger.info("Attempt #{attempts} to add new offer: #{loanData.loanAddress}")

    add_new_offer(loanData, attempts)

    {:noreply, state}
  end

  def handle_cast({:add_new_loan, loanData, attempts}, state) do
    Logger.info("Attempting to add new loan: #{loanData.loanAddress}")

    add_new_loan(loanData, attempts)

    {:noreply, state}
  end

  @impl true
  def handle_cast({:delete, nil}, state) do
    {:noreply, state}
  end

  @impl true
  def handle_cast({:delete, key}, state) do
    :ets.match_delete(:collection_loans, {:_, key, :_, :_})

    :ets.delete(:loans, key)
    :ets.delete(:offers, key)

    SharkAttackWeb.LoansChannel.delete(key)

    {:noreply, state}
  end

  defp add_new_loan(nil, _attempts), do: nil

  defp add_new_loan(loanData, attempts) do
    case SharkyApi.get_loan(loanData) do
      nil ->
        handle_retry(loanData, attempts, :add_new_loan)

      {:error, %BadMapError{term: {:error, "Connection refused"}}} ->
        handle_retry(loanData, attempts, :add_new_loan)

      {:error, %Mint.TransportError{reason: :closed}} ->
        handle_retry(loanData, attempts, :add_new_loan)

      {:error, _} ->
        handle_retry(loanData, attempts, :add_new_loan)

      :error ->
        handle_retry(loanData, attempts, :add_new_loan)

      loan ->
        Logger.info("Inserting #{loanData.loanAddress} after #{attempts} attempts.")

        if loan["state"] in ["taken", "active"] do
          insert_loan(loan)
        else
          IO.inspect(loanData)

          handle_retry(loanData, attempts, :add_new_loan)
        end
    end
  end

  defp add_new_offer(nil, _attempts), do: nil

  defp add_new_offer(loanData, attempts) do
    case SharkyApi.get_loan(loanData) do
      nil ->
        handle_retry(loanData, attempts, :add_new_offer)

      {:error, %Mint.TransportError{reason: :closed}} ->
        handle_retry(loanData, attempts, :add_new_offer)

      {:error, %BadMapError{term: {:error, "Connection refused"}}} ->
        handle_retry(loanData, attempts, :add_new_offer)

      {:error, _} ->
        handle_retry(loanData, attempts, :add_new_offer)

      data ->
        offer =
          Map.put(data, "is_ll_offer", SharkAttack.Clients.Helius.has_turtles(data["lender"], 0))

        :ets.insert(:offers, {loanData.loanAddress, offer})

        :ets.insert(
          :collection_loans,
          {data["orderBook"], loanData.loanAddress, data["lender"], offer}
        )
    end
  end

  defp handle_retry(loanData, attempts, function) do
    if attempts < 3 do
      Logger.info(
        "Not found: #{loanData.loanAddress} - #{attempts} - retrying #{function} in 3 seconds"
      )

      Process.send_after(self(), {function, loanData, attempts + 1}, 3000)
    else
      Logger.error("Not found: #{loanData.loanAddress}")
    end
  end

  defp generate_tables() do
    :ets.new(:collection_loans, [
      :bag,
      :public,
      :named_table,
      {:read_concurrency, true},
      {:write_concurrency, true}
    ])

    :ets.new(:loans, [
      :public,
      :named_table,
      {:read_concurrency, true},
      {:write_concurrency, true}
    ])

    :ets.new(:offers, [
      :public,
      :named_table,
      {:read_concurrency, true},
      {:write_concurrency, true}
    ])
  end
end
