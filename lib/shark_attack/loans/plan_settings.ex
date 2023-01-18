defmodule SharkAttack.Loans.PlanSettings do
  use Ecto.Schema
  import Ecto.Changeset

  schema "plan_settings" do
    field(:style, :string)
    field(:max_ltf, :integer)
    field(:target_ltf, :integer)
    many_to_many :collections, SharkAttack.Loans.Collection, join_through: "plan_collections"

    timestamps()
  end

  @doc false
  def changeset(loan_plan, attrs) do
    loan_plan
    |> cast(attrs, [:style, :max_ltf, :target_ltf])
    |> validate_required([])
  end
end
