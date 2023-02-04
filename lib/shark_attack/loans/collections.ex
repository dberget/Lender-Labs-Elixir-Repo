defmodule SharkAttack.Loans.Collection do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:address, :string, []}
  schema "collections" do
    field(:name, :string)
    field(:apy, :integer)
    field(:duration, :integer)

    timestamps()
  end

  @doc false
  def changeset(collection, attrs) do
    collection
    |> cast(attrs, [:name, :address, :apy, :duration])
    |> validate_required([])
  end
end
