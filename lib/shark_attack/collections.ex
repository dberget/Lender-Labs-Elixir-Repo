defmodule SharkAttack.Collections do
  alias SharkAttack.Repo
  import Ecto.Query
  alias SharkAttack.Collections.Collection
  alias SharkAttack.Collections.Nft
  alias SharkAttack.Loans.Loan
  require Logger

  def list_collections() do
    query = from(c in Collection, where: c.hide == false)

    Repo.all(query)
  end

  def get_collection_advanced_stats() do
    query =
      from(l in Loan,
        join: c in Collection,
        on: c.sharky_address == l.orderBook,
        where: l.platform == "sharky" and l.status == "complete",
        group_by: c.id,
        select: %{
          collection_id: c.id,
          ratio: coalesce(count(l.forecloseTxId) / count("*"), 0),
          avg_repayment_time:
            avg(fragment("TIMESTAMPDIFF(HOUR, ?, ?)", l.dateTaken, l.dateRepaid))
        }
      )

    Repo.all(query)
  end

  def update_me_data() do
    collections =
      list_collections()
      |> Enum.filter(&is_nil(&1.logo))

    collections
    |> Enum.take(5)
    |> Enum.map(fn c ->
      nft = SharkAttack.Nfts.get_collection_nfts(c.id) |> List.first()

      query = """
      query Mints($tokenMints: [String!]!) {
        mints(tokenMints: $tokenMints) {
          collection {
            slugMe
            imageUri
          }
        }
      }
      """

      post_data =
        %{
          query: query,
          variables: %{tokenMints: [nft.mint]}
        }
        |> Jason.encode!()

      slug =
        Finch.build(
          :post,
          "https://api.tensor.so/graphql",
          [
            {"content-type", "application/json"},
            {"X-TENSOR-API-KEY", "e7b23445-cb60-4faa-8939-d3c571cd2fd7"}
          ],
          post_data
        )
        |> Finch.request(SharkAttackWeb.Finch)
        |> parse_res()

      collection =
        Map.get(slug, "data", %{})
        |> Map.get("mints", [])
        |> List.first()
        |> Map.get("collection", nil)

      update_collection(c, %{
        me_slug: Map.get(collection, "slugMe", nil),
        logo: Map.get(collection, "imageUri", nil)
      })
    end)
  end

  def parse_res({:ok, %{status: 200, body: body}}) do
    body |> Jason.decode!()
  end

  def read_json_file(file_path) do
    case File.read(file_path) do
      {:ok, contents} ->
        case Jason.decode!(contents) do
          {:error, _} ->
            raise "Failed to decode JSON in file: #{file_path}"

          json ->
            json
        end

      {:error, _} ->
        raise "Failed to read file: #{file_path}"
    end
  end

  def list_collections(%{sharky: "1"}) do
    query = from(c in Collection, where: not is_nil(c.sharky_address) and c.hide == false)

    Repo.all(query)
  end

  def list_collections(_opts) do
    query = from(c in Collection, where: c.hide == false)
    Repo.all(query)
  end

  def get_collections_from_mint_list(mint_list) do
    query =
      from(c in Collection,
        join: n in Nft,
        on: c.id == n.collection_id,
        where: n.mint in ^mint_list,
        preload: [nfts: n]
      )

    Repo.all(query)
  end

  def get_collection_from_mint(mint) do
    query =
      from(c in Collection,
        join: n in Nft,
        on: c.id == n.collection_id,
        where: n.mint == ^mint
      )

    Repo.one(query)
  end

  def get_collection(id) when is_integer(id) do
    Repo.get(Collection, id)
  end

  def get_collection(address) do
    query =
      from(c in Collection,
        select: %{c | nfts: []},
        where: c.sharky_address == ^address,
        or_where: c.foxy_address == ^address,
        or_where: c.frakt_address == ^address
      )

    case Repo.one(query) do
      nil ->
        case Integer.parse(address) do
          {id, _} ->
            get_collection(id)

          :error ->
            nil
        end

      collection ->
        collection
    end
  end

  def get_collection(address, :nfts) do
    query =
      from(c in Collection,
        where: c.sharky_address == ^address,
        or_where: c.foxy_address == ^address,
        or_where: c.frakt_address == ^address
      )

    case Repo.one(query) do
      nil ->
        Repo.get(Collection, address)

      collection ->
        collection
    end
    |> Repo.preload(:nfts)
  end

  def insert_new_collection(%{sharky_address: pubkey} = attrs) do
    collection = get_collection(pubkey)

    if is_nil(collection) do
      create_collection(attrs)
    end
  end

  def get_and_update_collection(%{sharky_address: pubkey} = attrs) do
    collection = get_collection(pubkey)

    if is_nil(collection) do
      IO.inspect("Creating collection #{attrs.name}")

      create_collection(attrs)
    else
      update =
        cond do
          collection.name != attrs.name ->
            true

          collection.duration != attrs.duration ->
            true

          collection.apy != attrs.apy ->
            true

          true ->
            false
        end

      if update do
        collection = %Collection{id: collection.id}

        update_collection(collection, attrs)
      end
    end
  end

  def get_and_update_collection(%{foxy_address: pubkey} = attrs) do
    collection = get_collection(pubkey)

    collection = if !is_nil(collection), do: collection, else: get_collection_by_name(attrs.name)

    if !is_nil(collection) do
      update_collection(%Collection{id: collection.id}, attrs)
    end
  end

  def get_and_update_collection(%{name: name} = attrs) do
    collection = get_collection_by_name(name)

    if is_nil(collection) do
      IO.inspect("No matching collection found - #{name}")
    else
      collection = %Collection{id: collection.id}

      update_collection(collection, attrs)
    end
  end

  def search_collection_by_name(name) do
    query =
      from(c in Collection,
        select: map(c, [:name, :sharky_address, :id, :foxy_address, :rain_fi_id]),
        where: like(c.name, ^"%#{name}%")
      )

    Repo.all(query)
  end

  def get_collection_by_name(nil) do
    nil
  end

  def get_collection_by_name(name) do
    Repo.get_by(Collection, name: name)
  end

  def update_collection_mint_list(sharky_address) do
    case get_collection(sharky_address, :nfts) do
      nil ->
        Logger.info("Unable to find collection for #{sharky_address}")
        nil

      collection ->
        Logger.info("Checking #{collection.name}")

        collection = collection |> Repo.preload(:nfts)

        if length(collection.nfts) == 0 do
          mintList = SharkAttack.SharkyApi.get_mint_lists(sharky_address)

          Logger.info("Inserting #{collection.name}")

          insert_nfts(collection.id, mintList["mints"])
        end
    end
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
        rain_fi_id: c["collection_id"]
      }

      Logger.info("Adding #{c["collection_name"]}")
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

      Logger.info("Adding #{c["name"]}")

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

      :ok
    end)
  end

  def create_collection(attrs \\ %{}) do
    %Collection{}
    |> Collection.changeset(attrs)
    |> Repo.insert(on_conflict: :nothing)
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
    Logger.info("Updating #{collection.name}")

    SharkAttack.Collections.update_collection(collection, %{
      hyperspace_id: Map.get(hyperspace_info, "project_id"),
      logo: Map.get(hyperspace_info, "img_url")
    })
  end

  def insert_nfts(_collection_id, nil) do
    nil
  end

  def insert_nfts(collection_id, nfts) do
    current_timestamp = NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second)

    nfts =
      Enum.map(
        nfts,
        &%{
          collection_id: collection_id,
          mint: &1,
          inserted_at: current_timestamp,
          updated_at: current_timestamp
        }
      )

    Repo.insert_all(Nft, nfts)
  end

  def get_collection_from_loan(orderbook) when is_binary(orderbook) do
    case SharkAttack.SimpleCache.get(__MODULE__, :get_collection, [orderbook], ttl: 60 * 60 * 24) do
      nil -> %{}
      collection -> collection
    end
  end

  def get_collection_from_loan(loan) do
    get_collection_from_loan(loan["orderBook"])
  end
end
