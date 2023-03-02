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
    :ets.match_object(:loans, {:_, :_, :_, :"$1"})
    # :ets.tab2list(:loans)
    # |> Enum.map(fn {_key, _lender, _orderBook, value} -> value end)
  end

  def get_lender_loans(lender, nil) do
    :ets.match_object(:loans, {:_, lender, :_, :"$1"})
  end

  def get_lender_loans(lender, collection) do
    :ets.match_object(:loans, {:_, lender, collection, :"$1"})
  end

  def get_collection_loans(collection) do
    :ets.lookup(:collection_loans, collection)
    |> Enum.map(fn {_key, _loan, value} -> value end)
  end

  def get_all_collection_loans() do
    :ets.match(:collection_loans, {:"$1", :_, :"$2"})
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

    unless is_nil(loanAddress) do
      GenServer.cast(__MODULE__, {:delete, loanAddress})
    end
  end

  def update_loan(loan, "TAKE_LOAN") do
    loanAddress =
      loan
      |> Map.get("instructions")
      |> Enum.at(1)
      |> Map.get("accounts")
      |> Enum.at(5)

    case SharkyApi.get_loan(loanAddress) do
      {:error, _message} ->
        nil

      loanData ->
        :ets.insert(:loans, {loanAddress, loanData["lender"], loanData["orderBook"], loanData})

        :ets.match_delete(:collection_loans, {:_, loanData, :_})
        :ets.insert_new(:collection_loans, {loanData["orderBook"], loanAddress, loanData})
    end
  end

  def update_loan(loan, "OFFER_LOAN") do
    loanAddress =
      loan
      |> Map.get("instructions")
      |> hd()
      |> Map.get("accounts")
      |> Enum.at(3)

    case SharkyApi.get_loan(loanAddress) do
      {:error, _message} ->
        nil

      loanData ->
        :ets.insert(:loans, {loanAddress, loanData["lender"], loanData["orderBook"], loanData})
        :ets.insert(:collection_loans, {loanData["orderBook"], loanAddress, loanData})
    end
  end

  def update_loan(_loan, status) do
    IO.inspect(status)

    # :ets.delete(:loans, loan["loan"])
  end

  def flush() do
    :ets.delete_all_objects(:loans)
    :ets.delete_all_objects(:collection_loans)

    SharkyApi.get_all_loan_data()
    |> Enum.each(fn loan ->
      :ets.insert(:loans, {loan["loan"], loan["lender"], loan["orderBook"], loan})

      :ets.insert(:collection_loans, {loan["orderBook"], loan["loan"], loan})
    end)
  end

  @impl true
  def init([]) do
    generate_tables()

    # collections = SharkAttack.Collections.list_collections()

    SharkyApi.get_all_loan_data()
    |> Enum.each(fn loan ->
      :ets.insert(:loans, {loan["loan"], loan["lender"], loan["orderBook"], loan})

      # collection = collections.find(fn collection -> collection["sharky_address"] == loan["orderBook"] end)

      :ets.insert(:collection_loans, {loan["orderBook"], loan["loan"], loan})
    end)

    {:ok, []}
  end

  @impl true
  def handle_cast({:delete, key}, state) do
    :ets.delete(:loans, key)
    :ets.match_delete(:collection_loans, {:_, key, :_})

    {:noreply, state}
  end

  @impl true
  def handle_info(:fetch, state) do
    {:noreply, state}
  end

  defp generate_tables() do
    :ets.new(:loans, [
      :set,
      :public,
      :named_table,
      read_concurrency: true,
      write_concurrency: true
    ])

    :ets.new(:collection_loans, [
      :bag,
      :public,
      :named_table,
      read_concurrency: true,
      write_concurrency: true
    ])
  end
end
