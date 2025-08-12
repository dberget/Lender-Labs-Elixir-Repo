defmodule SharkAttack.Loans.TakenLoan do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder,
           only: [
             :borrower,
             :address,
             :platform,
             :amount,
             :is_extension,
             :collection_id
           ]}
  schema "loans_taken" do
    field(:borrower, :string)
    field(:address, :string)
    field(:platform, :string)
    field(:amount, :float)
    field(:is_extension, :boolean)

    belongs_to(:collection, SharkAttack.Collections.Collection)

    timestamps()
  end

  @doc false
  def changeset(offer, attrs) do
    offer
    |> cast(attrs, [
      :borrower,
      :address,
      :platform,
      :amount,
      :is_extension,
      :collection_id
    ])
    |> validate_required([:borrower, :platform, :amount, :is_extension])
  end
end
