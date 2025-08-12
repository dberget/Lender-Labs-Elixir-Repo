defmodule SharkAttack.Loans.Offer do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder,
           only: [
             :loan_address,
             :amount,
             :rescinded,
             :taken,
             :collection_id,
             :automation
           ]}
  schema "offers" do
    field(:loan_address, :string)
    field(:amount, :float)

    field(:rescinded, :integer)
    field(:taken, :integer)

    field(:automation, :boolean)
    field(:lender, :string)

    belongs_to(:collection, SharkAttack.Collections.Collection)
    has_one(:loan, SharkAttack.Loans.Loan, foreign_key: :loan, references: :loan_address)

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
      :automation,
      :loan_address
    ])
    |> validate_required([])
  end
end
