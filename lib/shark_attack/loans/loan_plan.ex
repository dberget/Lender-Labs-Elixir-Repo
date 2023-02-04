defmodule SharkAttack.Loans.LoanPlan do
  use Ecto.Schema
  import Ecto.Changeset

  schema "loan_plans" do
    belongs_to(:plan_settings, SharkAttack.Loans.PlanSettings)

    belongs_to(:keypair, SharkAttack.Keypair,
      foreign_key: :keypair_pk,
      references: :public_key,
      type: :string
    )

    belongs_to(:user, SharkAttack.Accounts.User,
      foreign_key: :user_address,
      references: :address,
      type: :string
    )

    timestamps()
  end

  @doc false
  def changeset(loan_plan, attrs) do
    loan_plan
    |> cast(attrs, [:plan_settings_id, :keypair_pk, :user_address])
    |> validate_required([])
  end
end
