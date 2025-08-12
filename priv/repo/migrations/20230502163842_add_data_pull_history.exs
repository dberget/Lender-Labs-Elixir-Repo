defmodule SharkAttack.Repo.Migrations.AddDataPullHistory do
  use Ecto.Migration

  def change do
    create_if_not_exists table(:pull_history) do
      add(:address, :string)

      add(:sharky_borrow, :boolean)
      add(:sharky_lend, :boolean)
      add(:citrus, :boolean)
      add(:frakt, :boolean)

      timestamps()
    end
  end
end
