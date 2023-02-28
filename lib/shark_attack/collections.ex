defmodule SharkAttack.Collections do
  alias SharkAttack.Repo
  import Ecto.Query
  alias SharkAttack.Collections.Collection
  alias SharkAttack.Collections.Nft

  def list_collections() do
    Repo.all(Collection)
  end

  def get_collection_by_address(address) do
    Repo.get_by(Collection, address: address)
  end

  def get_and_update_collection(%{name: name} = attrs) do
    collection = get_collection_by_name(name)

    if is_nil(collection) do
      create_collection(attrs)
    else
      update_collection(collection, attrs)
    end
  end

  def search_collection_by_name(name) do
    query = from c in Collection, where: like(c.name, ^"%#{name}%")

    Repo.all(query)
  end

  def get_collection_by_name(nil) do
    nil
  end

  def get_collection_by_name(name) do
    Repo.get_by(Collection, name: name)
  end

  def get_collection_mint_lists(mintLists) do
    # mintLists = SharkAttack.SharkyApi.get_mint_lists()

    mintLists
    |> Enum.map(fn mintList ->
      case get_collection_by_name(mintList["collectionName"]) do
        nil ->
          nil

        collection ->
          insert_nfts(collection.id, mintList["mints"])
      end
    end)
  end

  def update_collection(%Collection{} = collection, attrs) do
    collection
    |> Collection.changeset(attrs)
    |> Repo.update()
  end

  def update_rain_fi_collection_list() do
    collections = SharkAttack.Helpers.do_get_request("https://api.rain.fi/collections/all")

    Enum.map(collections, fn c ->
      data = %{
        name: c["collection_name"],
        logo: c["image"],
        rain_fi_id: c["collection_id"]
      }

      SharkAttack.Collections.get_and_update_collection(data)
    end)
  end

  def update_citrus_collection_list() do
    collections =
      SharkAttack.Helpers.do_get_request("https://citrus.famousfoxes.com/citrus/allCollections")

    Enum.map(collections, fn c ->
      data = %{
        name: c["name"],
        foxy_address: c["id"]
      }

      SharkAttack.Collections.get_and_update_collection(data)
    end)
  end

  def update_sharky_collection_list() do
    collections = SharkAttack.SharkyApi.get_raw_order_books()

    Enum.map(collections, fn collection ->
      data = %{
        name: collection["name"],
        sharky_address: collection["pubkey"]
      }

      create_collection(data)
    end)
  end

  def create_collection(attrs \\ %{}) do
    %Collection{}
    |> Collection.changeset(attrs)
    |> Repo.insert(on_conflict: :nothing)
  end

  def insert_nfts(_collection_id, nil) do
    nil
  end

  def insert_nfts(collection_id, nfts) do
    Enum.each(
      nfts,
      &(%SharkAttack.Collections.Nft{
          collection_id: collection_id,
          mint: &1
        }
        |> Repo.insert(on_conflict: :nothing))
    )
  end
end
