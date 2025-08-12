# defmodule GeyserClient do
#   @moduledoc """
#   Client for interacting with the Geyser service.
#   """

#   alias Geyser.Geyser.Stub
#   alias Geyser.{PingRequest, GetVersionRequest, SubscribeRequest, SubscribeRequestFilterAccounts}
#   # alias Grpc.Channel

#   # Initialize a gRPC channel
#   defp channel() do
#     {:ok, channel} =
#       GRPC.Stub.connect(
#         "atlas-mainnet.helius-rpc.com:4001/?api-key=87f15176-5b11-42e2-92a3-4332752769a4"
#       )

#     channel
#   end

#   # Ping method
#   def ping(count) do
#     request = %PingRequest{count: count}

#     channel()
#     |> Stub.ping(request)
#     |> handle_response()
#   end

#   # GetVersion method
#   def get_version() do
#     request = %GetVersionRequest{}

#     channel()
#     |> Stub.get_version(request)
#     |> handle_response()
#   end

#   def account_subscribe(
#         accounts_of_interest \\ [
#           "CN8k1PtzJz2mGGdf5puwV14Dh1skMRkT42sSvhesf3nT",
#           "4FkX872Wbo6NK7eNEmMnDRMJnwbu6tQsE6utb5fbDbzv"
#         ],
#         update_callback
#       ) do
#     request = %SubscribeRequest{
#       accounts: %{
#         "accounts" => %SubscribeRequestFilterAccounts{
#           account: accounts_of_interest
#         }
#       },
#       slots: %{},
#       transactions: %{},
#       blocks: %{},
#       entry: %{},
#       blocks_meta: %{},
#       accounts_data_slice: []
#     }

#     channel = channel()

#     stream = Stub.subscribe(channel)

#     # Sending the request
#     GRPC.Stub.send_request(stream, request)

#     {:ok, result_enum} = GRPC.Stub.recv(stream)

#     Enum.each(result_enum, fn {:ok, note} ->
#       update_callback.(note)
#     end)
#   end

#   # Function to start a subscription and handle incoming messages
#   def program_subscribe(accounts_of_interest \\ ["SHARKobtfF1bHhxD2eqftjHBdVSCbKo9JtgK71FhELP"]) do
#     request = %SubscribeRequest{
#       accounts: %{
#         "programs" => %SubscribeRequestFilterAccounts{
#           account: [],
#           owner: accounts_of_interest,
#           filters: []
#         }
#       },
#       slots: %{},
#       transactions: %{},
#       blocks: %{},
#       entry: %{},
#       blocks_meta: %{},
#       accounts_data_slice: []
#     }

#     channel = channel()

#     stream = Stub.subscribe(channel)

#     # Sending the request
#     GRPC.Stub.send_request(stream, request)

#     # Handling incoming messages
#     # stream_responses(stream, fn x -> IO.inspect(x) end)

#     {:ok, result_enum} = GRPC.Stub.recv(stream)

#     Enum.each(result_enum, fn {:ok, note} ->
#       handle_update(note)
#     end)
#   end

#   defp handle_update(%Geyser.SubscribeUpdate{
#          filters: [],
#          update_oneof: {:ping, %Geyser.SubscribeUpdatePing{__unknown_fields__: []}},
#          __unknown_fields__: []
#        }),
#        do: :ok

#   defp handle_update(note) do
#     {:account, accountInfo} = note.update_oneof

#     SharkAttack.SharkyApi.get_loan(
#       B58.encode58(accountInfo.account.pubkey),
#       :binary.bin_to_list(accountInfo.account.data)
#     )
#     |> SharkAttack.LoansWorker.update_data()
#   end

#   # Stream responses and apply the success callback
#   # defp stream_responses(stream, success_callback) do
#   #   stream
#   #   |> Enum.each(fn
#   #     {:ok, response} -> success_callback.(response)
#   #     {:error, reason} -> IO.puts("Error: #{inspect(reason)}")
#   #   end)
#   # end

#   # Handle the gRPC response
#   defp handle_response({:ok, response}), do: {:ok, response}
#   defp handle_response({:error, reason}), do: {:error, reason}
# end
