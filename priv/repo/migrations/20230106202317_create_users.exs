defmodule SharkAttack.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users, primary_key: false) do
      add :address, :string, primary_key: true
      add :discordId, :integer

      timestamps()
    end
  end
end
