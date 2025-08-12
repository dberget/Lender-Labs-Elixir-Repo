defmodule SharkAttack.Repo.Migrations.AddCollectionDurationApy do
  use Ecto.Migration

  def change do
    alter table(:collections) do
      add :apy, :integer
      add :duration, :integer

      remove :rain_address
    end
  end
end
