defmodule SharkAttack.Repo.Migrations.AddCollectionVerifiedAddresses do
  use Ecto.Migration

  def change do
    alter table(:collections) do
      add :apy, :integer
      add :duration, :integer

      remove :rain_address
    end
  end
end
