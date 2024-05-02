defmodule Geyser.CommitmentLevel do
  @moduledoc false

  use Protobuf, enum: true, syntax: :proto3, protoc_gen_elixir_version: "0.12.0"

  field :PROCESSED, 0
  field :CONFIRMED, 1
  field :FINALIZED, 2
end

defmodule Geyser.SubscribeRequest.AccountsEntry do
  @moduledoc false

  use Protobuf, map: true, syntax: :proto3, protoc_gen_elixir_version: "0.12.0"

  field :key, 1, type: :string
  field :value, 2, type: Geyser.SubscribeRequestFilterAccounts
end

defmodule Geyser.SubscribeRequest.SlotsEntry do
  @moduledoc false

  use Protobuf, map: true, syntax: :proto3, protoc_gen_elixir_version: "0.12.0"

  field :key, 1, type: :string
  field :value, 2, type: Geyser.SubscribeRequestFilterSlots
end

defmodule Geyser.SubscribeRequest.TransactionsEntry do
  @moduledoc false

  use Protobuf, map: true, syntax: :proto3, protoc_gen_elixir_version: "0.12.0"

  field :key, 1, type: :string
  field :value, 2, type: Geyser.SubscribeRequestFilterTransactions
end

defmodule Geyser.SubscribeRequest.BlocksEntry do
  @moduledoc false

  use Protobuf, map: true, syntax: :proto3, protoc_gen_elixir_version: "0.12.0"

  field :key, 1, type: :string
  field :value, 2, type: Geyser.SubscribeRequestFilterBlocks
end

defmodule Geyser.SubscribeRequest.BlocksMetaEntry do
  @moduledoc false

  use Protobuf, map: true, syntax: :proto3, protoc_gen_elixir_version: "0.12.0"

  field :key, 1, type: :string
  field :value, 2, type: Geyser.SubscribeRequestFilterBlocksMeta
end

defmodule Geyser.SubscribeRequest.EntryEntry do
  @moduledoc false

  use Protobuf, map: true, syntax: :proto3, protoc_gen_elixir_version: "0.12.0"

  field :key, 1, type: :string
  field :value, 2, type: Geyser.SubscribeRequestFilterEntry
end

defmodule Geyser.SubscribeRequest do
  @moduledoc false

  use Protobuf, syntax: :proto3, protoc_gen_elixir_version: "0.12.0"

  field :accounts, 1, repeated: true, type: Geyser.SubscribeRequest.AccountsEntry, map: true
  field :slots, 2, repeated: true, type: Geyser.SubscribeRequest.SlotsEntry, map: true

  field :transactions, 3,
    repeated: true,
    type: Geyser.SubscribeRequest.TransactionsEntry,
    map: true

  field :blocks, 4, repeated: true, type: Geyser.SubscribeRequest.BlocksEntry, map: true

  field :blocks_meta, 5,
    repeated: true,
    type: Geyser.SubscribeRequest.BlocksMetaEntry,
    json_name: "blocksMeta",
    map: true

  field :entry, 8, repeated: true, type: Geyser.SubscribeRequest.EntryEntry, map: true
  field :commitment, 6, proto3_optional: true, type: Geyser.CommitmentLevel, enum: true

  field :accounts_data_slice, 7,
    repeated: true,
    type: Geyser.SubscribeRequestAccountsDataSlice,
    json_name: "accountsDataSlice"

  field :ping, 9, proto3_optional: true, type: Geyser.SubscribeRequestPing
end

defmodule Geyser.SubscribeRequestFilterAccounts do
  @moduledoc false

  use Protobuf, syntax: :proto3, protoc_gen_elixir_version: "0.12.0"

  field :account, 2, repeated: true, type: :string
  field :owner, 3, repeated: true, type: :string
  field :filters, 4, repeated: true, type: Geyser.SubscribeRequestFilterAccountsFilter
end

defmodule Geyser.SubscribeRequestFilterAccountsFilter do
  @moduledoc false

  use Protobuf, syntax: :proto3, protoc_gen_elixir_version: "0.12.0"

  oneof :filter, 0

  field :memcmp, 1, type: Geyser.SubscribeRequestFilterAccountsFilterMemcmp, oneof: 0
  field :datasize, 2, type: :uint64, oneof: 0
  field :token_account_state, 3, type: :bool, json_name: "tokenAccountState", oneof: 0
end

