defmodule SharkAttack.Keypair do
  use Ecto.Schema
  import Ecto.Changeset

  schema "keypairs" do
    field :private_key, SharkAttack.Encrypted.Binary
    field :public_key, :string

    timestamps()
  end

  @doc false
  def changeset(keypair, attrs) do
    keypair
    |> cast(attrs, [:public_key, :private_key])
    |> validate_required([:public_key, :private_key])
  end
end
