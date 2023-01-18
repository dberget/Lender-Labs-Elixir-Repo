defmodule SharkAttack.Repo.Migrations.CreateCollections do
  use Ecto.Migration

  def change do
    create table(:collections) do
      add :name, :string
      add :address, :string
      add :apy, :integer
      add :duration, :integer

      timestamps()
    end
  end
end
