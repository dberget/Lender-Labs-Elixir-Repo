defmodule SharkAttack.SolanaWS do
  use WebSockex

  require Logger

  def start_link(opts) do
    Logger.info("Starting SolanaWS")

    # WebSockex.start_link("wss://api.mainnet-beta.solana.com/", __MODULE__, [], opts)
    start_result =
      WebSockex.start_link(
        "wss://solana--mainnet.datahub.figment.io/apikey/8921a90aba6a83716db5f1ea3d8e9e3c/",
        __MODULE__,
        [],
        opts
      )

    subscribe_account(ExLiquidator.SolanaWS, "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD")

    start_result
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
      "method" => "accountSubscribe",
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

  # def handle_frame({type, msg}, state) do
  # message = Jason.decode!(msg)

  # IO.puts("Received Message - Type: #{inspect(type)} -- Message:")
  # IO.inspect(message)

  # msg_data = get_in(message, ["params", "result", "value", "data"])

  # {:ok, state}
  # end
end
