defmodule SharkAttack.Collections.TradingHistory do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder,
           only: [
             :id,
             :collection_id,
             :open,
             :close,
             :high,
             :low,
             :volume,
             :date
           ]}
  schema "trading_history" do
    belongs_to(:collection, SharkAttack.Collections.Collection)

    field(:open, :float)
    field(:close, :float)
    field(:high, :float)
    field(:low, :float)
    field(:volume, :float)
    field(:date, :integer)
  end

  @doc false
  def changeset(trading_history, attrs) do
    trading_history
    |> cast(attrs, [
      :collection_id,
      :open,
      :close,
      :high,
      :low,
      :volume,
      :date
    ])
  end
end
