defmodule GeyserClient do
    @moduledoc """
    Client for interacting with the Geyser service.
    """
  
    alias Geyser.Geyser.Stub
    alias Geyser.{PingRequest, GetVersionRequest, SubscribeRequest, SubscribeRequestFilterAccounts}
    alias Grpc.Channel
  
    # Initialize a gRPC channel
    defp channel() do
      {:ok, channel} = GRPC.Stub.connect("lenderlabs.helius-rpc.com:4001")

      channel
    end
  
    # Ping method
    def ping(count) do
      request = %PingRequest{count: count}
      channel()
      |> Stub.ping(request)
      |> handle_response()
    end
  
    # GetVersion method
    def get_version() do
      request = %GetVersionRequest{}
      channel()
      |> Stub.get_version(request)
      |> handle_response()
    end

     # Function to start a subscription and handle incoming messages
  def subscribe(accounts_of_interest) do
    accounts = Enum.map(accounts_of_interest, &to_base58/1)

    request = %SubscribeRequest{
      accounts: %{"programs" => %SubscribeRequestFilterAccounts{
        account: [],
        owner: accounts,
        filters: []
      }},
      slots: %{},
      transactions: %{},
      blocks: %{},
      entry: %{},
      blocks_meta: %{},
      accounts_data_slice: []
    }

    channel = channel()
    
    stream = Stub.subscribe(channel)

    # Sending the request
     GRPC.Stub.send_request(stream, request)

    # Handling incoming messages
    # stream_responses(stream, fn x -> IO.inspect(x) end)

    {:ok, result_enum} = GRPC.Stub.recv(stream)

    Enum.each(result_enum, fn {:ok, note} ->
            handle_update(note)
      end)
  end

  defp handle_update(%Geyser.SubscribeUpdate{
    filters: [],
    update_oneof: {:ping, %Geyser.SubscribeUpdatePing{__unknown_fields__: []}},
    __unknown_fields__: []
  }
  ), do: :ok

  defp handle_update(note) do
    {:account, accountInfo} = note.update_oneof
    IO.inspect(B58.encode58(accountInfo.account.pubkey))
  end

  defp to_base58(account), do: account # Placeholder, implement actual base58 conversion if needed

  # Stream responses and apply the success callback
  defp stream_responses(stream, success_callback) do
    stream
    |> Enum.each(fn
      {:ok, response} -> success_callback.(response)
      {:error, reason} -> IO.puts("Error: #{inspect(reason)}")
    end)
  end
  
    # Handle the gRPC response
    defp handle_response({:ok, response}), do: {:ok, response}
    defp handle_response({:error, reason}), do: {:error, reason}
  end