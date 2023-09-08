defmodule SharkAttack.Repo.Migrations.AddAutoRescindMaxLtf do
  use Ecto.Migration

  def change do
    alter table(:auto_rescind) do
      add(:max_ltf, :float)
    end
  end
end
