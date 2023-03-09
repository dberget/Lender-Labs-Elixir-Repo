defmodule SharkAttack.Collections do
  alias SharkAttack.Repo
  import Ecto.Query
  alias SharkAttack.Collections.Collection
  alias SharkAttack.Collections.Nft
  require Logger

  def list_collections() do
    Repo.all(Collection)
  end

  def list_collections(%{sharky: "1"}) do
    query = from c in Collection, where: not is_nil(c.sharky_address)

    Repo.all(query)
  end

  def list_collections(_opts) do
    Repo.all(Collection)
  end

  def get_collections_from_mint_list(mint_list) do
    query =
      from c in Collection,
        join: n in Nft,
        on: c.id == n.collection_id,
        where: n.mint in ^mint_list,
        preload: [nfts: n]

    Repo.all(query)
  end

  def get_collection(id) when is_integer(id) do
    Repo.get(Collection, id)
  end

  def get_collection(address) do
    query =
      from c in Collection,
        select: %{c | nfts: []},
        where: c.sharky_address == ^address,
        or_where: c.foxy_address == ^address,
        or_where: c.frakt_address == ^address

    Repo.one(query)
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
    query =
      from c in Collection,
        select: map(c, [:name, :sharky_address]),
        where: like(c.name, ^"%#{name}%")

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
        sharky_address: collection["pubkey"],
        duration: collection["duration"],
        apy: collection["apy"]
      }

      SharkAttack.Collections.get_and_update_collection(data)
    end)
  end

  def create_collection(attrs \\ %{}) do
    %Collection{}
    |> Collection.changeset(attrs)
    |> Repo.insert(on_conflict: {:replace, [:apy, :duration]})
  end

  def update_logos() do
    all_collections = list_collections(%{sharky: "1"})

    all_collections
    |> SharkAttack.Hyperspace.get_floor_prices()
    |> Enum.each(fn {collection, %{img_url: img_url}} ->
      all_collections
      |> Enum.filter(&(&1.hyperspace_id == collection))
      |> Enum.each(fn token ->
        SharkAttack.Collections.update_collection(token, %{
          logo: img_url
        })
      end)
    end)
  end

  def update_hyperspace_ids do
    collections =
      SharkAttack.Collections.list_collections()
      |> Enum.filter(&(&1.hyperspace_id == nil))

    collections
    |> Enum.each(fn c ->
      format_name = String.replace(c.name, " ", "") |> String.downcase()

      info = SharkAttack.Hyperspace.get_collection_info(format_name)

      update_hyperspace_id(c, info)
    end)
  end

  def update_hyperspace_id(c, []) do
    Logger.error(c.name)
  end

  def update_hyperspace_id(c, hyperspace) when length(hyperspace) > 1 do
    Logger.error(c.name)
  end

  def update_hyperspace_id(collection, [%{"project" => hyperspace_info}]) do
    SharkAttack.Collections.update_collection(collection, %{
      hyperspace_id: Map.get(hyperspace_info, "project_id"),
      logo: Map.get(hyperspace_info, "img_url")
    })
  end

  def insert_nfts(_collection_id, nil) do
    nil
  end

  def insert_nfts(collection_id, nfts) do
    Enum.each(
      nfts,
      &(%Nft{
          collection_id: collection_id,
          mint: &1
        }
        |> Repo.insert(on_conflict: :nothing))
    )
  end
end
