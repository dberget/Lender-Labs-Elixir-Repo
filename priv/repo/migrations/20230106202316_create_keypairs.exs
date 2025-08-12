defmodule SharkAttack.Repo.Migrations.CreateKeypairs do
  use Ecto.Migration

  def change do
    create table(:keypairs, primary_key: false) do
      add :public_key, :string, primary_key: true
      add :private_key, :binary

      timestamps()
    end
  end
end
