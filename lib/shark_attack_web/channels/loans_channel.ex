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
    #   "https://api.helius.xyz/v0/addresses/#{loan["borrower"]}/names?api-key=d250e974-e6c5-4428-a9ca-25f8cd271444"
    # )

    collections =
      mints
      |> SharkAttack.Collections.get_collections_from_mint_list()

    SharkAttackWeb.Endpoint.broadcast!("room:loans", "new", %{
      data: loan,
      collections: collections
    })
  end

  def delete(loan) do
    SharkAttackWeb.Endpoint.broadcast!("room:loans", "delete", %{pubkey: loan})
  end
end
