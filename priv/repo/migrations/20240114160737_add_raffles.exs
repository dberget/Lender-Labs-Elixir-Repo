defmodule SharkAttack.Repo.Migrations.AddRaffles do
  use Ecto.Migration

  def change do
    create_if_not_exists table(:raffles) do
      add(:mint, :string)
      add(:quantity, :int)
      add(:end_date, :utc_datetime)
      add(:entry_cost, :int)
      add(:status, :string)
      add(:reward_transaction, :string)
      add(:winner, :string)

      timestamps()
    end

    create_if_not_exists table(:raffle_entries) do
      add(:user, :string)
      add(:entries, :int)
      add(:raffle_id, references(:raffles))

      timestamps()
    end
  end
end
