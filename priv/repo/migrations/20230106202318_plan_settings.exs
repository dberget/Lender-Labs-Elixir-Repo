defmodule SharkAttack.Repo.Migrations.CreatePlanSettings do
  use Ecto.Migration

  def change do
    create table(:plan_settings) do
      add :max_ltf, :float
      add :target_ltf, :float
      add :style, :string

      add :collection_id, references(:collections)

      timestamps()
    end
  end
end
