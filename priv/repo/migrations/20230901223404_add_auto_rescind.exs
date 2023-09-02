defmodule SharkAttack.Repo.Migrations.AddAutoRescind do
  use Ecto.Migration

  def change do
    create_if_not_exists table(:auto_rescind) do
      add(:user_address, :string)
      add(:loan_id, :string)
      add(:nonce_account, :string)
      add(:encoded_transaction, :text)
      add(:end_time, :utc_datetime)
      add(:status, :string)
      timestamps()
    end
  end
end
