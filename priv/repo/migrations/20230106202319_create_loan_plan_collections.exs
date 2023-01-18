defmodule SharkAttack.Repo.Migrations.CreatePlanCollections do
  use Ecto.Migration

  def change do
    create table(:plan_collections, primary_key: false) do
      add(:plan_settings_id, references(:plan_settings))
      add(:collection_id, references(:collections))
    end
  end
end
