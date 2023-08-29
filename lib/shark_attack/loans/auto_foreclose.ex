defmodule SharkAttack.Loans.AutoForeclose do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder,
         only: [
           :user_address,
           :loan_id,
           :nonce_account,
           :encoded_transaction,
           :end_time,
           :status
         ]}
  schema "auto_foreclose" do
    field(:user_address, :string)
    field(:loan_id, :string)
    field(:nonce_account, :string)
    field(:encoded_transaction, :string)
    field(:end_time, :utc_datetime)
    field(:status, :string)

    timestamps()
  end

  @doc false
  def changeset(params, attrs) do
    params
    |> cast(attrs, [:user_address, :loan_id, :nonce_account, :encoded_transaction, :end_time, :status])
    |> validate_required([])
    |> unique_constraint(:nonce_account)
  end
end
