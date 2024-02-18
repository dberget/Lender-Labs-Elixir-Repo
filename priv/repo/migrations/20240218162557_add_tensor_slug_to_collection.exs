defmodule SharkAttack.Repo.Migrations.AddTensorSlugToCollection do
  use Ecto.Migration

  def change do
    alter table(:collections) do
      add(:tensor_slug, :string)
    end
  end
end