defmodule SharkAttack.Loans.BNPL do
  use Ecto.Schema
  import Ecto.Changeset

  schema "bnpls" do
    field(:loan_id, :string)
    field(:mint, :string)
    field(:listing_price, :integer)

    timestamps()
  end

  @doc false
  def changeset(bnpl, attrs) do
    bnpl
    |> cast(attrs, [
      :loan_id,
      :mint,
      :listing_price
    ])
    |> validate_required([])
  end
end
