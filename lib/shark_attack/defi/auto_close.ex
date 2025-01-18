defmodule SharkAttack.Defi.AutoClose do
  use Ecto.Schema
  import Ecto.Changeset

  schema "auto_close" do
    field :user_address, :string
    field :pool_address, :string
    field :position_address, :string
    field :sell_direction, :string
    field :exit_bin_id, :string
    field :nonce_account, :string
    field :encoded_transaction, :string
    field :status, :string
    field :metadata, :map

    timestamps()
  end

  @doc false
  def changeset(auto_close, attrs) do
    auto_close
    |> cast(attrs, [
      :user_address,
      :pool_address,
      :position_address,
      :sell_direction,
      :exit_bin_id,
      :nonce_account,
      :encoded_transaction,
      :status,
      :metadata
    ])
    |> validate_required([
      :user_address,
      :pool_address,
      :position_address,
      :sell_direction,
      :exit_bin_id,
      :nonce_account,
      :encoded_transaction,
      :status
    ])
  end
end
