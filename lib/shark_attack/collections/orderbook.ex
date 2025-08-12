defmodule SharkAttack.Collections.Orderbook do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder,
           only: [
             :id,
             :public_key,
             :platform,
             :duration,
             :apy,
             :collection_id
           ]}
  schema "orderbooks" do
    field(:public_key, :string)
    field(:platform, :string)
    field(:duration, :integer)
    field(:apy, :integer)

    belongs_to(:collection, SharkAttack.Collections.Collection)
  end

  @doc false
  def changeset(nft, attrs) do
    nft
    |> cast(attrs, [:public_key, :platform, :duration, :apy, :collection_id])
    |> validate_required([:collection_id, :public_key, :platform])
    |> unique_constraint(:public_key)
  end
end
