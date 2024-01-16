defmodule SharkAttack.Raffles.Entry do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:user, :entries, :raffle_id]}
  schema "raffle_entries" do
    field(:user, :string)
    field(:entries, :integer)

    belongs_to(:raffle, SharkAttack.Raffles.Raffle)

    timestamps()
  end

  def changeset(params, attrs) do
    params
    |> cast(attrs, [:user, :entries, :raffle_id])
    |> validate_required([:user, :entries, :raffle_id])
  end
end
