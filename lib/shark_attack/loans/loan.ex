defmodule SharkAttack.Loans.Loan do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:loan, :string, []}
  schema "loans" do
    field(:amountSol, :float)
    field(:borrower, :string)
    field(:lender, :string)
    field(:earnings, :float)
    field(:end, :integer)
    field(:isForeclosable, :boolean)
    field(:length, :integer)
    field(:nftCollateralMint, :string)
    field(:orderBook, :string)
    field(:start, :integer)
    field(:dateOffered, :date)
    field(:dateTaken, :date)
    field(:dateRepaid, :date)
    field(:dateForeclosed, :date)
    field(:offerTxId, :string)
    field(:rescindTxId, :string)
    field(:takeTxId, :string)
    field(:repayTxId, :string)
    field(:forecloseTxId, :string)

    timestamps()
  end

  @doc false
  def changeset(loan_plan, attrs) do
    loan_plan
    |> cast(attrs, [
      :loan,
      :lender,
      :amountSol,
      :borrower,
      :earnings,
      :end,
      :isForeclosable,
      :length,
      :nftCollateralMint,
      :orderBook,
      :start,
      :dateOffered,
      :dateTaken,
      :dateRepaid,
      :dateForeclosed,
      :offerTxId,
      :rescindTxId,
      :takeTxId,
      :repayTxId,
      :forecloseTxId
    ])
    |> validate_required([])
  end
end
