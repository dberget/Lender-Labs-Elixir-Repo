defmodule SharkAttack.Repo.Migrations.AddPlatformPointsPlatform do
  use Ecto.Migration

  def change do
    alter table(:point_entries) do
      add(:platform, :string)
    end
  end
end
