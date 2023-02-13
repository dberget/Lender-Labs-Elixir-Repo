defmodule SharkAttack.Repo.Migrations.CreateLoan do
  use Ecto.Migration

  def change do
    create table(:loans) do
      add(:loan, :string)
      add(:amountSol, :float)
      add(:borrower, :string)
      add(:lender, :string)
      add(:earnings, :float)
      add(:end, :integer)
      add(:isForeclosable, :boolean)
      add(:length, :integer)
      add(:nftCollateralMint, :string)
      add(:orderBook, :string)
      add(:start, :integer)
      add(:dateOffered, :naive_datetime)
      add(:dateTaken, :naive_datetime)
      add(:dateRepaid, :naive_datetime)
      add(:dateForeclosed, :naive_datetime)
      add(:offerTxId, :string)
      add(:rescindTxId, :string)
      add(:takeTxId, :string)
      add(:repayTxId, :string)
      add(:forecloseTxId, :string)

      timestamps()
    end

    create unique_index(:loans, [:loan], name: :unique_loan)
  end
end
