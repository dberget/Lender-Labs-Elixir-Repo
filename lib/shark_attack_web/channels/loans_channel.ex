defmodule SharkAttackWeb.LoansChannel do
  use Phoenix.Channel

  def join("room:loans", _message, socket) do
    {:ok, socket}
  end

  def handle_in("subscribe", _, socket) do
    loans =
      :ets.tab2list(:loans)
      |> Enum.map(&elem(&1, 1))
      |> Enum.sort_by(& &1["start"], :desc)
      |> Enum.take(10)

    push(socket, "subscribe", %{data: loans})

    {:noreply, socket}
  end

  def push(nil), do: nil

  def push(loan) do
    mints =
      loan["borrower"]
      |> SharkAttack.Solana.get_user_token_mints()
      |> Enum.reject(
        &(&1["tokenAmount"]["amount"] == "0" || &1["tokenAmount"]["amount"] > "1" ||
            &1["mint"] == loan["nftCollateralMint"])
      )
      |> Enum.map(& &1["mint"])

    # borrower_loans =
    #   SharkAttack.LoansWorker.get_all_loans()
    #   |> Enum.filter(
    #     &(&1["borrower"] == loan["borrower"] and
    #         DateTime.diff(DateTime.from_unix!(&1["end"]), DateTime.utc_now(), :hour) < 24)
    #   )
    #   |> Enum.sort_by(& &1["end"], :asc)

    # SharkAttack.Helpers.do_get_request(
    #   "https://api.helius.xyz/v0/addresses/#{loan["borrower"]}/names?api-key="
    # )

    # loans_history = SharkAttack.Loans.get_loans_history!(loan["borrower"], "borrower")

    # foreclosed_loans = loans_history |> Enum.filter(&(!is_nil(&1.dateForeclosed)))

    # average_loan_duration =
    #   Timex.Duration.from_erl(
    #     {0,
    #      round(
    #        (loans_history
    #         |> Enum.filter(&is_nil(&1.dateForeclosed))
    #         |> Enum.map(&Timex.diff(&1.dateRepaid, &1.dateTaken, :seconds))
    #         |> Enum.sum()) /
    #          Enum.count(loans_history)
    #      ), 0}
    #   )
    #   |> Timex.format_duration(:humanized)

    collections =
      mints
      |> SharkAttack.Collections.get_collections_from_mint_list()

    SharkAttackWeb.Endpoint.broadcast!("room:loans", "new", %{
      data: loan,
      # borrower: %{
      #   avg_duration: average_loan_duration,
      #   loans_history: Enum.count(loans_history),
      #   default_ratio: get_default_ratio(Enum.count(foreclosed_loans), Enum.count(loans_history))
      # },
      collections: collections
    })
  end

  def get_default_ratio(0, _total_loans) do
    0
  end

  def get_default_ratio(foreclosed_loans, total_loans) do
    foreclosed_loans / total_loans * 100
  end

  def delete(loan) do
    SharkAttackWeb.Endpoint.broadcast!("room:loans", "delete", %{pubkey: loan})
  end
end
