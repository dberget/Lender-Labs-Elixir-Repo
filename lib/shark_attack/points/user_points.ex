defmodule SharkAttack.Points.UserPoints do
  use Ecto.Schema

  @primary_key false
  @derive {Jason.Encoder, only: [:address, :total_amount]}
  schema "points" do
    field(:address, :string)
    field(:total_amount, :float)
    field(:borrow_total, :float)
    field(:lend_total, :float)
  end
end
