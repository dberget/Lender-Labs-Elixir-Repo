defmodule SharkAttackWeb.BorrowController do
  alias SharkAttack.SharkyApi
  alias SharkAttack.Collections
  alias SharkAttack.Repo

  use SharkAttackWeb, :controller

  def index(conn, _params) do
    conn
    |> json(%{message: "Hello from the API!"})
  end

  def get_index(conn, %{"mint" => mint}) do
    collection = Collections.get_collection_from_mint(mint) |> Repo.preload(:nfts)

    {:found, index, _nft} =
      Enum.reduce_while(collection.nfts, {:not_found, 0}, fn el, {:not_found, index} ->
        if el.mint == mint,
          do: {:halt, {:found, index, el}},
          else: {:cont, {:not_found, index + 1}}
      end)

    conn
    |> json(%{index: index})
  end

  def get_sell_tx(conn, %{"seller" => seller, "mint" => mint}) do
    res = SharkAttack.Tensor.get_sell_tx(seller, mint)

    conn |> json(res)
  end
end
