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
    :ets.match_object(:collection_loans, {:_, :_, lender, :"$1"})
  end

  def get_lender_loans(lender, collection) do
    :ets.match_object(:collection_loans, {collection, :_, lender, :"$1"})
  end

  def get_loan(loan) do
    {:ok, :ets.match(:collection_loans, {:_, loan, :_, :"$1"}) |> List.flatten()}
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

    unless is_nil(loanAddress) do
      GenServer.cast(__MODULE__, {:delete, loanAddress})
    end
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
      |> Map.get("accounts")
      |> hd()

    GenServer.cast(__MODULE__, {:delete, loanAddress})
  end

  def update_loan(loan, "TAKE_LOAN") do
    loanAddress =
      loan
      |> Map.get("instructions")
      |> Enum.at(1)
      |> Map.get("accounts")
      |> Enum.at(4)

    case SharkyApi.get_loan(loanAddress) do
      {:error, _message} ->
        Logger.error("Loan not found: #{loanAddress}")

      loanData ->
        :ets.insert(
          :collection_loans,
          {loanData["orderBook"], loanAddress, loanData["lender"], loanData}
        )
    end
  end

  def update_loan(loan, "OFFER_LOAN") do
    loan
    |> Map.get("nativeTransfers")
    |> Enum.chunk_every(4)
    |> Enum.each(fn offer ->
      %{"toUserAccount" => loanAddress} = hd(offer)

      case SharkyApi.get_loan(loanAddress) do
        {:error, _message} ->
          Logger.error("Loan not found: #{loanAddress}")

        loanData ->
          :ets.insert(
            :collection_loans,
            {loanData["orderBook"], loanAddress, loanData["lender"], loanData}
          )
      end
    end)
  end

  def update_loan(_loan, status) do
    Logger.info(status)
  end

  def remove_loan(loanAddress) do
    GenServer.cast(__MODULE__, {:delete, loanAddress})
  end

  def flush() do
    loanData = SharkyApi.get_all_loan_data()

    collection_loans =
      loanData
      |> Enum.map(&{&1["orderBook"], &1["loan"], &1["lender"], &1})

    :ets.delete_all_objects(:collection_loans)
    :ets.insert(:collection_loans, collection_loans)
  end

  @impl true
  def init([]) do
    generate_tables()

    loanData = SharkyApi.get_all_loan_data()

    collection_loans =
      loanData
      |> Enum.map(&{&1["orderBook"], &1["pubkey"], &1["lender"], &1})

    :ets.insert(:collection_loans, collection_loans)

    {:ok, []}
  end

  @impl true
  def handle_cast({:delete, nil}, state) do
    {:noreply, state}
  end

  @impl true
  def handle_cast({:delete, key}, state) do
    :ets.match_delete(:collection_loans, {:_, key, :_, :_})

    {:noreply, state}
  end

  @impl true
  def handle_info(:fetch, state) do
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
  end
end
