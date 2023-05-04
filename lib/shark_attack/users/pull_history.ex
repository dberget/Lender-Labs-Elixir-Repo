defmodule SharkAttack.Accounts.PullHistory do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder,
           only: [
             :address,
             :sharky_borrow,
             :sharky_lend,
             :citrus,
             :frakt,
             :updated_at
           ]}
  schema "pull_history" do
    field(:address, :string)
    field(:sharky_borrow, :boolean)
    field(:sharky_lend, :boolean)
    field(:citrus, :boolean)
    field(:frakt, :boolean)

    timestamps()
  end

  @doc false
  def changeset(pull_history, attrs) do
    pull_history
    |> cast(attrs, [
      :address,
      :sharky_borrow,
      :sharky_lend,
      :citrus,
      :frakt,
      :updated_at
    ])
    |> validate_required([:address])
  end
end
