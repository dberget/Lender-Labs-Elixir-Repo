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
    field(:user_address, :string)

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