defmodule Geyser.SubscribeRequestFilterAccountsFilterMemcmp do
  @moduledoc false

  use Protobuf, syntax: :proto3, protoc_gen_elixir_version: "0.12.0"

  oneof :data, 0

  field :offset, 1, type: :uint64
  field :bytes, 2, type: :bytes, oneof: 0
  field :base58, 3, type: :string, oneof: 0
  field :base64, 4, type: :string, oneof: 0
end

defmodule Geyser.SubscribeRequestFilterSlots do
  @moduledoc false

  use Protobuf, syntax: :proto3, protoc_gen_elixir_version: "0.12.0"

  field :filter_by_commitment, 1,
    proto3_optional: true,
    type: :bool,
    json_name: "filterByCommitment"
end

defmodule Geyser.SubscribeRequestFilterTransactions do
  @moduledoc false

  use Protobuf, syntax: :proto3, protoc_gen_elixir_version: "0.12.0"

  field :vote, 1, proto3_optional: true, type: :bool
  field :failed, 2, proto3_optional: true, type: :bool
  field :signature, 5, proto3_optional: true, type: :string
  field :account_include, 3, repeated: true, type: :string, json_name: "accountInclude"
  field :account_exclude, 4, repeated: true, type: :string, json_name: "accountExclude"
  field :account_required, 6, repeated: true, type: :string, json_name: "accountRequired"
end

defmodule Geyser.SubscribeRequestFilterBlocks do
  @moduledoc false

  use Protobuf, syntax: :proto3, protoc_gen_elixir_version: "0.12.0"

  field :account_include, 1, repeated: true, type: :string, json_name: "accountInclude"

  field :include_transactions, 2,
    proto3_optional: true,
    type: :bool,
    json_name: "includeTransactions"

  field :include_accounts, 3, proto3_optional: true, type: :bool, json_name: "includeAccounts"
  field :include_entries, 4, proto3_optional: true, type: :bool, json_name: "includeEntries"
end

defmodule Geyser.SubscribeRequestFilterBlocksMeta do
  @moduledoc false

  use Protobuf, syntax: :proto3, protoc_gen_elixir_version: "0.12.0"
end

defmodule Geyser.SubscribeRequestFilterEntry do
  @moduledoc false

  use Protobuf, syntax: :proto3, protoc_gen_elixir_version: "0.12.0"
end

defmodule Geyser.SubscribeRequestAccountsDataSlice do
  @moduledoc false

  use Protobuf, syntax: :proto3, protoc_gen_elixir_version: "0.12.0"

  field :offset, 1, type: :uint64
  field :length, 2, type: :uint64
end

defmodule Geyser.SubscribeRequestPing do
  @moduledoc false

  use Protobuf, syntax: :proto3, protoc_gen_elixir_version: "0.12.0"

  field :id, 1, type: :int32
end

defmodule Geyser.SubscribeUpdate do
  @moduledoc false

  use Protobuf, syntax: :proto3, protoc_gen_elixir_version: "0.12.0"

  oneof :update_oneof, 0

  field :filters, 1, repeated: true, type: :string
  field :account, 2, type: Geyser.SubscribeUpdateAccount, oneof: 0
  field :slot, 3, type: Geyser.SubscribeUpdateSlot, oneof: 0
  field :transaction, 4, type: Geyser.SubscribeUpdateTransaction, oneof: 0
  field :block, 5, type: Geyser.SubscribeUpdateBlock, oneof: 0
  field :ping, 6, type: Geyser.SubscribeUpdatePing, oneof: 0
  field :pong, 9, type: Geyser.SubscribeUpdatePong, oneof: 0
  field :block_meta, 7, type: Geyser.SubscribeUpdateBlockMeta, json_name: "blockMeta", oneof: 0
  field :entry, 8, type: Geyser.SubscribeUpdateEntry, oneof: 0
end

defmodule Geyser.SubscribeUpdateAccount do
  @moduledoc false

  use Protobuf, syntax: :proto3, protoc_gen_elixir_version: "0.12.0"

  field :account, 1, type: Geyser.SubscribeUpdateAccountInfo
  field :slot, 2, type: :uint64
  field :is_startup, 3, type: :bool, json_name: "isStartup"
end

