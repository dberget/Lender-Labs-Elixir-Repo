defmodule SharkAttack.Repo.Migrations.AddUserSettingsUserSubAddresses do
  use Ecto.Migration

  def change do
    create_if_not_exists table(:user_settings) do
      add :loan_taken, :integer
      add :loan_repaid, :integer
      add :loan_foreclosure, :integer
      add :ltf_alert, :integer
      add :summary_report, :integer
      add :frakt_raffles, :integer

      add :user_address, references(:users, column: :address, type: :string)

      timestamps()
    end

    create_if_not_exists table(:user_wallets) do
      add :user_address, references(:users, column: :address, type: :string)
      add :address, :string

      timestamps()
    end
  end
end
