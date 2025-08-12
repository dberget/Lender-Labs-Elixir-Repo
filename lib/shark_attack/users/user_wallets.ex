defmodule SharkAttack.Accounts.UserWallet do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:address, :id]}
  schema "user_wallets" do
    belongs_to(:user, SharkAttack.Accounts.User,
      foreign_key: :user_address,
      references: :address,
      type: :string
    )

    field(:address, :string)

    timestamps()
  end

  @doc false
  def changeset(loan_plan, attrs) do
    loan_plan
    |> cast(attrs, [
      :user_address,
      :address
    ])
    |> validate_required([:user_address, :address])
  end
end
