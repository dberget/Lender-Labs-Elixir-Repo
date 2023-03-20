defmodule SharkAttack.Repo.Migrations.AddOffers do
  use Ecto.Migration

  def change do
    create_if_not_exists table(:offers) do
      add(:rescinded, :integer)
      add(:taken, :integer)

      add(:collection_id, references(:collections))
      add(:amount, :float)
      add(:lender, :string)
      add(:loan_address, :string)

      timestamps()
    end
  end
end
