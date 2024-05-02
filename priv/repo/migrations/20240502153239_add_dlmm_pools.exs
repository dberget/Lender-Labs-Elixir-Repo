defmodule SharkAttack.Repo.Migrations.AddDlmmPools do
  use Ecto.Migration

  def change do
    create_if_not_exists table(:dlmm_pools) do
      add(:address, :string)
      add(:name, :string)
      add(:mint_x, :string)
      add(:mint_y, :string)
      add(:reserve_x, :string)
      add(:reserve_y, :string)
      add(:bin_step, :integer)
      add(:base_fee_percentage, :string)
      add(:max_fee_percentage, :string)
    end
  end
end
