defmodule SharkAttack.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:address, :discordId]}
  @primary_key {:address, :string, []}
  schema "users" do
    field(:discordId, :integer)

    has_many(:user_wallets, SharkAttack.Accounts.UserWallet,
      foreign_key: :user_address,
      references: :address
    )

    has_one(:user_settings, SharkAttack.Accounts.UserSetting,
      foreign_key: :user_address,
      references: :address
    )

    timestamps()
  end

  @doc false
  def changeset(accounts, attrs) do
    accounts
    |> cast(attrs, [:address, :discordId])
    |> validate_required([:address])
  end
end
