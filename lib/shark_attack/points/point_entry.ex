defmodule SharkAttack.Points.PointEntry do
  use Ecto.Schema
  import Ecto.Changeset

  schema "point_entries" do
    field(:address, :string)
    field(:amount, :float)
    field(:event_type, :string)
    field(:source, :string)
    field(:platform, :string)

    timestamps()
  end

  @doc false
  def changeset(offer, attrs) do
    offer
    |> cast(attrs, [
      :address,
      :amount,
      :event_type,
      :platform,
      :source
    ])
    |> validate_required([])
  end
end
