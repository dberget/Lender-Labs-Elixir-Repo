defmodule SharkAttack.Repo.Migrations.AddOrderbookTable do
  use Ecto.Migration

  def change do
    create_if_not_exists table(:orderbooks) do
      add(:collection_id, references(:collections))
      add(:public_key, :string)
      add(:platform, :string)
      add(:duration, :integer)
      add(:apy, :integer)
    end
  end
end
