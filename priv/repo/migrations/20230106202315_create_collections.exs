defmodule SharkAttack.Repo.Migrations.CreateCollections do
  use Ecto.Migration

  def change do
    create table(:collections) do
      add :sharky_address, :string
      add :name, :string
      add :apy, :integer
      add :duration, :integer
      add :frakt_address, :string
      add :hyperspace_id, :string

      timestamps()
    end
  end
end
