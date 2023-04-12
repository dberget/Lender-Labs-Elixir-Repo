defmodule SharkAttack.Repo.Migrations.AddLoanEvents do
  use Ecto.Migration

  def change do
    create_if_not_exists table(:loan_events) do
      add(:type, :string)
      add(:platform, :string)
      add(:signature, :string)
      add(:data, :text)

      timestamps()
    end
  end
end
