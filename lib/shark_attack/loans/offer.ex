defmodule SharkAttack.Loans.Offer do
  use Ecto.Schema
  import Ecto.Changeset

  schema "offers" do
    field(:loan_address, :string)
    field(:amount, :float)

    field(:rescinded, :integer)
    field(:taken, :integer)

    field(:lender, :string)

    belongs_to(:collection, SharkAttack.Collections.Collection)

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
