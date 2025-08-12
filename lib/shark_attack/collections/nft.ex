defmodule SharkAttack.Collections.Nft do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder,
           only: [
             :mint,
             :image,
             :name,
             :collection_id
           ]}
  schema "nfts" do
    field(:mint, :string)
    field(:image, :string)
    field(:name, :string)

    belongs_to(:collection, SharkAttack.Collections.Collection)

    timestamps()
  end

  @doc false
  def changeset(nft, attrs) do
    nft
    |> cast(attrs, [:name, :image, :mint, :collection_id, :inserted_at, :updated_at])
    |> validate_required([:mint, :collection_id])
    |> unique_constraint(:mint)
  end
end
