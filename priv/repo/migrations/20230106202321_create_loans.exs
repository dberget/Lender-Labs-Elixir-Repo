defmodule SharkAttack.Repo.Migrations.CreateLoan do
  use Ecto.Migration

  def change do
    create table(:loans, primary_key: false) do
      add(:loan, :string, primary_key: true)
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
      add(:dateOffered, :date)
      add(:dateTaken, :date)
      add(:dateRepaid, :date)
      add(:dateForeclosed, :date)
      add(:offerTxId, :string)
      add(:rescindTxId, :string)
      add(:takeTxId, :string)
      add(:repayTxId, :string)
      add(:forecloseTxId, :string)

      timestamps()
    end
  end
end
