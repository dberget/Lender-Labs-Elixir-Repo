defmodule SharkAttack.Loans.PlanSettings do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder,
           only: [
             :id,
             :max_ltf,
             :collection_id
           ]}
  schema "plan_settings" do
    field(:style, :string)
    field(:max_ltf, :float)
    field(:target_ltf, :float)

    belongs_to(:collection, SharkAttack.Collections.Collection)

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
    |> cast(attrs, [:style, :max_ltf, :target_ltf, :collection_id])
    |> validate_number(:max_ltf, less_than: 100)
    |> validate_required([])
  end
end
