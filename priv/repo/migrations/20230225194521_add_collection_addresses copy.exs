defmodule SharkAttack.Repo.Migrations.AddCollectionAddresses do
  use Ecto.Migration

  def change do
    alter table(:collections) do
      add :foxy_address, :string
      add :rain_address, :string

      remove :apy
      remove :duration
    end
  end
end
