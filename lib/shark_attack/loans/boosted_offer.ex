defmodule SharkAttack.Loans.BoostedOffer do
  use Ecto.Schema
  import Ecto.Changeset

  schema "boosted_offers" do
    field(:offer_id, :string)
    field(:multiple, :integer)

    timestamps()
  end

  @doc false
  def changeset(offer, attrs) do
    offer
    |> cast(attrs, [
      :taken,
      :rescinded,
      :amount,
      :collection_id,
      :lender,
      :loan_address
    ])
    |> validate_required([])
  end
end
