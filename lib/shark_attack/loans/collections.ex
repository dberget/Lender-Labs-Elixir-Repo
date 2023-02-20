defmodule SharkAttack.Loans.Collection do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:id, :name, :sharky_address, :frakt_address, :hyperspace_id]}
  schema "collections" do
    field(:sharky_address, :string)
    field(:frakt_address, :string)
    field(:hyperspace_id, :string)
    field(:name, :string)
    field(:apy, :integer)
    field(:duration, :integer)

    timestamps()
  end

  @doc false
  def changeset(collection, attrs) do
    collection
    |> cast(attrs, [:name, :sharky_address, :apy, :duration, :frakt_address, :hyperspace_id])
    |> validate_required([])
  end
end
