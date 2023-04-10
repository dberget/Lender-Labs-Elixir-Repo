defmodule SharkAttackWeb.EventController do
  use SharkAttackWeb, :controller
  require Logger

  @dao_webook_addresses ["4skxqydEdR5C1BMshJKmVW1D6sxvZPK9ABVFPuBSsWbK"]

  def index(conn, params) do
    event = Map.get(params, "_json") |> hd

    queue_message(event)
    SharkAttack.LoansWorker.update_loan(event, event["type"])

    conn
    |> json(%{message: "ok"})
  end

  defp queue_message(event) do
    SharkAttack.Notifications.Producer.add(event)
  end
end
