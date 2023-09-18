defmodule SharkAttack.Repo.Migrations.AddMinAmountToPlans do
  use Ecto.Migration

  def change do
    alter table(:plan_settings) do
      add(:min_amount, :float)
      add(:max_loans, :integer)
      add(:active, :boolean, default: true)
    end
  end
end
