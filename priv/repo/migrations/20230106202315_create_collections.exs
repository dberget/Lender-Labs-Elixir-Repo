defmodule SharkAttack.Repo.Migrations.CreateCollections do
  use Ecto.Migration

  def change do
    create table(:collections, primary_key: false) do
      add :address, :string, primary_key: true
      add :name, :string
      add :apy, :integer
      add :duration, :integer

      timestamps()
    end
  end
end
