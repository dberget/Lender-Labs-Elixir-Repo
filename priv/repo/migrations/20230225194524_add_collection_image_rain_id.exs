defmodule SharkAttack.Repo.Migrations.AddCollectionVerifiedAddresses do
  use Ecto.Migration

  def change do
    alter table(:collections) do
      add :logo, :string
      add :rain_fi_id, :integer
    end
  end
end
