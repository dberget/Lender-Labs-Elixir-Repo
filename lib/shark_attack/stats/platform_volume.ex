defmodule SharkAttack.Stats.PlatformVolume do
  use Ecto.Schema

  @primary_key false
  @derive {Jason.Encoder, only: [:platform, :day, :total_amountSol]}
  schema "platform_volume_by_day" do
    field(:platform, :string)
    field(:day, :date)
    field(:total_amountSol, :float)
  end
end
