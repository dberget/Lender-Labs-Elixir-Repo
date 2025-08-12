defmodule SharkAttack.Loans.LenderFee do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder,
           only: [
             :user_address,
             :loan_id,
             :nonce_account,
             :status,
             :offer,
             :amount
           ]}
  schema "lender_fee" do
    field(:user_address, :string)

    belongs_to(
      :offer,
      SharkAttack.Loans.Offer,
      foreign_key: :loan_id,
      references: :loan_address,
      type: :string
    )

    field(:nonce_account, :string)
    field(:amount, :integer)
    field(:status, :string)

    timestamps()
  end

  @doc false
  def changeset(params, attrs) do
    params
    |> cast(attrs, [:user_address, :loan_id, :nonce_account, :status, :amount])
    |> validate_required([])
    |> unique_constraint(:nonce_account)
  end
end
