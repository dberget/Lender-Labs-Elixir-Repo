defmodule SharkAttack.Repo.Migrations.AddLoansTaken do
  use Ecto.Migration

  def change do
    create_if_not_exists table(:loans_taken) do
      add(:borrower, :string)
      add(:address, :string)

      add(:collection_id, references(:collections))
      add(:platform, :string)
      add(:amount, :float)
      add(:is_extension, :boolean)

      timestamps()
    end
  end
end
