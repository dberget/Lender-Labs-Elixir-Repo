defmodule SharkAttack.Repo.Migrations.AddPlatformPoints do
  use Ecto.Migration

  def change do
    create_if_not_exists table(:point_entries) do
      add(:address, :string)
      add(:amount, :integer)

      add(:event_type, :string)

      timestamps()
    end

    create_if_not_exists table(:boosted_offers) do
      add(:offer_id, references(:offers))
      add(:multiple, :integer)

      timestamps()
    end
  end
end
