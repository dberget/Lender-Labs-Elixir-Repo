defmodule SharkAttack.Nfts do
  alias SharkAttack.Collections.Nft
  import Ecto.Query
  alias SharkAttack.Repo

  def update_nft(%Nft{} = nft, attrs) do
    nft
    |> Nft.changeset(attrs)
    |> Repo.update()
  end

  def get_nft_by_mint(nil) do
    nil
  end

  def get_nft_by_mint(mint) do
    Repo.get(Nft, mint: mint)
  end

  def get_nfts_by_mints(mints) do
    query = from(n in Nft, where: n.mint in ^mints)

    Repo.all(query)
  end

  def get_and_save_nft_data(mint) do
    # Refactor all this to a with statement.

    nft =
      case get_nft_by_mint(mint) do
        nil ->
          %Nft{
            mint: mint,
            name: nil,
            image: nil
          }

        res ->
          res
      end

    case Map.get(nft, :image) do
      nil ->
        nft_res = SharkAttack.Solana.get_asset(mint) |> List.first()

        update_nft(nft, %{
          name: nft_res["result"]["content"]["metadata"]["name"],
          image: parse_nft_image(nft_res["result"]["content"]["files"])
        })

        %{
          name: nft_res["result"]["content"]["metadata"]["name"],
          image: parse_nft_image(nft_res["result"]["content"]["files"])
        }

      _ ->
        nft
    end
  end

  def get_sharky_nft_index(mint, nfts) do
    {:found, index, _nft} =
      Enum.reduce_while(nfts, {:not_found, 0}, fn el, {:not_found, index} ->
        if el.mint == mint,
          do: {:halt, {:found, index, el}},
          else: {:cont, {:not_found, index + 1}}
      end)

    index
  end

  def save_nft_names(collection_id) do
    nfts = get_collection_nfts(collection_id)

    mint_chunks = Enum.map(nfts, & &1.mint) |> Enum.chunk_every(500)

    Enum.each(mint_chunks, fn mints ->
      nft_names = SharkAttack.Solana.get_assets(mints)

      Enum.each(nft_names, fn nft_name ->
        nft = Enum.find(nfts, fn n -> n.mint == nft_name["id"] end)

        update_nft(nft, %{
          name: nft_name["result"]["content"]["metadata"]["name"],
          image: parse_nft_image(nft_name["result"]["content"]["files"])
        })
      end)
    end)
  end

  def parse_nft_image(nil) do
    ""
  end

  def parse_nft_image([]) do
    ""
  end

  def parse_nft_image(nft) do
    nft |> List.first([%{"uri" => ""}]) |> Map.get("uri")
  end

  def get_collection_nfts(collection_id) do
    query = from(n in Nft, where: n.collection_id == ^collection_id)

    Repo.all(query)
  end

  def get_collections_missing_nft_names() do
    query = from(n in Nft, where: is_nil(n.name))

    Repo.all(query) |> Enum.map(& &1.collection_id) |> Enum.uniq()
  end

  def get_nft_name_from_api(mint) do
    res =
      SharkAttack.Helpers.do_post_request(
        "https://api.helius.xyz/v1/nfts?api-key=8fea9de0-b3d0-4bf4-a1fb-0945dfd91d42",
        %{mints: [mint]}
      )

    res |> hd |> Map.get("name")
  end

  def get_nft_names(mints) do
    SharkAttack.Solana.get_assets(mints)
  end
end
