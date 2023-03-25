defmodule SharkAttack.Repo.Migrations.AddFeesColumn do
  use Ecto.Migration

  def change do
    alter table(:loans) do
      add(:fees, :float)
      add(:total_owed, :float)
    end
  end
end
