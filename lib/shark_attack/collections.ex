defmodule SharkAttack.Collections do
  alias SharkAttack.Repo
  alias SharkAttack.Loans.Collection

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

  def get_collection_by_name(name) do
    Repo.get_by(Collection, name: name)
  end

  def update_collection(%Collection{} = collection, attrs) do
    collection
    |> Collection.changeset(attrs)
    |> Repo.update()
  end

  def update_collection_list() do
    collections = SharkAttack.SharkyApi.get_raw_order_books()

    Enum.map(collections, fn collection ->
      data = %{
        name: collection["name"],
        sharky_address: collection["pubkey"],
        duration: collection["duration"],
        apy: collection["apy"]
      }

      create_collection(data)
    end)
  end

  def create_collection(attrs \\ %{}) do
    %Collection{}
    |> Collection.changeset(attrs)
    |> Repo.insert()
  end
end
