defmodule SharkAttack.Repo.Migrations.AddPlatformPoints do
  use Ecto.Migration

  def change do
    create_if_not_exists table(:point_entries) do
      add(:address, :string)
      add(:amount, :float)
      add(:source, :string)
      add(:event_type, :string)

      timestamps()
    end

    create_if_not_exists table(:boosted_offers) do
      add(:address, :string)
      add(:multiple, :integer)
      add(:payer, :string)

      timestamps()
    end
  end
end
