defmodule SharkAttack.Repo.Migrations.CreateFavorites do
  use Ecto.Migration

  def change do
    create table(:favorites) do
      add(:user_address, references(:users, column: :address, type: :string))
      add(:collection_address, references(:collections, column: :address, type: :string))

      timestamps()
    end
  end
end
