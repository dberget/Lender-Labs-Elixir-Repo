defmodule SharkAttack.Tensor do
  require Logger

  def get_floor_prices([]), do: []

  def get_floor_prices(tokens) do
    slugs =
      tokens
      |> Enum.reject(&is_nil(&1.me_slug))
      |> Enum.map(& &1.me_slug)
      |> Enum.chunk_every(30)

    url = "https://api.tensor.so/graphql"

    query = """
    query CollectionsStats(
      $slugs: [String!],
      $slugsMe: [String!],
      $slugsDisplay: [String!],
      $ids: [String!],
      $sortBy: String,
      $page: Int,
      $limit: Int,
    ) {
      allCollections(
        slugs: $slugs,
        slugsMe: $slugsMe,
        slugsDisplay: $slugsDisplay,
        ids: $ids,
        sortBy: $sortBy,
        page: $page,
        limit: $limit
      ) {
        total
        collections {
          id # Used to find corresponding whitelist PDA (`uuid`) if using SDK
          slug # internal ID for collection (UUID or human-readable)
          slugMe # MagicEden's symbol
          slugDisplay # What's displayed in the URL on tensor.trade
          statsSwap { # TensorSwap + HadeSwap + Elixir
            sellNowPrice
          }
          statsOverall { # Across pools & marketplace listings
            floor1h
            floor7d
            floorPrice
            numListed
            sales1h
            sales24h
            sales7d
            volume1h
            volume24h
            volume7d
          }
          name
        }
      }
    }
    """

    Enum.map(slugs, fn slug ->
      post_data =
        %{
          query: query,
          variables: %{slugsMe: slug}
        }
        |> Jason.encode!()

      Logger.debug("Making graphql query to #{url}")

      request =
        Finch.build(
          :post,
          url,
          [
            {"content-type", "application/json"},
            {"X-TENSOR-API-KEY", "e7b23445-cb60-4faa-8939-d3c571cd2fd7"}
          ],
          post_data
        )

      Process.sleep(1500)

      Finch.request(request, SharkAttackWeb.Finch)
      |> parse_floor_response(slug)
    end)
    |> Enum.map(fn
      :error -> []
      responses -> Map.to_list(responses)
    end)
    |> List.flatten()
    |> Map.new()
  end

  defp parse_floor_response({:ok, %{status: 200, body: body}}, _slug) do
    response = body |> Jason.decode!()

    project_stats =
      case response["data"]["allCollections"]["collections"] do
        nil -> []
        project_stats -> project_stats
      end

    project_stats
    |> Enum.map(fn %{
                     "slugMe" => slugMe,
                     "slug" => tensorSlug,
                     "statsOverall" => stats,
                     "statsSwap" => prices
                   } ->
      case stats do
        nil ->
          {slugMe, %{stats: %{}, slug: tensorSlug}}

        _ ->
          {slugMe,
           %{stats: stats |> Map.put("sellPrice", prices["sellNowPrice"]), slug: tensorSlug}}
      end
    end)
    |> Map.new()
  end

  defp parse_floor_response({:ok, %{status: 503, body: _body}}, slug) do
    Logger.warn("Error calling solanalysis: 503 Service Unavailable, #{slug}")

    :error
  end

  defp parse_floor_response({:ok, %{body: body}}, slug) do
    Logger.warn("Error calling Tensor - #{slug}")
    IO.inspect(body)

    :error
  end

  defp parse_floor_response({:error, %Mint.TransportError{reason: reason}}, slug) do
    Logger.warn("Error calling Tensor: #{reason}, #{slug}")

    :error
  end

  defp parse_floor_response({:error, _}, _) do
    Logger.warn("Error calling Tensor")

    :error
  end
end
