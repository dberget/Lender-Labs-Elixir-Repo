defmodule SharkAttack.Frakt do
  def get_bonds_preview() do
    SharkAttack.Helpers.do_get_request(
      "https://api.banx.gg/bonds/preview?isPrivate=false&getAll=true"
    )
  end

  def save_frakt_collections do
    pools = get_bonds_preview()

    Enum.map(pools["data"], fn pool ->
      data = %{
        name: pool["collectionName"],
        frakt_address: pool["marketPubkey"]
      }

      SharkAttack.Collections.get_and_update_collection(data)
    end)
    |> Enum.reject(&is_nil(&1))
  end
end
