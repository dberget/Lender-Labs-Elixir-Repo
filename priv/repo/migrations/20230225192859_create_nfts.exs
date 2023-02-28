defmodule SharkAttack.Repo.Migrations.CreateNfts do
  use Ecto.Migration

  def change do
    create table(:nfts) do
      add :name, :string
      add :image, :string
      add :mint, :string
      add :collection_id, references(:collections, on_delete: :nothing)

      timestamps()
    end

    create unique_index(:nfts, [:mint])
    create index(:nfts, [:collection_id])
  end
end
