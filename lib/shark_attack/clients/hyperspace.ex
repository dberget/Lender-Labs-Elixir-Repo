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

  def get_marketplace_snapshot(
        sid,
        page_size \\ 1
      ) do
    url = "https://beta.api.hyperspace.xyz/graphql"

    query = """
    query GetMarketPlaceSnapshots($condition: GetMarketPlaceSnapshotCondition, $pagination_info: PaginationConfig, $order_by: [OrderConfig!]) {
      getMarketPlaceSnapshots(
        condition: $condition
        pagination_info: $pagination_info
        order_by: $order_by
      ) {
        market_place_snapshots {
          token_address
          lowest_listing_mpa {
            price
            marketplace_instance_id
            marketplace_program_id
          }
        }
      }
    }
    """

    post_data =
      %{
        query: query,
        variables: %{
          condition: %{
            has_metadata: true,
            project_ids: [
              %{
                project_id: sid
              }
            ]
          },
          order_by: %{
            field_name: "lowest_listing_price",
            sort_order: "ASC"
          },
          pagination_info: %{
            page_number: 1,
            page_size: page_size
          }
        }
      }
      |> Jason.encode!()

    Logger.debug("Making graphql query for floor item to #{url}")

    request = Finch.build(:post, url, [{"Content-Type", "application/json"}], post_data)

    Finch.request(request, SharkAttackWeb.Finch)
  end

  def get_marketplace_arb(nil), do: nil

  def get_marketplace_arb(sid) do
    arb =
      sid
      |> get_marketplace_snapshot(20)
      |> parse_arb_response()

    %{
      id: sid,
      arb: arb
    }
  end

  def get_floor_item(sid) do
    sid
    |> get_marketplace_snapshot()
    |> parse_floor_item_response()
  end

  defp parse_floor_item_response({:ok, %{status: 200, body: body}}) do
    with response <- body |> Jason.decode!(),
         %{"data" => %{"getMarketPlaceSnapshots" => %{"market_place_snapshots" => [mp_snapshot]}}} <-
           response,
         %{
           "token_address" => token_address,
           "lowest_listing_mpa" => %{
             "marketplace_instance_id" => marketplace_instance_id,
             "marketplace_program_id" => marketplace_program_id
           }
         } <- mp_snapshot do
      marketplace_id =
        case marketplace_instance_id do
          nil -> marketplace_program_id
          _ -> marketplace_instance_id
        end

      %{"marketplace_id" => marketplace_id, "token_address" => token_address}
    else
      %{"data" => %{"getMarketPlaceSnapshots" => %{"market_place_snapshots" => []}}} ->
        {:error, "marketplace not found"}
    end
  end

  defp parse_floor_item_response({:error, %Mint.TransportError{reason: :closed}}) do
    {:error, "HTTP Connection Closed. Please try again."}
  end

  defp parse_arb_response({:ok, %{status: 200, body: body}}) do
    response = body |> Jason.decode!()

    process_for_arb(response)
  end

  defp process_for_arb(%{
         "data" => %{"getMarketPlaceSnapshots" => %{"market_place_snapshots" => []}}
       }),
       do: nil

  defp process_for_arb(%{"data" => nil}), do: nil

  defp process_for_arb(%{
         "data" => %{"getMarketPlaceSnapshots" => %{"market_place_snapshots" => nil}}
       }),
       do: nil

  defp process_for_arb(%{
         "data" => %{"getMarketPlaceSnapshots" => %{"market_place_snapshots" => mp_snapshots}}
       }) do
    floor = hd(mp_snapshots)

    me_floor =
      Enum.find(
        mp_snapshots,
        &(get_in(&1, ["lowest_listing_mpa", "marketplace_instance_id"]) ==
            @magic_eden_instance_id ||
            get_in(&1, ["lowest_listing_mpa", "marketplace_program_id"]) ==
              @magic_eden_program_id)
      )

    is_magic_eden_or_nil =
      get_in(floor, ["token_address"]) === get_in(me_floor, ["token_address"]) ||
        is_nil(floor["lowest_listing_mpa"])

    case is_magic_eden_or_nil do
      true ->
        nil

      _ ->
        lowest_price = get_in(floor, ["lowest_listing_mpa", "price"]) || 0
        me_price = get_in(me_floor, ["lowest_listing_mpa", "price"]) || 0

        %{
          "profit" => me_price - lowest_price,
          "floor_price" => lowest_price,
          "me_floor_price" => me_price,
          "token_address" => get_in(floor, ["token_address"])
        }
    end
  end

  # def get_top_projets() do
  #   url = "https://beta.api.solanalysis.com/graphql"

  #   query = """
  #   query GetProjectStats($orderBy: [OrderConfig!], $paginationInfo: PaginationConfig, $conditions: GetProjectStatsCondition) {
  #     getProjectStats(
  #       order_by: $orderBy
  #       pagination_info: $paginationInfo
  #       conditions: $conditions
  #     ) {
  #       project_stats {
  #         project_id
  #         volume_1day_change
  #         floor_price
  #         floor_price_1day_change
  #         average_price
  #         volume_1day
  #       }
  #       pagination_info {
  #         current_page_number
  #         current_page_size
  #         has_next_page
  #       }
  #     }
  #   }
  #   """

  #   post_data =
  #     %{
  #       query: query,
  #       variables: %{
  #         conditions: %{},
  #         order_by: [
  #           %{
  #             field_name: "volume_1day",
  #             sort_order: "DESC"
  #           }
  #         ],
  #         pagination_info: %{
  #           page_number: 1,
  #           page_size: 50
  #         }
  #       }
  #     }
  #     |> Jason.encode!()

  #   Logger.debug("Making graphql query for top projects to #{url}")

  #   request = Finch.build(:post, url, [{"Content-Type", "application/json"}], post_data)

  #   Finch.request(request, Albatross.Finch)
  #   |> parse_response()
  # # end

  # defp parse_response({:ok, %{status: 200, body: body}}) do
  #   body
  #   |> Jason.decode!()
  #   |> get_in(["data", "getProjectStats", "project_stats"])
  #   |> Enum.map(&get_in(&1, ["project_id"]))
  # end
end
