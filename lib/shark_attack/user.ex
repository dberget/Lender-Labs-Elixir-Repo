defmodule SharkAttack.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:address, :string, []}
  schema "users" do
    field :discordId, :string

    timestamps()
  end

  @doc false
  def changeset(accounts, attrs) do
    accounts
    |> cast(attrs, [:address, :discordId])
    |> validate_required([:address])
  end
end
