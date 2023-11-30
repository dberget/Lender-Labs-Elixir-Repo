defmodule SharkAttack.Repo.Migrations.AddFeeAmount do
  use Ecto.Migration

  def change do
    alter table(:lender_fee) do
      add(:amount, :int)
    end
  end
end