defmodule Geyser.SubscribeUpdateAccountInfo do
  @moduledoc false

  use Protobuf, syntax: :proto3, protoc_gen_elixir_version: "0.12.0"

  field :pubkey, 1, type: :bytes
  field :lamports, 2, type: :uint64
  field :owner, 3, type: :bytes
  field :executable, 4, type: :bool
  field :rent_epoch, 5, type: :uint64, json_name: "rentEpoch"
  field :data, 6, type: :bytes
  field :write_version, 7, type: :uint64, json_name: "writeVersion"
  field :txn_signature, 8, proto3_optional: true, type: :bytes, json_name: "txnSignature"
end

defmodule Geyser.SubscribeUpdateSlot do
  @moduledoc false

  use Protobuf, syntax: :proto3, protoc_gen_elixir_version: "0.12.0"

  field :slot, 1, type: :uint64
  field :parent, 2, proto3_optional: true, type: :uint64
  field :status, 3, type: Geyser.CommitmentLevel, enum: true
end

defmodule Geyser.SubscribeUpdateTransaction do
  @moduledoc false

  use Protobuf, syntax: :proto3, protoc_gen_elixir_version: "0.12.0"

  field :transaction, 1, type: Geyser.SubscribeUpdateTransactionInfo
  field :slot, 2, type: :uint64
end

defmodule Geyser.SubscribeUpdateTransactionInfo do
  @moduledoc false

  use Protobuf, syntax: :proto3, protoc_gen_elixir_version: "0.12.0"

  field :signature, 1, type: :bytes
  field :is_vote, 2, type: :bool, json_name: "isVote"
  field :transaction, 3, type: Solana.Storage.ConfirmedBlock.Transaction
  field :meta, 4, type: Solana.Storage.ConfirmedBlock.TransactionStatusMeta
  field :index, 5, type: :uint64
end

defmodule Geyser.SubscribeUpdateBlock do
  @moduledoc false

  use Protobuf, syntax: :proto3, protoc_gen_elixir_version: "0.12.0"

  field :slot, 1, type: :uint64
  field :blockhash, 2, type: :string
  field :rewards, 3, type: Solana.Storage.ConfirmedBlock.Rewards
  field :block_time, 4, type: Solana.Storage.ConfirmedBlock.UnixTimestamp, json_name: "blockTime"

  field :block_height, 5,
    type: Solana.Storage.ConfirmedBlock.BlockHeight,
    json_name: "blockHeight"

  field :parent_slot, 7, type: :uint64, json_name: "parentSlot"
  field :parent_blockhash, 8, type: :string, json_name: "parentBlockhash"
  field :executed_transaction_count, 9, type: :uint64, json_name: "executedTransactionCount"
  field :transactions, 6, repeated: true, type: Geyser.SubscribeUpdateTransactionInfo
  field :updated_account_count, 10, type: :uint64, json_name: "updatedAccountCount"
  field :accounts, 11, repeated: true, type: Geyser.SubscribeUpdateAccountInfo
  field :entries_count, 12, type: :uint64, json_name: "entriesCount"
  field :entries, 13, repeated: true, type: Geyser.SubscribeUpdateEntry
end

defmodule Geyser.SubscribeUpdateBlockMeta do
  @moduledoc false

  use Protobuf, syntax: :proto3, protoc_gen_elixir_version: "0.12.0"

  field :slot, 1, type: :uint64
  field :blockhash, 2, type: :string
  field :rewards, 3, type: Solana.Storage.ConfirmedBlock.Rewards
  field :block_time, 4, type: Solana.Storage.ConfirmedBlock.UnixTimestamp, json_name: "blockTime"

  field :block_height, 5,
    type: Solana.Storage.ConfirmedBlock.BlockHeight,
    json_name: "blockHeight"

  field :parent_slot, 6, type: :uint64, json_name: "parentSlot"
  field :parent_blockhash, 7, type: :string, json_name: "parentBlockhash"
  field :executed_transaction_count, 8, type: :uint64, json_name: "executedTransactionCount"
  field :entries_count, 9, type: :uint64, json_name: "entriesCount"
end

defmodule Geyser.SubscribeUpdateEntry do
  @moduledoc false

  use Protobuf, syntax: :proto3, protoc_gen_elixir_version: "0.12.0"

  field :slot, 1, type: :uint64
  field :index, 2, type: :uint64
  field :num_hashes, 3, type: :uint64, json_name: "numHashes"
  field :hash, 4, type: :bytes
  field :executed_transaction_count, 5, type: :uint64, json_name: "executedTransactionCount"
end

defmodule Geyser.SubscribeUpdatePing do
  @moduledoc false

  use Protobuf, syntax: :proto3, protoc_gen_elixir_version: "0.12.0"
