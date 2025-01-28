defmodule SharkAttack.Birdeye do
  @moduledoc """
  Client for fetching and analyzing comprehensive token overview data from Birdeye API.
  """

  use Tesla
  require Logger

  @api_key "909f47ea203046f18943bd6f878fe669"
  @base_url "https://public-api.birdeye.so"
  @cache_ttl :timer.minutes(1)

  plug Tesla.Middleware.BaseUrl, @base_url

  plug Tesla.Middleware.Headers, [
    {"x-api-key", @api_key},
    {"accept", "application/json"}
  ]

  plug Tesla.Middleware.JSON

  @type overview_data :: %{
          basic_info: map(),
          market_metrics: map(),
          social_info: map(),
          trading_metrics: map(),
          volume_analysis: map()
        }

  @doc """
  Fetches and analyzes comprehensive token overview data with caching.
  """
  def get_token_overview(token_address) do
    case SharkAttack.SimpleCache.get(__MODULE__, :fetch_and_cache_overview, [token_address],
           ttl: @cache_ttl
         ) do
      {:ok, _} = result -> result
      {:error, _} = error -> error
      nil -> nil
    end
  end

  @doc """
  Analyzes market health based on overview metrics.
  """
  def analyze_market(token_address) do
    with {:ok, overview} <- get_token_overview(token_address),
         {:ok, health} <- safely_calculate_market_health(overview),
         {:ok, patterns} <- analyze_trading_patterns(overview) do

      {:ok, %{health: health, overview: overview, patterns: patterns}}
    else
      {:error, reason} -> {:error, reason}
      info -> {:error, "Failed to analyze market health #{inspect(info)}"}
    end
  end

  def analyze_trading_patterns(overview) do
    {:ok, %{
      volume_trend: analyze_volume_trend(overview.trading_metrics),
      wallet_activity: analyze_wallet_trend(overview.trading_metrics),
      buy_sell_pattern: analyze_buy_sell_pattern(overview.volume_analysis),
      short_term_momentum: analyze_short_term_momentum(overview.market_metrics)
    }}
  end

  defp analyze_volume_trend(%{volume_24h: vol}) do
    cond do
      vol.change_percent >= 100 -> :explosive_growth
      vol.change_percent >= 50 -> :rapid_growth
      vol.change_percent >= 20 -> :moderate_growth
      vol.change_percent <= -30 -> :significant_decline
      vol.change_percent <= -10 -> :moderate_decline
      true -> :stable
    end
  end

  defp analyze_wallet_trend(%{unique_wallets: wallets}) do
    # Focus on 30m and 1h changes for quicker signals
    thirty_min_change = wallets["30m"].change_percent
    hour_change = wallets["1h"].change_percent

    cond do
      thirty_min_change >= 20 and hour_change >= 30 -> :viral_adoption
      thirty_min_change >= 10 and hour_change >= 20 -> :rapid_adoption
      thirty_min_change >= 5 -> :growing_interest
      thirty_min_change <= -10 -> :declining_interest
      true -> :stable_interest
    end
  end

  defp analyze_buy_sell_pattern(%{buy_sell_ratio: ratio}) do
    cond do
      ratio >= 3.0 -> :aggressive_accumulation
      ratio >= 2.0 -> :strong_accumulation
      ratio >= 1.3 -> :moderate_buying
      ratio <= 0.3 -> :panic_selling
      ratio <= 0.5 -> :heavy_selling
      ratio <= 0.7 -> :moderate_selling
      true -> :balanced_trading
    end
  end

  defp analyze_short_term_momentum(market_metrics) do
    # Focus on immediate price changes (30m and 1h)
    thirty_min_change = market_metrics.price_changes["30m"]
    hour_change = market_metrics.price_changes["1h"]

    cond do
      thirty_min_change >= 20 -> "parabolic rise"
      thirty_min_change >= 10 and hour_change >= 15 -> "strong momentum"
      thirty_min_change >= 5 and hour_change >= 8 -> "building momentum"
      thirty_min_change <= -15 -> "sharp reversal"
      thirty_min_change <= -8 -> "losing momentum"
      true -> "neutral"
    end
  end

  # Private functions

  def fetch_and_cache_overview(token_address) do
    case get("/defi/token_overview", query: [address: token_address]) do
      {:ok, %{status: 200, body: %{"success" => true, "data" => data}}} ->
        try do
          analyzed_data = analyze_overview_data(data)

          {:ok, analyzed_data}
        rescue
          e ->
            Logger.error("Failed to analyze overview data: #{inspect(e)}")
            {:error, "Failed to process token overview data"}
        end

      {:ok, %{status: status, body: %{"message" => message}}} ->
        {:error, "API returned status #{status}: #{message}"}

      {:error, error} ->
        Logger.error("Token overview API error: #{inspect(error)}")
        {:error, "Failed to fetch overview data"}
    end
  end

  defp safely_calculate_market_health(overview) do
    try do
      {:ok, calculate_market_health(overview)}
    rescue
      e ->
        Logger.error("Market health calculation failed: #{inspect(e)}")
        {:error, "Failed to calculate market health"}
    end
  end

  defp analyze_overview_data(data) do
    %{
      basic_info: extract_basic_info(data),
      market_metrics: extract_market_metrics(data),
      social_info: extract_social_info(data),
      trading_metrics: extract_trading_metrics(data),
      volume_analysis: extract_volume_analysis(data)
    }
  end

  defp extract_basic_info(data) do
    %{
      address: data["address"],
      name: data["name"],
      symbol: data["symbol"],
      decimals: data["decimals"],
      logo_uri: data["logoURI"],
      coingecko_id: get_in(data, ["extensions", "coingeckoId"]),
      markets_count: data["numberMarkets"]
    }
  end

  defp extract_market_metrics(data) do
    %{
      current_price: data["price"],
      market_cap: data["mc"],
      real_market_cap: data["realMc"],
      liquidity: data["liquidity"],
      total_supply: data["supply"],
      circulating_supply: data["circulatingSupply"],
      holder_count: data["holder"],
      price_changes: %{
        "30m" => data["priceChange30mPercent"],
        "1h" => data["priceChange1hPercent"],
        "2h" => data["priceChange2hPercent"],
        "4h" => data["priceChange4hPercent"],
        "24h" => data["priceChange24hPercent"]
      }
    }
  end

  defp extract_social_info(data) do
    %{
      website: get_in(data, ["extensions", "website"]),
      twitter: get_in(data, ["extensions", "twitter"]),
      telegram: get_in(data, ["extensions", "telegram"]),
      discord: get_in(data, ["extensions", "discord"]),
      medium: get_in(data, ["extensions", "medium"]),
      description: get_in(data, ["extensions", "description"])
    }
  end

  defp extract_trading_metrics(data) do
    %{
      volume_24h: %{
        total: data["v24h"],
        total_usd: data["v24hUSD"],
        buy: data["vBuy24h"],
        buy_usd: data["vBuy24hUSD"],
        sell: data["vSell24h"],
        sell_usd: data["vSell24hUSD"],
        change_percent: data["v24hChangePercent"]
      },
      last_traded_at: data["lastTradeUnixTime"],
      unique_wallets: %{
        "30m" => %{
          count: data["uniqueWallet30m"],
          change_percent: data["uniqueWallet30mChangePercent"]
        },
        "1h" => %{
          count: data["uniqueWallet1h"],
          change_percent: data["uniqueWallet1hChangePercent"]
        },
        "24h" => %{
          count: data["uniqueWallet24h"],
          change_percent: data["uniqueWallet24hChangePercent"]
        }
      }
    }
  end

  def extract_volume_analysis(data) do
    %{
      volume_24h: %{
        total: data["v24h"],
        total_usd: data["v24hUSD"],
        buy: data["vBuy24h"],
        buy_usd: data["vBuy24hUSD"],
        sell: data["vSell24h"],
        sell_usd: data["vSell24hUSD"],
        change_percent: data["v24hChangePercent"]
      },
      buy_sell_ratio: calculate_buy_sell_ratio(data)
    }
  end

  def calculate_buy_sell_ratio(data) do
    buy_volume = data["vBuy24h"] || 0
    sell_volume = data["vSell24h"] || 0

    case {buy_volume, sell_volume} do
      {0, 0} -> 1.0
      {buy, sell} -> buy / sell
    end
  end

  def calculate_market_health(overview) do
    metrics = [
      analyze_price_momentum(overview.market_metrics),
      analyze_volume_health(overview.volume_analysis),
      analyze_liquidity(overview.market_metrics),
      analyze_wallet_activity(overview.trading_metrics),
      analyze_buy_sell_pressure(overview.volume_analysis)
    ]

    score = Enum.sum(metrics) / length(metrics)

    %{
      health_score: score,
      health_level: determine_health_level(score),
      metrics: %{
        price_momentum: Enum.at(metrics, 0),
        volume_health: Enum.at(metrics, 1),
        liquidity: Enum.at(metrics, 2),
        wallet_activity: Enum.at(metrics, 3),
        buy_sell_pressure: Enum.at(metrics, 4)
      }
    }
  end

  def analyze_price_momentum(market_metrics) do
    changes = market_metrics.price_changes

    # Weight recent changes more heavily
    weighted_change =
      changes["30m"] * 0.3 +
        changes["1h"] * 0.3 +
        changes["4h"] * 0.2 +
        changes["24h"] * 0.2

    normalize_score(weighted_change, -10, 10)
  end

  def analyze_volume_health(%{volume_24h: vol}) do
    normalize_score(vol.change_percent, -50, 50)
  end

  def analyze_liquidity(market_metrics) do
    # Compare liquidity to market cap
    liquidity_ratio = market_metrics.liquidity / market_metrics.market_cap
    normalize_score(liquidity_ratio * 100, 0, 20)
  end

  def analyze_wallet_activity(trading_metrics) do
    normalize_score(
      trading_metrics.unique_wallets["24h"].change_percent,
      -20,
      50
    )
  end

  def analyze_buy_sell_pressure(%{buy_sell_ratio: ratio}) do
    # Normalize around 1.0 being neutral
    normalize_score((ratio - 1.0) * 100, -50, 50)
  end

  def normalize_score(nil, _min, _max), do: 0

  def normalize_score(value, min, max) do
    cond do
      value <= min ->
        0

      value >= max ->
        100

      true ->
        (value - min) / (max - min) * 100
    end
  end

  defp determine_health_level(score) when score >= 80, do: :excellent
  defp determine_health_level(score) when score >= 60, do: :good
  defp determine_health_level(score) when score >= 40, do: :neutral
  defp determine_health_level(score) when score >= 20, do: :concerning
  defp determine_health_level(_), do: :poor
end
