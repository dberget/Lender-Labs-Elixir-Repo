defmodule SharkAttack.Repo.Migrations.CreateLoanPlans do
  use Ecto.Migration

  def change do
    create table(:loan_plans) do
      add(:plan_settings_id, references(:plan_settings))

      add :user_address, references(:users, column: :address, type: :string)

      add :keypair_pk, references(:keypairs, column: :public_key, type: :string)

      timestamps()
    end
  end
end