end

defmodule Geyser.SubscribeUpdatePong do
  @moduledoc false

  use Protobuf, syntax: :proto3, protoc_gen_elixir_version: "0.12.0"

  field :id, 1, type: :int32
end

defmodule Geyser.PingRequest do
  @moduledoc false

  use Protobuf, syntax: :proto3, protoc_gen_elixir_version: "0.12.0"

  field :count, 1, type: :int32
end

defmodule Geyser.PongResponse do
  @moduledoc false

  use Protobuf, syntax: :proto3, protoc_gen_elixir_version: "0.12.0"

  field :count, 1, type: :int32
end

defmodule Geyser.GetLatestBlockhashRequest do
  @moduledoc false

  use Protobuf, syntax: :proto3, protoc_gen_elixir_version: "0.12.0"

  field :commitment, 1, proto3_optional: true, type: Geyser.CommitmentLevel, enum: true
end

defmodule Geyser.GetLatestBlockhashResponse do
  @moduledoc false

  use Protobuf, syntax: :proto3, protoc_gen_elixir_version: "0.12.0"

  field :slot, 1, type: :uint64
  field :blockhash, 2, type: :string
  field :last_valid_block_height, 3, type: :uint64, json_name: "lastValidBlockHeight"
end

defmodule Geyser.GetBlockHeightRequest do
  @moduledoc false

  use Protobuf, syntax: :proto3, protoc_gen_elixir_version: "0.12.0"

  field :commitment, 1, proto3_optional: true, type: Geyser.CommitmentLevel, enum: true
end

defmodule Geyser.GetBlockHeightResponse do
  @moduledoc false

  use Protobuf, syntax: :proto3, protoc_gen_elixir_version: "0.12.0"

  field :block_height, 1, type: :uint64, json_name: "blockHeight"
end

defmodule Geyser.GetSlotRequest do
  @moduledoc false

  use Protobuf, syntax: :proto3, protoc_gen_elixir_version: "0.12.0"

  field :commitment, 1, proto3_optional: true, type: Geyser.CommitmentLevel, enum: true
end

defmodule Geyser.GetSlotResponse do
  @moduledoc false

  use Protobuf, syntax: :proto3, protoc_gen_elixir_version: "0.12.0"

  field :slot, 1, type: :uint64
end

defmodule Geyser.GetVersionRequest do
  @moduledoc false

  use Protobuf, syntax: :proto3, protoc_gen_elixir_version: "0.12.0"
end

defmodule Geyser.GetVersionResponse do
  @moduledoc false

  use Protobuf, syntax: :proto3, protoc_gen_elixir_version: "0.12.0"

  field :version, 1, type: :string
end

defmodule Geyser.IsBlockhashValidRequest do
  @moduledoc false

  use Protobuf, syntax: :proto3, protoc_gen_elixir_version: "0.12.0"

  field :blockhash, 1, type: :string
  field :commitment, 2, proto3_optional: true, type: Geyser.CommitmentLevel, enum: true
end

defmodule Geyser.IsBlockhashValidResponse do
  @moduledoc false

  use Protobuf, syntax: :proto3, protoc_gen_elixir_version: "0.12.0"

  field :slot, 1, type: :uint64
  field :valid, 2, type: :bool
end

defmodule Geyser.Geyser.Service do
  @moduledoc false

  use GRPC.Service, name: "geyser.Geyser", protoc_gen_elixir_version: "0.12.0"

  rpc :Subscribe, stream(Geyser.SubscribeRequest), stream(Geyser.SubscribeUpdate)

  rpc :Ping, Geyser.PingRequest, Geyser.PongResponse

  rpc :GetLatestBlockhash, Geyser.GetLatestBlockhashRequest, Geyser.GetLatestBlockhashResponse

  rpc :GetBlockHeight, Geyser.GetBlockHeightRequest, Geyser.GetBlockHeightResponse

  rpc :GetSlot, Geyser.GetSlotRequest, Geyser.GetSlotResponse

  rpc :IsBlockhashValid, Geyser.IsBlockhashValidRequest, Geyser.IsBlockhashValidResponse

  rpc :GetVersion, Geyser.GetVersionRequest, Geyser.GetVersionResponse
end

defmodule Geyser.Geyser.Stub do
  @moduledoc false

  use GRPC.Stub, service: Geyser.Geyser.Service
end