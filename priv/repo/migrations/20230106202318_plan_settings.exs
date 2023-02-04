defmodule SharkAttack.Repo.Migrations.CreatePlanSettings do
  use Ecto.Migration

  def change do
    create table(:plan_settings) do
      add :max_ltf, :float
      add :target_ltf, :float
      add :style, :string

      add :collection_address, references(:collections, column: :address, type: :string)

      timestamps()
    end
  end
end
