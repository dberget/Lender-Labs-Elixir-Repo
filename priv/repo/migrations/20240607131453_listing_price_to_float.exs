defmodule SharkAttack.Repo.Migrations.ListingPriceToFloat do
  use Ecto.Migration

  def up do
    alter table(:bnpls) do
      modify :listing_price, :float
    end
  end

  def down do
    alter table(:bnpls) do
      modify :listing_price, :integer
    end
  end
end