defmodule SharkAttack.Birdeye.PriceHistoryClient do
  @moduledoc """
  Client for interacting with the Birdeye API to fetch token OHLCV data.
  """

  use Tesla

  @api_key "909f47ea203046f18943bd6f878fe669"
  @base_url "https://public-api.birdeye.so"
  @default_interval "12H"

  plug Tesla.Middleware.BaseUrl, @base_url

  plug Tesla.Middleware.Headers, [
    {"x-api-key", @api_key},
    {"x-chain", "solana"},
    {"accept", "application/json"}
  ]

  plug Tesla.Middleware.JSON

  @type ohlcv_data :: %{
          timestamp: integer(),
          open: float(),
          high: float(),
          low: float(),
          close: float(),
          volume: float()
        }

  @doc """
  Fetches OHLCV data for a token.

  ## Parameters
    - token: The token's mint address
    - opts: Optional parameters
      - interval: Time interval for candles (default: "15m")
        Available intervals: "1m", "5m", "15m", "1h", "4h", "1d", "1w"

  ## Examples

      iex> get_ohlcv_history("So111...")
      {:ok, [
        %{
          timestamp: 1234567890,
          open: 1.23,
          high: 1.25,
          low: 1.20,
          close: 1.22,
          volume: 1000.0
        },
        # ...
      ]}
  """
  def get_ohlcv_history(token, opts \\ []) do
    interval = Keyword.get(opts, :interval, @default_interval)

    # Calculate timestamps for last 7 days
    now = DateTime.utc_now() |> DateTime.to_unix()
    # 7 days in seconds
    seven_days_ago = now - 7 * 24 * 60 * 60

    case get("/defi/ohlcv",
           query: [
             address: token,
             type: interval,
             time_from: seven_days_ago,
             time_to: now
           ]
         ) do
      {:ok, %{status: 200, body: %{"data" => %{"items" => items}}}} ->
        {:ok, parse_ohlcv_data(items)}

      {:ok, %{status: status, body: %{"message" => message}}} ->
        {:error, "PriceHistoryClient Birdeye API returned status #{status}, #{message}"}

      {:error, error} ->
        {:error, "Failed to fetch OHLCV data: #{inspect(error)}"}
    end
  end

  @doc """
  Fetches OHLCV data and calculates additional market metrics.

  Returns OHLCV data along with calculated metrics like:
  - Price trends
  - Volatility indicators
  - Volume analysis
  - Moving averages
  """
  def get_ohlcv_with_metrics(token, opts \\ []) do
    case get_ohlcv_history(token, opts) do
      {:ok, ohlcv_data} ->
        metrics = calculate_market_metrics(ohlcv_data)
        {:ok, %{ohlcv: ohlcv_data, metrics: metrics}}

      error ->
        error
    end
  end

  # Private functions

  defp parse_ohlcv_data(items) when is_list(items) do
    items
    |> Enum.map(fn item ->
      %{
        timestamp: item["unixTime"],
        open: parse_float(item["o"]),
        high: parse_float(item["h"]),
        low: parse_float(item["l"]),
        close: parse_float(item["c"]),
        volume: parse_float(item["v"])
      }
    end)
    |> Enum.sort_by(& &1.timestamp, :asc)
  end

  defp parse_float(value) when is_binary(value), do: String.to_float(value)
  defp parse_float(value) when is_float(value), do: value
  defp parse_float(value) when is_integer(value), do: value * 1.0

  defp calculate_market_metrics(ohlcv_data) do
    %{
      price_metrics: calculate_price_metrics(ohlcv_data),
      volume_metrics: calculate_volume_metrics(ohlcv_data),
      volatility_metrics: calculate_volatility_metrics(ohlcv_data),
      trend_metrics: calculate_trend_metrics(ohlcv_data)
    }
  end

  defp calculate_price_metrics(ohlcv_data) do
    %{
      highest_price: Enum.max_by(ohlcv_data, & &1.high).high,
      lowest_price: Enum.min_by(ohlcv_data, & &1.low).low,
      latest_price: List.last(ohlcv_data).close,
      price_change_percentage:
        calculate_price_change_percentage(List.first(ohlcv_data), List.last(ohlcv_data)),
      average_price:
        Enum.reduce(ohlcv_data, 0, fn candle, acc ->
          acc + (candle.high + candle.low) / 2
        end) / length(ohlcv_data)
    }
  end

  defp calculate_volume_metrics(ohlcv_data) do
    volumes = Enum.map(ohlcv_data, & &1.volume)

    %{
      total_volume: Enum.sum(volumes),
      average_volume: Enum.sum(volumes) / length(volumes),
      highest_volume: Enum.max(volumes),
      volume_trend: calculate_volume_trend(ohlcv_data)
    }
  end

  defp calculate_volatility_metrics([single_candle]) do
    # When we only have one data point, calculate metrics based on the single candle
    daily_range = (single_candle.high - single_candle.low) / single_candle.low * 100

    %{
      average_daily_range: daily_range,
      max_price_swing: daily_range,
      # Not enough data to calculate real volatility
      volatility: 0.0
    }
  end

  defp calculate_volatility_metrics(ohlcv_data) when length(ohlcv_data) > 1 do
    price_changes =
      ohlcv_data
      |> Enum.chunk_every(2, 1, :discard)
      |> Enum.map(fn [prev, current] ->
        abs((current.close - prev.close) / prev.close) * 100
      end)

    %{
      average_daily_range:
        Enum.map(ohlcv_data, fn candle -> (candle.high - candle.low) / candle.low * 100 end)
        |> safe_average(),
      max_price_swing: Enum.max(price_changes, fn -> 0.0 end),
      volatility: standard_deviation(price_changes)
    }
  end

  defp calculate_volatility_metrics(_),
    do: %{
      average_daily_range: 0.0,
      max_price_swing: 0.0,
      volatility: 0.0
    }

  defp calculate_trend_metrics(ohlcv_data) do
    closes = Enum.map(ohlcv_data, & &1.close)

    %{
      sma_20: simple_moving_average(closes, 20),
      price_trend: determine_trend(ohlcv_data),
      consecutive_up_candles: count_consecutive_candles(ohlcv_data, :up),
      consecutive_down_candles: count_consecutive_candles(ohlcv_data, :down)
    }
  end

  defp calculate_price_change_percentage(first, last) do
    (last.close - first.open) / first.open * 100
  end

  defp calculate_volume_trend(ohlcv_data) do
    volumes = Enum.map(ohlcv_data, & &1.volume)

    case length(volumes) do
      0 ->
        0.0

      1 ->
        0.0

      len ->
        first_half = Enum.take(volumes, div(len, 2))
        second_half = Enum.take(volumes, -div(len, 2))

        first_half_avg = safe_average(first_half)
        second_half_avg = safe_average(second_half)

        case first_half_avg do
          0.0 -> 0.0
          avg -> (second_half_avg - avg) / avg * 100
        end
    end
  end

  defp safe_average([]), do: 0.0
  defp safe_average(numbers) when length(numbers) > 0, do: Enum.sum(numbers) / length(numbers)

  defp standard_deviation([]), do: 0.0
  defp standard_deviation([_single]), do: 0.0

  defp standard_deviation(numbers) when length(numbers) > 1 do
    mean = safe_average(numbers)

    variance =
      Enum.reduce(numbers, 0, fn x, acc -> acc + :math.pow(x - mean, 2) end) / length(numbers)

    :math.sqrt(variance)
  end

  defp simple_moving_average(numbers, period) when length(numbers) < period, do: 0.0

  defp simple_moving_average(numbers, period) do
    numbers
    |> Enum.take(-period)
    |> safe_average()
  end

  defp determine_trend(ohlcv_data) do
    closes = Enum.map(ohlcv_data, & &1.close)
    sma_20 = simple_moving_average(closes, 20)
    sma_50 = simple_moving_average(closes, 50)

    cond do
      sma_20 > sma_50 -> :bullish
      sma_20 < sma_50 -> :bearish
      true -> :neutral
    end
  end

  defp count_consecutive_candles(ohlcv_data, direction) do
    ohlcv_data
    |> Enum.reverse()
    |> Enum.reduce_while(0, fn candle, acc ->
      case {direction, candle.close > candle.open} do
        {:up, true} -> {:cont, acc + 1}
        {:down, false} -> {:cont, acc + 1}
        _ -> {:halt, acc}
      end
    end)
  end
end
