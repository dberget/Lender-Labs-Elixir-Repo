defmodule SharkAttack.Hyperspace do
  require Logger

  @magic_eden_instance_id "E8cU1WiRWjanGxmn96ewBgk9vPTcL6AEZ1t6F6fkgUWe"
  @magic_eden_program_id "M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K"

  def get_floor_prices([]), do: []

  def get_floor_prices(tokens) do
    solanalysis_ids =
      tokens
      |> Enum.reject(&is_nil(&1.hyperspace_id))
      |> Enum.map(& &1.hyperspace_id)
      |> Enum.chunk_every(5)

    url = "https://beta.api.hyperspace.xyz/graphql"

    query = """
    query getProjectAttributesQuery($conditions: GetProjectStatsCondition, $orderBy: [OrderConfig!], $paginationInfo: PaginationConfig) {
      getProjectStats(conditions: $conditions, order_by: $orderBy, pagination_info: $paginationInfo) {
        project_stats {
          project_id
          floor_price
          project {
            img_url
          }
        }
      }
    }
    """

    Enum.map(solanalysis_ids, fn ids ->
      post_data =
        %{
          query: query,
          variables: %{conditions: %{project_ids: ids}}
        }
        |> Jason.encode!()

      Logger.debug("Making graphql query to #{url}")

      request = Finch.build(:post, url, [{"Content-Type", "application/json"}], post_data)

      Finch.request(request, SharkAttackWeb.Finch)
      |> parse_floor_response()
    end)
    |> Enum.map(fn
      :error -> []
      responses -> Map.to_list(responses)
    end)
    |> List.flatten()
    |> Map.new()
  end

  defp parse_floor_response({:ok, %{status: 200, body: body}}) do
    response = body |> Jason.decode!()

    %{"data" => %{"getProjectStats" => %{"project_stats" => project_stats}}} = response

    project_stats
    |> Enum.map(fn %{
                     "project_id" => project_id,
                     "floor_price" => fp,
                     "project" => %{"img_url" => img_url}
                   } ->
      {project_id, %{fp: fp, img_url: img_url}}
    end)
    |> Map.new()
  end

  defp parse_floor_response({:ok, %{status: 503, body: _body}}) do
    Logger.warn("Error calling solanalysis: 503 Service Unavailable")

    :error
  end

  defp parse_floor_response({:ok, %{body: body}}) do
    Logger.warn("Error calling solanalysis")
    IO.inspect(body)

    :error
  end

  defp parse_floor_response({:error, %Mint.TransportError{reason: reason}}) do
    Logger.warn("Error calling solanalysis: #{reason}")

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
    Logger.warn("Error calling solanalysis")
    IO.inspect(body)

    :error
  end
end
