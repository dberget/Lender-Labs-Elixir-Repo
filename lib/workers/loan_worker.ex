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

  def update_loan(loan, "REPAY_LOAN") do
    loanAddress = Map.get(loan, "instructions") |> List.last() |> Map.get("accounts") |> hd

    :ets.delete(:loans, loanAddress)
  end

  def update_loan(loan, "RESCIND_LOAN") do
    loanAddress = Map.get(loan, "instructions") |> hd() |> Map.get("accounts") |> hd

    :ets.delete(:loans, loanAddress)
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
        IO.inspect(loanData, label: "loanData")

        :ets.insert(:loans, {loanAddress, loanData["lender"], loanData})
    end
  end

  def update_loan(loan, "OFFER_LOAN") do
    loanAddress =
      loan
      |> Map.get("instructions")
      |> hd()
      |> Map.get("accounts")
      |> Enum.at(4)
      |> IO.inspect()

    case SharkyApi.get_loan(loanAddress) |> IO.inspect() do
      {:error, _message} ->
        IO.inspect(loan, label: "FAILED LOAN")

        nil

      loanData ->
        IO.inspect(loanData, label: "loanData")

        :ets.insert(:loans, {loanAddress, loanData["lender"], loanData})
    end
  end

  def update_loan(_loan, _status) do
    # IO.inspect(status)

    # :ets.delete(:loans, loan["loan"])
  end

  @impl true
  def init([]) do
    generate_table()

    SharkyApi.get_all_loan_data()
    |> Enum.each(fn loan ->
      :ets.insert(:loans, {loan["loan"], loan["lender"], loan})
    end)

    {:ok, []}
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
