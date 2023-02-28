defmodule SharkAttack.Repo.Migrations.AddCollectionVerifiedAddresses do
  use Ecto.Migration

  def change do
    alter table(:collections) do
      add :verified_creator_address, :string
    end
  end
end
