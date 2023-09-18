defmodule SharkAttack.Loans.PlanSettings do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder,
           only: [
             :id,
             :max_ltf,
             :collection_id,
             :max_amount,
             :min_amount,
             :style,
             :max_loans,
             :active
           ]}
  schema "plan_settings" do
    field(:style, :string)
    field(:max_ltf, :float)
    field(:target_ltf, :float)
    field(:max_amount, :float)

    field(:min_amount, :float)
    field(:max_loans, :integer)
    field(:active, :boolean, default: true)

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
    |> cast(attrs, [
      :user_address,
      :style,
      :max_ltf,
      :target_ltf,
      :collection_id,
      :max_amount,
      :min_amount,
      :max_loans,
      :active
    ])
    |> validate_number(:max_ltf, less_than: 100)
    |> validate_required([:user_address, :collection_id, :max_ltf])
  end
end
