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
    Repo.get_by(Nft, mint: mint)
  end

  def get_nfts_by_mints(mints) do
    query = from(n in Nft, where: n.mint in ^mints)

    Repo.all(query)
  end

  def save_nft_names(collection_id) do
    nfts = get_collection_nfts(collection_id)

    mint_chunks = Enum.map(nfts, & &1.mint) |> Enum.chunk_every(100)

    Enum.each(mint_chunks, fn mints ->
      nft_names = get_nft_names(mints)

      Enum.each(nft_names, fn nft_name ->
        nft = Enum.find(nfts, fn n -> n.mint == nft_name["account"] end)

        update_nft(nft, %{
          name: get_in(nft, ["offChainMetadata", "metadata", "name"]),
          image: get_in(nft, ["offChainMetadata", "metadata", "image"])
        })
      end)
    end)
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
        "https://api.helius.xyz/v1/nfts?api-key=d250e974-e6c5-4428-a9ca-25f8cd271444",
        %{mints: [mint]}
      )

    res |> hd |> Map.get("name")
  end

  def get_nft_names(mints) do
    res =
      SharkAttack.Helpers.do_post_request(
        "https://api.helius.xyz/v0/token-metadata?api-key=d250e974-e6c5-4428-a9ca-25f8cd271444",
        %{mintAccounts: mints, includeOffChain: true, disableCache: false}
      )

    res
  end
end
