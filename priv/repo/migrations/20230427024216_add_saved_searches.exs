defmodule SharkAttack.Repo.Migrations.AddSavedSearches do
  use Ecto.Migration

  def change do
    create_if_not_exists table(:saved_searches) do
      add(:user_address, references(:users, column: :address, type: :string))

      add :name, :string
      add :search, :map, default: %{}

      timestamps()
    end
  end
end
