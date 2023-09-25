defmodule SharkAttack.Repo.Migrations.TradingHistory do
  use Ecto.Migration

  def change do
    create_if_not_exists table(:trading_history) do
      add(:collection_id, references(:collections))
      add(:open, :float)
      add(:close, :float)
      add(:high, :float)
      add(:low, :float)
      add(:volume, :float)
      add(:date, :integer)
    end
  end
end
