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
    :ets.match(:loans, {:_, :_, :_, :"$1"}) |> List.flatten()
    # :ets.tab2list(:loans)
    # |> Enum.map(fn {_key, _lender, _orderBook, value} -> value end)
  end

  def get_lender_loans(lender) do
    :ets.match(:loans, {:_, lender, :_, :"$1"})
  end

  def get_orderBook_loans(orderBook) do
    :ets.match(:loans, {:_, :_, orderBook, :"$1"})
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
    end
  end

  def update_loan(_loan, status) do
    IO.inspect(status)

    # :ets.delete(:loans, loan["loan"])
  end

  @impl true
  def init([]) do
    generate_table()

    SharkyApi.get_all_loan_data()
    |> Enum.each(fn loan ->
      :ets.insert(:loans, {loan["loan"], loan["lender"], loan["orderBook"], loan})
    end)

    {:ok, []}
  end

  @impl true
  def handle_cast({:delete, key}, state) do
    :ets.delete(:loans, key)

    {:noreply, state}
  end

  @impl true
  def handle_info(:fetch, state) do
    {:noreply, state}
  end

  defp generate_table() do
    :ets.new(:loans, [
      :set,
      :public,
      :named_table,
      read_concurrency: true,
      write_concurrency: true
    ])
  end
end
