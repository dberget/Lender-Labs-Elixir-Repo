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
             :forecloseTxId,
             :collection_name,
             :total_owed,
             :fees
           ]}
  schema "loans" do
    field(:loan, :string)
    field(:amountSol, :float)
    field(:borrower, :string)
    field(:lender, :string)
    field(:earnings, :float)
    field(:fees, :float)
    field(:total_owed, :float)
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
    field(:takeTxId, :string)
    field(:repayTxId, :string)
    field(:forecloseTxId, :string)

    field(:status, :string)
    field(:platform, :string)

    field(:collection_name, :string, virtual: true)

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
      :total_owed,
      :fees,
      :dateOffered,
      :dateTaken,
      :dateRepaid,
      :dateForeclosed,
      :offerTxId,
      :takeTxId,
      :status,
      :platform,
      :repayTxId,
      :forecloseTxId
    ])
    |> validate_required([])
  end
end
