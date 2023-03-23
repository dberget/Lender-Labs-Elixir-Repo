defmodule SharkAttack.Repo.Migrations.AddPlatformAndStatusToLoans do
  use Ecto.Migration

  def change do
    alter table(:loans) do
      add(:status, :string)
      add(:platform, :string)

      remove(:rescindTxId)
    end
  end
end
