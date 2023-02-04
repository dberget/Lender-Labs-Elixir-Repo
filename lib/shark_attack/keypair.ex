defmodule SharkAttack.Keypair do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:public_key, :string, []}
  schema "keypairs" do
    field :private_key, SharkAttack.Encrypted.Binary

    timestamps()
  end

  @doc false
  def changeset(keypair, attrs) do
    keypair
    |> cast(attrs, [:public_key, :private_key])
    |> validate_required([:public_key, :private_key])
  end
end
