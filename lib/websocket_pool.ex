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

    # Ensure we have enough connections for all chunks
    ensure_connections(length(chunks))

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

    # Give connections time to establish
    Process.sleep(1000)

    if needed_connections > current_connections do
      IO.inspect(needed_connections, label: "needed_connections")
      IO.inspect(current_connections, label: "current_connections")

      Enum.each(current_connections..(needed_connections - 1), fn index ->
        Supervisor.start_child(__MODULE__, {
          SharkAttack.SolanaWS,
          {index, @ws_url}
        })
      end)
    end
  end

  defp connection_name(index), do: :"solana_ws_#{index}"
end
