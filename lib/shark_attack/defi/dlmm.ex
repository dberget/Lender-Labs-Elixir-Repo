defmodule SharkAttack.Defi.DLMM do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, except: [:__meta__, :__struct__]}
  schema "dlmm_pools" do
    field(:address, :string)
    field(:name, :string)
    field(:mint_x, :string)
    field(:mint_y, :string)
    # field(:mint_x_decimals, :string)
    # field(:mint_y_decimals, :string)
    field(:reserve_x, :string)
    field(:reserve_y, :string)
    field(:bin_step, :integer)
    field(:base_fee_percentage, :string)
    field(:max_fee_percentage, :string)
  end

  @doc false
  def changeset(params, attrs) do
    params
    |> cast(attrs, [
      :address,
      :name,
      :mint_x,
      :mint_y,
      # :mint_x_decimals,
      # :mint_Y_decimals,
      :reserve_x,
      :reserve_y,
      :bin_step,
      :base_fee_percentage,
      :max_fee_percentage
    ])
    |> validate_required([
      :address,
      :name,
      :mint_x,
      :mint_y,
      :reserve_x,
      :reserve_y,
      :bin_step,
      :base_fee_percentage,
      :max_fee_percentage
    ])
  end
end
