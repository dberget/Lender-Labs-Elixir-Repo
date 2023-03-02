defmodule SharkAttack.Collections.Collection do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder,
           only: [
             :id,
             :name,
             :sharky_address,
             :frakt_address,
             :foxy_address,
             :rain_address,
             :hyperspace_id,
             :verified_creator_address,
             :logo,
             :rain_fi_id,
             :loans,
             :offers
           ]}
  schema "collections" do
    field(:name, :string)

    field(:sharky_address, :string)
    field(:frakt_address, :string)
    field(:foxy_address, :string)
    field(:logo, :string)
    field(:rain_address, :string)
    field(:rain_fi_id, :integer)

    field :verified_creator_address, :string

    field(:hyperspace_id, :string)

    field(:loans, :map, virtual: true)
    field(:offers, :map, virtual: true)

    timestamps()
  end

  @doc false
  def changeset(collection, attrs) do
    collection
    |> cast(attrs, [
      :name,
      :sharky_address,
      :frakt_address,
      :hyperspace_id,
      :foxy_address,
      :rain_address,
      :verified_creator_address,
      :logo,
      :rain_fi_id
    ])
    |> validate_required([])
  end
end
