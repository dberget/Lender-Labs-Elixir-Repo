defmodule SharkAttack.Stats.ForecloseSummaryView do
  use Ecto.Schema

  @primary_key false
  @derive {Jason.Encoder,
           only: [
             :orderBook,
             :foreclose_count_7_days,
             :foreclose_count_14_days,
             :foreclose_count_30_days,
             :total_count_7_days,
             :total_count_14_days,
             :total_count_30_days
           ]}
  schema "foreclose_summary_view" do
    field(:orderBook, :string)
    field(:foreclose_count_7_days, :string)
    field(:foreclose_count_14_days, :string)
    field(:foreclose_count_30_days, :string)

    field(:total_count_7_days, :string)
    field(:total_count_14_days, :string)
    field(:total_count_30_days, :string)
  end
end
