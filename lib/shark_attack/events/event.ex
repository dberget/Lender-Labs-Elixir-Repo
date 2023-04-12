defmodule SharkAttack.Events.LoanEvents do
  use Ecto.Schema
  import Ecto.Changeset

  schema "loan_events" do
    field(:type, :string)
    field(:platform, :string)
    field(:signature, :string)
    field(:data, :string)

    timestamps()
  end

  @doc false
  def changeset(loan_plan, attrs) do
    loan_plan
    |> cast(attrs, [
      :type,
      :platform,
      :signature,
      :data
    ])
    |> validate_required([])
  end
end
