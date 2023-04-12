defmodule SharkAttackWeb.EventController do
  use SharkAttackWeb, :controller
  require Logger

  def index(conn, params) do
    # event = Map.get(params, "_json") |> Jason.decode!()
    event = Map.get(params, "_json") |> List.first()

    SharkAttack.Events.insert_loan_event(
      event["type"],
      event["source"],
      event
    )

    SharkAttack.LoansWorker.update_loan(event, event["type"])

    # handle_message(event)

    conn
    |> json(%{message: "ok"})
  end
end
