defmodule SharkAttack.Birdeye.RateLimiter do
  use GenServer
  require Logger

  @bucket_size 15
  # 1 second in milliseconds
  @refill_rate 1000

  def start_link(_opts) do
    GenServer.start_link(__MODULE__, [], name: __MODULE__)
  end

  def init(_opts) do
    schedule_refill()
    {:ok, %{tokens: @bucket_size, waiting: []}}
  end

  def request(func) do
    GenServer.call(__MODULE__, {:request, func}, :infinity)
  end

  def handle_call({:request, func}, from, %{tokens: tokens, waiting: waiting} = state) do
    cond do
      tokens > 0 ->
        result = func.()
        {:reply, result, %{state | tokens: tokens - 1}}

      true ->
        {:noreply, %{state | waiting: [{func, from} | waiting]}}
    end
  end

  def handle_info(:refill, %{tokens: tokens, waiting: waiting}) do
    new_tokens = min(tokens + 1, @bucket_size)
    schedule_refill()

    case waiting do
      [] ->
        {:noreply, %{tokens: new_tokens, waiting: []}}

      [{func, from} | rest] ->
        result = func.()
        GenServer.reply(from, result)
        {:noreply, %{tokens: new_tokens - 1, waiting: rest}}
    end
  end

  defp schedule_refill do
    Process.send_after(self(), :refill, @refill_rate)
  end
end
