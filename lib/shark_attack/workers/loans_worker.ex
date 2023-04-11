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

  def get_all_loans() do
    :ets.match(:collection_loans, {:_, :_, :_, :"$1"}) |> List.flatten()
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

  def get_loan(loan) do
    {:ok, :ets.match(:collection_loans, {:_, loan, :_, :"$1"}) |> List.flatten() |> List.first()}
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

  def update_loan(loan, "REPAY_LOAN") do
    loanAddress = Map.get(loan, "instructions") |> List.last() |> Map.get("accounts") |> hd

    GenServer.cast(__MODULE__, {:delete, loanAddress})
  end

  def update_loan(loan, "RESCIND_LOAN") do
    loanAddress = Map.get(loan, "instructions") |> hd() |> Map.get("accounts") |> hd

    GenServer.cast(__MODULE__, {:delete, loanAddress})
  end

  def update_loan(loan, "FORECLOSE_LOAN") do
    loanAddress =
      loan
      |> Map.get("instructions")
      |> Enum.at(1)
      |> Map.get("accounts", [])
      |> List.first()

    GenServer.cast(__MODULE__, {:delete, loanAddress})
  end

  def update_loan(loan, "UNKNOWN") do
    closed_loan =
      loan
      |> Map.get("instructions")
      |> Enum.at(1)
      |> Map.get("accounts", [])
      |> List.first()

    case closed_loan do
      nil ->
        Logger.info("Unknown loan")

      _ ->
        GenServer.cast(__MODULE__, {:delete, closed_loan})

        new_loan =
          loan
          |> Map.get("instructions")
          |> Enum.at(1)
          |> Map.get("accounts", [])
          |> Enum.at(1)

        GenServer.cast(__MODULE__, {:add_new_loan, new_loan, 0})
    end
  end

  def update_loan(loan, "TAKE_LOAN") do
    loanAddress =
      loan
      |> Map.get("instructions")
      |> Enum.at(1)
      |> Map.get("accounts")
      |> Enum.at(4)

    GenServer.cast(__MODULE__, {:add_new_loan, loanAddress, 0})
  end

  def update_loan(loan, "OFFER_LOAN") do
    loan
    |> Map.get("nativeTransfers")
    |> Enum.chunk_every(4)
    |> Enum.each(fn offer ->
      %{"toUserAccount" => loanAddress} = hd(offer)

      GenServer.cast(__MODULE__, {:add_new_offer, loanAddress, 0})
    end)
  end

  def update_loan(_loan, status) do
    Logger.info(status)
  end

  def add_new_loan(nil), do: nil

  def add_new_loan(loanAddress, attempts \\ 0) do
    case SharkyApi.get_loan(loanAddress) do
      nil ->
        if attempts < 5 do
          Logger.info("Loan not found: #{loanAddress} - #{attempts} - retrying in 1 second")

          Process.send_after(__MODULE__, {:add_new_loan, loanAddress, attempts + 1}, 1000)
        else
          Logger.error("Loan not found: #{loanAddress}")
        end

      {:error, %Mint.TransportError{reason: :closed}} ->
        if attempts < 5 do
          Logger.info("Loan not found: #{loanAddress} - #{attempts} -  retrying in 1 second")

          Process.send_after(__MODULE__, {:add_new_loan, loanAddress, attempts + 1}, 1000)
        else
          Logger.error("Loan not found: #{loanAddress}")
        end

      loan ->
        insert_loan(loan)
    end
  end

  def add_new_offer(nil), do: nil

  def add_new_offer(loanAddress, attempts \\ 0) do
    case SharkyApi.get_loan(loanAddress) do
      nil ->
        if attempts < 5 do
          Logger.info("Offer not found: #{loanAddress} - #{attempts} - retrying in 1 second")

          Process.send_after(self(), {:add_new_offer, loanAddress, attempts + 1}, 1000)
        else
          Logger.error("Offer not found: #{loanAddress}")
        end

      {:error, %Mint.TransportError{reason: :closed}} ->
        if attempts < 5 do
          Logger.info("Offer not found: #{loanAddress} - #{attempts} - retrying in 1 second")

          Process.send_after(self(), {:add_new_offer, loanAddress, attempts + 1}, 1000)
        else
          Logger.error("Offer not found: #{loanAddress}")
        end

      loanData ->
        :ets.insert(:offers, {loanAddress, Map.drop(loanData, ["rawData"])})

        SharkAttackWeb.OffersChannel.push(loanData)

        :ets.insert(
          :collection_loans,
          {loanData["orderBook"], loanAddress, loanData["lender"], loanData}
        )
    end
  end

  def remove_loan(loanAddress) do
    GenServer.cast(__MODULE__, {:delete, loanAddress})
  end

  def insert_loan(nil) do
    nil
  end

  def insert_loan(loan) do
    loanAddress = Map.get(loan, "pubkey")

    :ets.insert(:loans, {loanAddress, Map.drop(loan, ["rawData"])})
    :ets.delete(:offers, loanAddress)

    :ets.match_delete(:collection_loans, {:_, loanAddress, :_, :_})

    SharkAttackWeb.LoansChannel.push(loan)
    SharkAttackWeb.OffersChannel.delete(loan["pubkey"])

    :ets.insert(
      :collection_loans,
      {loan["orderBook"], loanAddress, loan["lender"], loan}
    )
  end

  def flush() do
    SharkAttack.DiscordConsumer.send_to_webhook("me", "Flushing loans")

    loanData = SharkyApi.get_all_loan_data()

    collection_loans =
      loanData
      |> Enum.map(&{&1["orderBook"], &1["pubkey"], &1["lender"], &1})

    :ets.delete_all_objects(:collection_loans)
    :ets.insert(:collection_loans, collection_loans)

    loans =
      loanData
      |> Enum.reject(&(&1["state"] == "offered"))
      |> Enum.map(&Map.drop(&1, ["rawData"]))
      |> Enum.map(&{&1["pubkey"], &1})

    :ets.delete_all_objects(:loans)
    :ets.insert(:loans, loans)

    offers =
      loanData
      |> Enum.filter(&(&1["state"] == "offered"))
      |> Enum.map(&Map.drop(&1, ["rawData"]))
      |> Enum.map(&{&1["pubkey"], &1})

    :ets.delete_all_objects(:offers)
    :ets.insert(:offers, offers)

    SharkAttack.DiscordConsumer.send_to_webhook("me", "Done Flushing loans")
  end

  @impl true
  def init([]) do
    generate_tables()
    flush()

    {:ok, []}
  end

  def handle_info({:add_new_offer, loanAddress, attempts}, state) do
    Logger.info("Reattempting to add new offer: #{loanAddress}")

    add_new_offer(loanAddress, attempts)

    {:noreply, state}
  end

  def handle_info({:add_new_loan, loanAddress, attempts}, state) do
    Logger.info("Reattempting to add new loan: #{loanAddress}")

    add_new_loan(loanAddress, attempts)

    {:noreply, state}
  end

  @impl true
  def handle_info(:fetch, state) do
    {:noreply, state}
  end

  def handle_cast({:add_new_offer, loanAddress, attempts}, state) do
    Logger.info("Attempt #{attempts} to add new offer: #{loanAddress}")

    add_new_offer(loanAddress, attempts)

    {:noreply, state}
  end

  def handle_cast({:add_new_loan, loanAddress, attempts}, state) do
    Logger.info("Aattempting to add new loan: #{loanAddress}")

    add_new_loan(loanAddress, attempts)

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
    SharkAttackWeb.OffersChannel.delete(key)

    {:noreply, state}
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
