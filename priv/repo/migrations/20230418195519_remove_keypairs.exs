defmodule SharkAttack.Repo.Migrations.RemoveKeypairs do
  use Ecto.Migration

  def change do
    drop(table(:loan_plans))

    alter table(:plan_settings) do
      add(:user_address, references(:users, column: :address, type: :string))
    end
  end
end
