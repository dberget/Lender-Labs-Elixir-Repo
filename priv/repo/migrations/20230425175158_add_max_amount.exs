defmodule SharkAttack.Repo.Migrations.AddMaxAmount do
  use Ecto.Migration

  def change do
    alter table(:plan_settings) do
      add(:max_amount, :float)
    end
  end
end
