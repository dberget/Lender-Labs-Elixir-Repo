defmodule SharkAttack.Accounts.Favorites do
  use Ecto.Schema
  import Ecto.Changeset

  schema "favorites" do
    belongs_to(:user, SharkAttack.Accounts.User, foreign_key: :user_id, references: :address)

    belongs_to(:collection, SharkAttack.Loans.Collection,
      foreign_key: :collection_id,
      references: :address
    )

    timestamps()
  end

  @doc false
  def changeset(accounts, attrs) do
    accounts
    |> cast(attrs, [:user_id, :collection_id])
    |> validate_required([:user_id, :collection_id])
  end
end
