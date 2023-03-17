defmodule SharkAttack.Accounts.Favorites do
  use Ecto.Schema
  import Ecto.Changeset

  schema "favorites" do
    belongs_to(:user, SharkAttack.Accounts.User,
      foreign_key: :user_address,
      references: :address,
      type: :string
    )

    belongs_to(:collection, SharkAttack.Collections.Collection)

    timestamps()
  end

  @doc false
  def changeset(params, attrs) do
    params
    |> cast(attrs, [:user_address, :collection_id])
    |> validate_required([:user_address, :collection_id])
  end
end
