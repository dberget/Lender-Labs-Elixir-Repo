defmodule SharkAttack.SolanaWS do
  use WebSockex

  require Logger

  def start_link(_opts) do
    # Logger.info("Starting SolanaWS")

    # start_result =
    #   WebSockex.start_link(
    #     "wss://stylish-misty-replica.solana-mainnet.quiknode.pro/b8961d53b160fcc4e0557911b4ed5e6e3ebf9ac8/",
    #     __MODULE__,
    #     [],
    #     opts
    #   )

    # subscribe_account(SharkAttack.SolanaWS, "SHARKobtfF1bHhxD2eqftjHBdVSCbKo9JtgK71FhELP")

    # start_result
  end

  def terminate(reason, state) do
    IO.puts("\nSocket Terminating:\n#{inspect(reason)}\n\n#{inspect(state)}\n")
    exit(:normal)
  end

  def subscribe_account(client, account) do
    Logger.info("Subscribing to acount: #{account}")

    request = %{
      "jsonrpc" => "2.0",
      "id" => 1,
      "method" => "programSubscribe",
      "params" => [
        account,
        %{
          "encoding" => "jsonParsed",
          "commitment" => "finalized"
        }
      ]
    }

    WebSockex.send_frame(client, {:text, Jason.encode!(request)})
  end

  def handle_connect(_conn, state) do
    Logger.info("SolanaWS Connected!")

    {:ok, state}
  end

  def handle_frame({type, msg}, state) do
    message = Jason.decode!(msg)

    IO.puts("Received Message - Type: #{inspect(type)} -- Message:")

    msg_data = get_in(message, ["params", "result", "value", "data"])

    {:ok, state}
  end
end
