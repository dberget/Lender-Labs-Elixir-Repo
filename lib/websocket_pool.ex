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
    children = [
      Supervisor.child_spec({SharkAttack.SolanaWS, {0, @ws_url}}, id: :solana_ws_0)
      # Supervisor.child_spec({SharkAttack.SolanaWS, {1, @ws_url}}, id: :"solana_ws_1"),
      # Supervisor.child_spec({SharkAttack.SolanaWS, {2, @ws_url}}, id: :"solana_ws_2")
    ]

    Supervisor.init(children, strategy: :one_for_one)
  end

  def subscribe_accounts(accounts) do
    IO.inspect("subscribing accounts")
    # Group accounts into chunks that fit within subscription limits
    chunks = Enum.chunk_every(accounts, @max_subscriptions_per_connection)
    needed_connections = length(chunks)

    :ok = ensure_connections(needed_connections)

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

    Logger.info("Ensuring #{needed_connections} connections")

    if needed_connections > current_connections do
      results =
        Enum.map(current_connections..(needed_connections - 1), fn index ->
          attempt_connection(index, 1)
        end)

      # Check if any connections failed
      case Enum.find(results, fn
             {:ok, _} -> false
             {:error, _, _} -> true
           end) do
        nil ->
          :ok

        {:error, index, reason} ->
          Logger.error("Failed to start connection #{index}: #{inspect(reason)}")
          {:error, :connection_failed}
      end
    else
      :ok
    end
  end

  defp attempt_connection(index, attempt, max_attempts \\ 3) do
    child_spec = %{
      id: connection_name(index),
      start: {SharkAttack.SolanaWS, :start_link, [{index, @ws_url}]},
      restart: :transient,
      type: :worker
    }

    case Supervisor.start_child(__MODULE__, child_spec) do
      {:ok, _pid} ->
        {:ok, index}

      {:error, {:already_started, _pid}} ->
        {:ok, index}

      {:error, :already_present} ->
        Supervisor.delete_child(__MODULE__, connection_name(index))
        attempt_connection(index, attempt, max_attempts)

      {:error, {%WebSockex.RequestError{code: 429}, _}} when attempt < max_attempts ->
        # Calculate exponential backoff time (2^attempt seconds)
        backoff = :timer.seconds(10)

        Logger.warning(
          "Rate limited (429) for connection #{index}. Retrying in #{backoff}ms (attempt #{attempt}/#{max_attempts})"
        )

        Process.sleep(backoff)
        attempt_connection(index, attempt + 1, max_attempts)

      {:error, reason} ->
        {:error, index, reason}
    end
  end

  defp connection_name(index), do: :"solana_ws_#{index}"

  def startup_subscriptions(accounts) do
    IO.inspect("startup_subscriptions")
    subscribe_accounts(accounts)
  end

  def refresh_subscriptions(accounts) do
    Logger.info("Refreshing WebSocket connections and subscriptions")

    # Terminate existing connections
    Supervisor.which_children(__MODULE__)
    |> Enum.each(fn {id, _pid, _, _} ->
      Logger.info("Terminating connection #{id}")
      Supervisor.terminate_child(__MODULE__, id)
    end)

    # Wait for new connections to be established
    # Give supervisor time to restart children
    Process.sleep(1000)

    # Calculate needed connections
    chunks = Enum.chunk_every(accounts, @max_subscriptions_per_connection)
    needed_connections = length(chunks)

    # Ensure connections are established
    case ensure_connections(needed_connections) do
      :ok ->
        # Wait for WebSocket connections to be ready
        # Give WebSockex time to establish connections
        Process.sleep(2000)
        Logger.info("Subscribing accounts")
        subscribe_accounts(accounts)

      {:error, reason} ->
        Logger.error("Failed to establish WebSocket connections: #{inspect(reason)}")
        {:error, :connection_failed}
    end
  end
end
