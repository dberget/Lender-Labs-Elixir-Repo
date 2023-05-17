defmodule SharkAttack.Accounts.SavedSearch do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder,
           only: [
             :id,
             :user_address,
             :search,
             :name
           ]}
  schema "saved_searches" do
    belongs_to(:user, SharkAttack.Accounts.User,
      foreign_key: :user_address,
      references: :address,
      type: :string
    )

    field(:search, :map)
    field(:name, :string)

    timestamps()
  end

  @doc false
  def changeset(loan_plan, attrs) do
    loan_plan
    |> cast(attrs, [
      :user_address,
      :search,
      :name
    ])
    |> validate_required([:user_address, :search, :name])
  end
end
