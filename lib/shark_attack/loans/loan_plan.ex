defmodule SharkAttack.Loans.LoanPlan do
  use Ecto.Schema
  import Ecto.Changeset

  schema "loan_plans" do
    belongs_to(:plan_settings, SharkAttack.Loans.PlanSettings)
    belongs_to(:keypair, SharkAttack.Keypair)
    belongs_to(:user, SharkAttack.Accounts.User)
    timestamps()
  end

  @doc false
  def changeset(loan_plan, attrs) do
    loan_plan
    |> cast(attrs, [:plan_settings_id, :keypair_id, :user_id])
    |> validate_required([])
  end
end
