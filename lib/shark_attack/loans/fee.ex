defmodule SharkAttack.Loans.LenderFee do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder,
         only: [
           :user_address,
           :loan_id,
           :nonce_account,
           :status
         ]}
  schema "lender_fee" do
    field(:user_address, :string)
    field(:loan_id, :string)
    field(:nonce_account, :string)
    field(:status, :string)

    timestamps()
  end

  @doc false
  def changeset(params, attrs) do
    params
    |> cast(attrs, [:user_address, :loan_id, :nonce_account, :status])
    |> validate_required([])
    |> unique_constraint(:nonce_account)
  end
end
