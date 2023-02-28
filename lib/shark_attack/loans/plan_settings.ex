defmodule SharkAttack.Loans.PlanSettings do
  use Ecto.Schema
  import Ecto.Changeset

  schema "plan_settings" do
    field(:style, :string)
    field(:max_ltf, :float)
    field(:target_ltf, :float)

    belongs_to(:collection, SharkAttack.Collections.Collection)

    timestamps()
  end

  @doc false
  def changeset(loan_plan, attrs) do
    loan_plan
    |> cast(attrs, [:style, :max_ltf, :target_ltf])
    |> validate_required([])
  end
end
