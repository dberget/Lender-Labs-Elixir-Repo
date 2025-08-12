defmodule SharkAttack.Repo.Migrations.AddMeSlug do
  use Ecto.Migration

  def change do
    alter table(:collections) do
      add :me_slug, :string
    end
  end
end
