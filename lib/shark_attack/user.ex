defmodule SharkAttack.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :address, :string

    timestamps()
  end

  @doc false
  def changeset(accounts, attrs) do
    accounts
    |> cast(attrs, [:address])
    |> validate_required([:address])
  end
end
