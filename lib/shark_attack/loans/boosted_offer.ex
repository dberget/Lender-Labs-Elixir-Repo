defmodule SharkAttack.Loans.BoostedOffer do
  use Ecto.Schema
  import Ecto.Changeset

  schema "boosted_offers" do
    field(:address, :string)
    field(:payer, :string)
    field(:multiple, :integer)

    timestamps()
  end

  @doc false
  def changeset(offer, attrs) do
    offer
    |> cast(attrs, [
      :address,
      :multiple,
      :payer
    ])
    |> validate_required([])
  end
end
