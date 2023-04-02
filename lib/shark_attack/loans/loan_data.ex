defmodule SharkAttack.Loans.LoanData do
  use Ecto.Schema
  import Ecto.Changeset

  schema "loan_data" do


    timestamps()
  end

  @doc false
  def changeset(loan_data, attrs) do
    loan_data
    |> cast(attrs, [])
    |> validate_required([])
  end
end
