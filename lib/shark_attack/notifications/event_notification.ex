defmodule SharkAttack.Notifications.EventNotification do
  use Ecto.Schema
  import Ecto.Changeset

  schema "event_notifications" do
    field(:discord_id, :integer)
    field(:signature, :string)
    field(:sent, :boolean)
    field(:error, :string)

    timestamps()
  end

  @doc false
  def changeset(loan_plan, attrs) do
    loan_plan
    |> cast(attrs, [
      :discord_id,
      :signature,
      :sent,
      :error
    ])
    |> validate_required([])
  end
end
