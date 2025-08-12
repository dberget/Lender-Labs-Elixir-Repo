defmodule SharkAttack.Repo.Migrations.AutoClose do
  use Ecto.Migration

  def change do
    create_if_not_exists table(:auto_close) do
      add(:user_address, :string)
      add(:pool_address, :string)
      add(:position_address, :string)
      add(:sell_direction, :string)
      add(:exit_bin_id, :integer)
      add(:nonce_account, :string)
      add(:encoded_transaction, :text)
      add(:status, :string)
      add(:metadata, :map)
      timestamps()
    end
  end
end
