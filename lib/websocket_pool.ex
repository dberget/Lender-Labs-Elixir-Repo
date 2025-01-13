defmodule SharkAttack.SolanaWSPool do
  use Supervisor
  require Logger

  # Setting slightly below limit for safety
  @max_subscriptions_per_connection 1000
  @ws_url "wss://atlas-mainnet.helius-rpc.com/?api-key=87f15176-5b11-42e2-92a3-4332752769a4"

  def start_link(init_arg) do
    Supervisor.start_link(__MODULE__, init_arg, name: __MODULE__)
  end

  @impl true
  def init(_init_arg) do
    # Start with one connection initially
    children = [
      Supervisor.child_spec({SharkAttack.SolanaWS, {0, @ws_url}}, id: :ws_0),
      Supervisor.child_spec({SharkAttack.SolanaWS, {1, @ws_url}}, id: :ws_1)
    ]

    Supervisor.init(children, strategy: :one_for_one)
  end

  def subscribe_accounts(accounts) do
    # Group accounts into chunks that fit within subscription limits
    chunks = Enum.chunk_every(accounts, @max_subscriptions_per_connection)

    # Ensure we have enough connections and wait for them to be ready
    needed_connections = length(chunks)

    :ok = ensure_connections(needed_connections)

    # wait_for_connections(needed_connections)

    # Distribute chunks across connections
    chunks
    |> Enum.with_index()
    |> Enum.each(fn {chunk, index} ->
      connection_name = connection_name(index)
      SharkAttack.SolanaWS.subscribe_accounts(connection_name, chunk)
    end)
  end

  defp ensure_connections(needed_connections) do
    current_connections = Supervisor.count_children(__MODULE__).active

    if needed_connections > current_connections do
      Enum.each(current_connections..(needed_connections - 1), fn index ->
        IO.inspect(index, label: "starting")

        Supervisor.start_child(
          __MODULE__,
          %{
            id: :"ws_#{index}",
            start: {SharkAttack.SolanaWS, :start_link, [{index, @ws_url}]},
            restart: :permanent,
            type: :worker
          }
        )
      end)
    end

    :ok
  end

  # defp wait_for_connections(count, max_attempts \\ 100) do
  #   Task.async_stream(
  #     0..(count - 1),
  #     fn index ->
  #       wait_for_connection(connection_name(index), max_attempts)
  #     end,
  #     timeout: 60_000,
  #     max_concurrency: 2
  #   )
  #   |> Stream.run()
  #   |> IO.inspect(label: "wait_for_connections")
  # end

  # defp wait_for_connection(name, attempts_left) when attempts_left > 0 do
  #   if Process.whereis(name) do
  #     :ok
  #   else
  #     Process.sleep(500)
  #     wait_for_connection(name, attempts_left - 1)
  #   end
  # end

  # defp wait_for_connection(name, _) do
  #   raise "Connection #{inspect(name)} failed to initialize"
  # end

  defp connection_name(index), do: :"solana_ws_#{index}"
end
