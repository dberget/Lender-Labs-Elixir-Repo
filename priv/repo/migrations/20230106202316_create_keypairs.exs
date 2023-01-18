defmodule SharkAttack.Repo.Migrations.CreateKeypairs do
  use Ecto.Migration

  def change do
    create table(:keypairs) do
      add :public_key, :string
      add :private_key, :binary

      timestamps()
    end
  end
end
