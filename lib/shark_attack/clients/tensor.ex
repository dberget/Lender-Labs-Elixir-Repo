defmodule SharkAttack.Tensor do
  require Logger

  @magic_eden_instance_id "E8cU1WiRWjanGxmn96ewBgk9vPTcL6AEZ1t6F6fkgUWe"
  @magic_eden_program_id "M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K"

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

    project_stats = get_in(response, ["data", "allCollections", "collections"])

    project_stats
    |> Enum.map(fn %{
                     "slugMe" => slugMe,
                     "slug" => tensorSlug,
                     "statsOverall" => stats,
                     "statsSwap" => prices
                   } ->
      {slugMe, %{stats: stats |> Map.put("sellPrice", prices["sellNowPrice"]), slug: tensorSlug}}
    end)
    |> Map.new()
  end

  defp parse_floor_response({:ok, %{status: 503, body: _body}}, slug) do
    Logger.warn("Error calling solanalysis: 503 Service Unavailable, #{slug}")

    :error
  end

  defp parse_floor_response({:ok, %{body: body}}, slug) do
    Logger.warn("Error calling solanalysis - #{slug}")
    IO.inspect(body)

    :error
  end

  defp parse_floor_response({:error, %Mint.TransportError{reason: reason}}, slug) do
    Logger.warn("Error calling solanalysis: #{reason}, #{slug}")

    :error
  end

  defp parse_floor_response({:error, _}, _) do
    Logger.warn("Error calling solanalysis")

    :error
  end

  def get_collection_info(name) do
    url = "https://beta.api.hyperspace.xyz/graphql"

    query = """
    query getProjectAttributesQuery($conditions: GetProjectStatsCondition, $orderBy: [OrderConfig!], $paginationInfo: PaginationConfig) {
      getProjectStats(
        conditions: $conditions
        order_by: $orderBy
        pagination_info: $paginationInfo
      ) {
        project_stats {
          project {
            project_id
            display_name
            twitter
            discord
            img_url
            website
          }
        }
        pagination_info {
          current_page_number
          current_page_size
          has_next_page
          total_page_number
          __typename
        }
        __typename
      }
    }
    """

    post_data =
      %{
        query: query,
        variables: %{
          conditions: %{
            project_ids: [
              name
            ]
          }
        }
      }
      |> Jason.encode!()

    Logger.debug("Making graphql query to get collection info - #{name}")

    request = Finch.build(:post, url, [{"Content-Type", "application/json"}], post_data)

    Finch.request(request, SharkAttackWeb.Finch) |> parse_info_response()
  end

  defp parse_info_response({:ok, %{status: 200, body: body}}) do
    response =
      body
      |> Jason.decode!()

    %{"data" => %{"getProjectStats" => %{"project_stats" => project_stats}}} = response

    project_stats
  end

  defp parse_info_response({:ok, %{status: 503, body: _body}}) do
    Logger.warn("Error calling solanalysis: 503 Service Unavailable")

    :error
  end

  defp parse_info_response({:ok, %{body: body}}) do
    Logger.warn("Error calling tensor")
    IO.inspect(body)

    :error
  end
end
