defmodule SharkAttack.Repo.Migrations.AddBnpl do
  use Ecto.Migration

  def change do
    create_if_not_exists table(:bnpls) do
      add(:loan_id, :string)
      add(:mint, :string)
      add(:listing_price, :integer)

      timestamps()
    end
  end
end
