defmodule SharkAttack.Repo.Migrations.CreateLenderFeeTable do
  use Ecto.Migration

  def change do
    create_if_not_exists table(:lender_fee) do
      add(:user_address, :string)
      add(:loan_id, :string)
      add(:nonce_account, :string)
      add(:status, :string)
      timestamps()
    end
  end
end
