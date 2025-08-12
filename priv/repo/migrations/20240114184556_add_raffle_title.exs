defmodule SharkAttack.Repo.Migrations.AddRaffleTitle do
  use Ecto.Migration

  def change do
    alter table(:raffles) do
      add :title, :string
    end
  end
end
