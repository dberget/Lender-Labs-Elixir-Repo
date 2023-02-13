defmodule SharkAttack.Loans.Loan do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder,
           only: [
             :loan,
             :lender,
             :amountSol,
             :borrower,
             :earnings,
             :length,
             :nftCollateralMint,
             :orderBook,
             :dateOffered,
             :dateTaken,
             :dateRepaid,
             :dateForeclosed,
             :offerTxId,
             :takeTxId,
             :repayTxId,
             :forecloseTxId
           ]}
  schema "loans" do
    field(:loan, :string)
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
    field(:dateOffered, :naive_datetime)
    field(:dateTaken, :naive_datetime)
    field(:dateRepaid, :naive_datetime)
    field(:dateForeclosed, :naive_datetime)
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
