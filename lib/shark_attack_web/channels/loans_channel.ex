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
      |> Enum.take(100)

    push(socket, "subscribe", %{data: loans})

    {:noreply, socket}
  end

  def refresh() do
    loans =
      :ets.tab2list(:loans)
      |> Enum.map(&elem(&1, 1))
      |> Enum.sort_by(& &1["start"], :desc)
      |> Enum.take(25)

    SharkAttackWeb.Endpoint.broadcast!("room:loans", "subscribe", %{data: loans})
  end

  def push(loan) do
    mints =
      loan["borrower"]
      |> SharkAttack.Solana.get_user_token_mints()
      |> Enum.reject(
        &(&1["tokenAmount"]["amount"] == "0" || &1["state"] == "frozen" ||
            &1["mint"] == loan["nftCollateralMint"])
      )
      |> Enum.map(& &1["mint"])

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
