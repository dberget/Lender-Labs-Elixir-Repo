defmodule SharkAttack.Points.PointEntry do
  use Ecto.Schema
  import Ecto.Changeset

  schema "point_entries" do
    field(:address, :string)
    field(:amount, :integer)
    field(:event_type, :string)

    timestamps()
  end

  @doc false
  def changeset(offer, attrs) do
    offer
    |> cast(attrs, [
      :address,
      :amount,
      :event_type
    ])
    |> validate_required([])
  end
end
