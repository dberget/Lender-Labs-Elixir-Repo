defmodule SharkAttack.Raffles.Raffle do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder,
           only: [
             :id,
             :mint,
             :quantity,
             :end_date,
             :entry_cost,
             :status,
             :reward_transaction,
             :winner
           ]}
  schema "raffles" do
    field(:mint, :string)
    field(:quantity, :integer)
    field(:end_date, :utc_datetime)
    field(:entry_cost, :integer)
    field(:status, :string)
    field(:reward_transaction, :string)
    field(:winner, :string)

    has_many(:entries, SharkAttack.Raffles.Entry)

    timestamps()
  end

  def changeset(params, attrs) do
    params
    |> cast(attrs, [
      :mint,
      :quantity,
      :end_date,
      :entry_cost,
      :status,
      :reward_transaction,
      :winner
    ])
    |> validate_required([:mint, :quantity, :end_date, :entry_cost, :status])
  end
end
