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
          statsV2 { # TensorSwap + HadeSwap + Elixir
            buyNowPrice
            buyNowPriceNetFees
            sellNowPrice
            sellNowPriceNetFees
            floor1h
            floor24h
            floor7d
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
      |> parse_tensor_response(slug)
      |> parse_floor_response
    end)
    |> Enum.map(fn
      :error -> []
      responses -> Map.to_list(responses)
    end)
    |> List.flatten()
    |> Map.new()
  end

  def get_sell_tx(seller, mint) do
    url = "https://api.tensor.so/graphql"

    query = """
    query Mint($mint: String!, $sortBy: OrderSortBy, $limit: Int) {
      mint(mint: $mint) {
        slug
        tswapOrders(sortBy: $sortBy, limit: $limit) {
          address
          ownerAddress
          buyNowPrice
          sellNowPrice # Pass this to tswapSellNftTx!
          sellNowPriceNetFees
          feeInfos {
            bps
            kind
          }
        }
        hswapOrders {
          address
          baseSpotPrice
          buyOrdersQuantity
          curveType
          delta
          feeBps
          mathCounter
          pairType
        }
        collection {
         sellRoyaltyFeeBPS
        }
      }
    }
    """

    post_data =
      %{
        query: query,
        variables: %{
          mint: mint,
          sortBy: "SellNowPriceDesc",
          limit: 1
        }
      }
      |> Jason.encode!()

    Logger.debug("Making graphql query to #{url}")

    request =
      Finch.build(
        :post,
        url,
        [
          {"content-type", "application/json"},
          {"X-TENSOR-API-KEY", "b571603c-f1e3-40c8-8f09-61e192481e89"}
        ],
        post_data
      )

    Finch.request(request, SharkAttackWeb.Finch)
    |> parse_tensor_response(mint)
    |> parse_mint_response(mint, seller)
  end

  def get_buy_tx(buyer, mint) do
    url = "https://api.tensor.so/graphql"

    info = get_listing_info(mint)
    Logger.debug("Info: #{inspect(info)}")

    query = get_buy_query(info[:platform])

    # if the platform is MAGICEDEN_V2, we need to exclude the fees
    amount = if info[:platform] == "MAGICEDEN_V2" do
      info[:price]
    else
      info[:price] + info[:fees]
    end

    post_data =
      %{
        query: query,
        variables: %{
          mint: mint,
          buyer: buyer,
          seller: info[:owner],
          price: amount |> Integer.to_string()
        }
      }
      |> Jason.encode!()

    Logger.debug("Making graphql query to #{url}")

    request =
      Finch.build(
        :post,
        url,
        [
          {"content-type", "application/json"},
          {"X-TENSOR-API-KEY", "b571603c-f1e3-40c8-8f09-61e192481e89"}
        ],
        post_data
      )

    Finch.request(request, SharkAttackWeb.Finch)
    |> parse_tensor_response(mint)
    |> parse_tx_response
  end

  defp get_buy_query("MAGICEDEN_V2") do
    """
    query MeBuyNftTx($buyer: String!, $mint: String!, $price: Decimal!, $seller: String!) {
      meBuyNftTx(buyer: $buyer, mint: $mint, priceLamports: $price, seller: $seller) {
        txs {
          lastValidBlockHeight
          tx
          txV0
        }
      }
    }
    """
  end

  defp get_buy_query("TENSORSWAP") do
    """
    query TswapBuySingleListingTx($buyer: String!, $mint: String!, $price: Decimal!, $seller: String!) {
      tswapBuySingleListingTx(buyer: $buyer, maxPrice: $price, mint: $mint, owner: $seller) {
        txs {
          lastValidBlockHeight
          tx
          txV0
        }
      }
    }
    """
  end

  def get_listing_info(mint) do
    url = "https://api.tensor.so/graphql"

    query = """
    query Mint($mint: String!) {
      mint(mint: $mint) {
          activeListings {
            tx {
              source
              grossAmount
            }
          }
          owner
          name
          slug
          sellRoyaltyFeeBPS
          tswapOrders {
            address
            buyNowPrice
            nftsForSale {
              onchainId
            }
          }
        }
        mpFees {
          makerFeeBps
          mp
          takerFeeBps
          takerRoyalties
        }
    }
    """

    post_data =
      %{
        query: query,
        variables: %{
          mint: mint,
        }
      }
      |> Jason.encode!()

    Logger.debug("Making graphql query to #{url}")

    request =
      Finch.build(
        :post,
        url,
        [
          {"content-type", "application/json"},
          {"X-TENSOR-API-KEY", "b571603c-f1e3-40c8-8f09-61e192481e89"}
        ],
        post_data
      )

    response = Finch.request(request, SharkAttackWeb.Finch)
    |> parse_tensor_response(mint)
    {:ok, price, fees} = SharkAttack.PriceCalculator.compute_mint_buy_price(response, mint)

    %{
      price: price,
      fees: fees,
      owner: response["data"]["mint"]["owner"],
      platform: get_listing_platform(response),
    }
  end

  defp get_tswap_sell_tx(mint, seller, best_tensor_order) do
    url = "https://api.tensor.so/graphql"

    query = """
        query TswapSellNftTx(
      $minPriceLamports: Decimal!
      $mint: String!
      $pool: String!
      $seller: String!
    ) {
      tswapSellNftTx(
        minPriceLamports: $minPriceLamports
        mint: $mint
        pool: $pool
        seller: $seller
      ) {
        txs {
          lastValidBlockHeight
          tx
          txV0 # If this is present, use this!
        }
      }
    }
    """

    post_data =
      %{
        query: query,
        variables: %{
          mint: mint,
          pool: best_tensor_order[:best_order]["address"],
          seller: seller,
          minPriceLamports: best_tensor_order[:final_price] |> Integer.to_string()
        }
      }
      |> Jason.encode!()

    Logger.debug("Making graphql query to #{url} to build tswapSellNftTx")

    request =
      Finch.build(
        :post,
        url,
        [
          {"content-type", "application/json"},
          {"X-TENSOR-API-KEY", "b571603c-f1e3-40c8-8f09-61e192481e89"}
        ],
        post_data
      )

    Finch.request(request, SharkAttackWeb.Finch)
    |> parse_tensor_response(best_tensor_order)
    |> parse_tx_response
  end

  defp get_hswap_sell_tx(mint, seller, best_hswap_order) do
    url = "https://api.tensor.so/graphql"

    query = """
    query HswapSellNftTx(
        $mathCounter: Float!,
        $minPriceLamports: Decimal!,
        $mint: String!,
        $pair: String!,
        $seller: String!
      ) {
      hswapSellNftTx(
          mathCounter: $mathCounter,
          minPriceLamports: $minPriceLamports,
          mint: $mint,
          pair: $pair,
          seller: $seller
      ) {
          txs {
              lastValidBlockHeight
              tx
              txV0
          }
        }
      }
    """

    post_data =
      %{
        query: query,
        variables: %{
          mint: mint,
          pair: best_hswap_order[:best_order]["address"],
          seller: seller,
          minPriceLamports: best_hswap_order[:final_price] |> Integer.to_string(),
          mathCounter: best_hswap_order[:best_order]["mathCounter"]
        }
      }
      |> Jason.encode!()

    Logger.debug("Making graphql query to #{url}")

    request =
      Finch.build(
        :post,
        url,
        [
          {"content-type", "application/json"},
          {"X-TENSOR-API-KEY", "b571603c-f1e3-40c8-8f09-61e192481e89"}
        ],
        post_data
      )

    Finch.request(request, SharkAttackWeb.Finch)
    |> parse_tensor_response(best_hswap_order)
    |> parse_tx_response
  end

  def get_edit_pool_tx(price, pool) do
    url = "https://api.tensor.so/graphql"

    query = """
    query TswapEditPool($pool: String!, $attachDetachMargin: AttachDetachAction, $newConfig: PoolConfig) {
      tswapEditPoolTx(pool: $pool, attachDetachMargin: $attachDetachMargin, newConfig: $newConfig) {
       txs {
         lastValidBlockHeight
         tx
         txV0 # If this is present, use this!
       }
      }
    }
    """

    post_data =
      %{
        query: query,
        variables: %{
          owner: "BS61tv1KbsPhns3ppU8pmWozfReZjhxFL2MPhBdDWNEm",
          attachDetachMargin: "ATTACH",
          pool: pool,
          newConfig: %{
            curveType: "EXPONENTIAL",
            delta: "0",
            mmFeeBps: nil,
            mmCompoundFees: nil,
            poolType: "NFT",
            startingPrice: price
          }
        }
      }
      |> Jason.encode!()

    Logger.debug("Making graphql query to #{url}")

    request =
      Finch.build(
        :post,
        url,
        [
          {"content-type", "application/json"},
          {"X-TENSOR-API-KEY", "b571603c-f1e3-40c8-8f09-61e192481e89"}
        ],
        post_data
      )

    Finch.request(request, SharkAttackWeb.Finch)
    |> parse_tensor_response(nil)
    |> parse_tx_response
  end

  def get_collection_bids() do
    url = "https://api.tensor.so/graphql"

    query = """
    query UserTensorBidsV2($owner: String!) {
      tswapMarginAccounts(owner: $owner) {
        balance
        currentActive
        address
        name
        poolsAttached
      }

      userTswapOrders(owner: $owner) {
        collName
        slug
        floorPrice
        pool {
          buyNowPrice
          address
          sellNowPrice
          mmFeeBps
          orderType
          delta
          poolType
          startingPrice
          curveType
        }
      }
    }
    """

    post_data =
      %{
        query: query,
        variables: %{
          owner: "BS61tv1KbsPhns3ppU8pmWozfReZjhxFL2MPhBdDWNEm"
        }
      }
      |> Jason.encode!()

    Logger.debug("Making graphql query to #{url}")

    request =
      Finch.build(
        :post,
        url,
        [
          {"content-type", "application/json"},
          {"X-TENSOR-API-KEY", "b571603c-f1e3-40c8-8f09-61e192481e89"}
        ],
        post_data
      )

    Finch.request(request, SharkAttackWeb.Finch)
    |> parse_tensor_response(nil)
  end

  defp parse_mint_response(response, mint, seller) do
    if response == :error do
      {:error, "Error fetching mint #{mint} from Tensor"}
    else
      info =
        case response["data"]["mint"] do
          nil ->
            {:error, "Mint #{mint} not found on Tensor"}

          info ->
            best_tswap_order = calculate_best_tswap_offer(info["tswapOrders"])

            best_hade_order =
              calculate_best_hade_offer(
                info["hswapOrders"],
                info["collection"]["sellRoyaltyFeeBPS"]
              )

            Logger.debug("best Hade order: #{inspect(best_hade_order)}")
            Logger.debug("best Tensor order: #{inspect(best_tswap_order)}")

            cond do
              best_tswap_order[:final_price] == 0 && best_hade_order[:final_price] == 0 ->
                {:error, "No offers found"}

              best_hade_order[:final_price] > best_tswap_order[:final_price] ->
                get_hswap_sell_tx(mint, seller, best_hade_order)

              best_tswap_order[:final_price] >= best_hade_order[:final_price] ->
                get_tswap_sell_tx(mint, seller, best_tswap_order)

              true ->
                {:error, "Something went wrong"}
            end
        end

      info
    end
  end

  defp parse_tx_response(response) do
    if response == :error do
      {:error, "Error fetching tx from Tensor"}
    else
      info =
        case Map.get(response, "data") do
          %{"tswapSellNftTx" => tswap_sell_nft_tx} ->
            tswap_sell_nft_tx

          %{"hswapSellNftTx" => hswap_sell_nft_tx} ->
            hswap_sell_nft_tx

          %{"tcompBidTx" => tcomp_bid_tx} ->
            tcomp_bid_tx

          %{"tswapEditPoolTx" => tswapEditPoolTx} ->
            tswapEditPoolTx

          %{"userTcompBids" => bids} ->
            bids

          %{"meBuyNftTx" => me_buy_nft_tx} ->
            me_buy_nft_tx

          %{"tswapBuySingleListingTx" => tswap_buy_single_listing_tx} ->
            tswap_buy_single_listing_tx

          _ ->
            {:error, "Unkown order type"}
        end

      info
    end
  end

  defp parse_floor_response(response) do
    project_stats =
      case response["data"]["allCollections"]["collections"] do
        nil -> []
        project_stats -> project_stats
      end

    project_stats
    |> Enum.map(fn %{
                     "slugMe" => slugMe,
                     "slug" => tensorSlug,
                     "statsV2" => stats
                   } ->
      case stats do
        nil ->
          {slugMe, %{stats: %{}, slug: tensorSlug}}

        _ ->
          {slugMe,
           %{
             stats: stats |> Map.put("floorPrice", stats["buyNowPrice"]),
             slug: tensorSlug
           }}
      end
    end)
    |> Map.new()
  end

  defp parse_tensor_response({:ok, %{status: 200, body: body}}, _info) do
    body |> Jason.decode!()
  end

  defp parse_tensor_response({:ok, %{status: 503, body: _body}}, info) do
    Logger.warning("Error calling Tensor: 503 Service Unavailable, #{info}")

    :error
  end

  defp parse_tensor_response({:ok, %{status: 520, body: _body}}, info) do
    Logger.warning("Error calling Tensor: 520 Service Unavailable, #{info}")

    :error
  end

  defp parse_tensor_response({:ok, %{status: 400, body: body}}, _info) do
    Logger.warning("Error calling Tensor: 400 Service Unavailable, #{body}")

    :error
  end

  defp parse_tensor_response({:ok, %{body: body}}, info) do
    Logger.warning("Error calling Tensor - #{info}")

    IO.inspect(body)

    :error
  end

  defp parse_tensor_response({:error, %Mint.TransportError{reason: reason}}, info) do
    Logger.warning("Error calling Tensor: #{reason}, #{info}")

    :error
  end

  defp parse_tensor_response({:error, _}, _) do
    Logger.warning("Error calling Tensor")

    :error
  end

  defp calculate_best_tswap_offer(orders) do
    if orders == [] or orders == nil do
      Logger.debug("No TensorSwap orders found")
      %{final_price: 0, best_order: nil}
    else
      best_order = hd(orders)

      %{
        final_price: best_order["sellNowPriceNetFees"] |> String.to_integer(),
        best_order: best_order
      }
    end
  end

  defp calculate_best_hade_offer(orders, royalties) do
    Logger.debug("Calculating best Hade offer from #{inspect(orders)}")
    # calculate the order with the best price
    if orders == [] or orders == nil do
      Logger.debug("No Hade orders found")
      %{final_price: 0, best_order: nil}
    else
      best_order =
        Enum.reduce(orders, hd(orders), fn order, best_order ->
          if SharkAttack.PriceCalculator.calculate_next_spot_price(
               "Sell",
               order["baseSpotPrice"],
               order["delta"],
               order["curveType"],
               order["mathCounter"]
             ) >
               SharkAttack.PriceCalculator.calculate_next_spot_price(
                 "Sell",
                 best_order["baseSpotPrice"],
                 best_order["delta"],
                 best_order["curveType"],
                 best_order["mathCounter"]
               ) do
            order
          else
            best_order
          end
        end)

      Logger.debug("Best Hade order: #{inspect(best_order)}")

      best_price =
        SharkAttack.PriceCalculator.calculate_next_spot_price(
          "Sell",
          best_order["baseSpotPrice"],
          best_order["delta"],
          best_order["curveType"],
          best_order["mathCounter"]
        )

      fees = (royalties || 0) / 10_000 - (best_order["feeBps"] || 0) / 10_000
      final_price = floor(best_price * (1 - fees))
      %{final_price: final_price, best_order: best_order}
    end
  end

  def get_trading_history(slug, count_back \\ 60) do
    unix_now = :os.system_time(:seconds)

    url =
      "https://api-tradingview.tensor.so/tv/history?symbol=#{slug}/SOL&resolution=1D&from=1&to=#{unix_now}&countback=#{count_back}"

    SharkAttack.Helpers.do_get_request(url, [
      {"content-type", "application/json"},
      {"X-TENSOR-API-KEY", "e7b23445-cb60-4faa-8939-d3c571cd2fd7"}
    ])
    |> Map.drop(["s"])
  end

  defp get_listing_platform(response) do
    response
    |> Map.get("data")
    |> Map.get("mint")
    |> Map.get("activeListings")
    |> List.first()
    |> case do
      nil -> nil
      listing -> Map.get(listing["tx"], "source")
  end
  end
end

# To test in interactive shell run:
# iex -S mix
# SharkAttack.Tensor.get_floor_prices([%{me_slug: "degenfatcats"}])
# SharkAttack.Tensor.get_listing_info("BE4te4e7Uuzb7ik9j9XAqay7PeJXKbQVcWqGvmQzTwWq")