defmodule SharkAttack.Repo.Migrations.CreateLoanPlans do
  use Ecto.Migration

  def change do
    create table(:loan_plans) do
      add(:plan_settings_id, references(:plan_settings))
      add(:keypair_id, references(:keypairs))
      add(:user_id, references(:users))

      timestamps()
    end
  end
end
