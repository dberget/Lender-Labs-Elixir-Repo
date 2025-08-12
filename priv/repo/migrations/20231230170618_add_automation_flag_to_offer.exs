defmodule SharkAttack.Repo.Migrations.AddAutomationFlagToOffer do
  use Ecto.Migration

  def change do
    alter table(:offers) do
      add :automation, :boolean, default: false
    end
  end
end
