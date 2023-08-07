defmodule SharkAttack.Frakt do
  def get_bonds_preview() do
    SharkAttack.Helpers.do_get_request("http://api.frakt.xyz/bonds/preview")
  end

  def save_frakt_collections do
    pools = get_bonds_preview()

    Enum.map(pools, fn pool ->
      data = %{
        name: pool["collectionName"],
        frakt_address: pool["marketPubkey"]
      }

      SharkAttack.Collections.get_and_update_collection(data)
    end)
  end
end
