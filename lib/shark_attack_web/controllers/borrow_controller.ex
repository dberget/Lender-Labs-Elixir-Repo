defmodule SharkAttackWeb.BorrowController do
  alias SharkAttack.Collections
  alias SharkAttack.Repo

  use SharkAttackWeb, :controller

  def index(conn, _params) do
    conn
    |> json(%{message: "Hello from the API!"})
  end

  def get_index(conn, %{"mint" => mint}) do
    index = get_nft_index(mint)

    conn
    |> json(%{index: index})
  end

  def get_borrow_tx(conn, %{"borrower" => borrower, "mint" => mint, "offer" => offer}) do
    index = get_nft_index(mint)

    res =
      SharkAttack.SharkyApi.get_borrow_tx(%{
        index: index,
        borrower: borrower,
        offer: offer,
        mint: mint
      })

    conn |> json(res)
  end

  def get_buy_tx(conn, %{"buyer" => buyer, "mint" => mint}) do
    res = SharkAttack.Tensor.get_buy_tx(buyer, mint)

    conn |> json(res)
  end

  def get_sell_tx(conn, %{"seller" => seller, "mint" => mint}) do
    res = SharkAttack.Tensor.get_sell_tx(seller, mint)

    conn |> json(res)
  end

  def get_listing_info(conn, %{"mint" => mint}) do
    res = SharkAttack.Tensor.get_listing_info(mint)

    conn |> json(res)
  end

  def get_nft_index(mint) do
    collection = Collections.get_collection_from_mint(mint) |> Repo.preload(:nfts)

    {:found, index, _nft} =
      Enum.reduce_while(collection.nfts, {:not_found, 0}, fn el, {:not_found, index} ->
        if el.mint == mint,
          do: {:halt, {:found, index, el}},
          else: {:cont, {:not_found, index + 1}}
      end)

    index
  end
end
