defmodule SharkAttack.Repo.Migrations.CreatePlanSettings do
  use Ecto.Migration

  def change do
    create table(:plan_settings) do
      add :max_ltf, :integer
      add :target_ltf, :integer
      add :style, :string

      timestamps()
    end
  end
end
