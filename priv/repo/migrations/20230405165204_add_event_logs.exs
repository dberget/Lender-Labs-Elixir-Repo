defmodule SharkAttack.Repo.Migrations.AddEventLogs do
  use Ecto.Migration

  def change do
    alter table(:collections) do
      add :hide, :boolean, default: false
    end

    create_if_not_exists table(:event_notifications) do
      add(:discord_id, :integer)
      add(:signature, :string)
      add(:sent, :boolean)
      add(:error, :text)

      timestamps()
    end
  end
end
