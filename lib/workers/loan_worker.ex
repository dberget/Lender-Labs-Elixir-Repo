defmodule SharkAttack.LoansWorker do
  @moduledoc """
  Monitor Sharky Loans
  """
  alias SharkAttack.SharkyApi

  use GenServer

  require Logger

  def start_link(opts) do
    GenServer.start_link(__MODULE__, [], opts)
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
      Map.get(loan, "instructions")
      |> List.last()
      |> Map.get("accounts")
      |> Enum.at(5)

    # loanData = SharkyApi.get_loan(loanAddress) |> IO.inspect(label: "TAKE_LOAN_RES")

    # :ets.insert(:loans, {loanAddress, from, loan})
  end

  def update_loan(loan, _Status) do
    # IO.inspect(loan)

    # :ets.delete(:loans, loan["loan"])
  end

  @impl true
  def init([]) do
    :ets.new(:loans, [:set, :public, :named_table])

    SharkyApi.get_all_loan_data()
    |> Enum.each(fn loan ->
      :ets.insert(:loans, {loan["loan"], loan["lender"], loan})
    end)

    {:ok, []}
  end

  @impl true
  def handle_info(:fetch, state) do
    IO.inspect(state)

    {:noreply, state}
  end
end
