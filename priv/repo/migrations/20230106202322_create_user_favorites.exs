defmodule SharkAttack.Repo.Migrations.CreateFavorites do
  use Ecto.Migration

  def change do
    create table(:favorites) do
      add(:user_address, references(:users, column: :address, type: :string))
      add(:collection_id, references(:collections))

      timestamps()
    end
  end
end
