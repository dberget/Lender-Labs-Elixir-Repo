defmodule SharkAttackWeb.EventController do
  use SharkAttackWeb, :controller
  require Logger

  def debug(conn, params) do
    event = Map.get(params, "_json") |> Jason.decode!()

    SharkAttack.Workers.LoanHandler.update_loan(event)

    conn
    |> json(%{message: "ok"})
  end

  def index(conn, params) do
    event = Map.get(params, "_json") |> List.first()

    # SharkAttack.Events.insert_loan_event(
    #   event["type"],
    #   event["source"],
    #   event
    # )

    SharkAttack.Workers.LoanHandler.update_loan(event)

    conn
    |> json(%{message: "ok"})
  end

  def purchase(conn, params) do
    SharkAttack.Users.create_user(%{address: params["transactionObject"]["meta"]["senderPK"]})

    conn
    |> json(%{message: "ok"})
  end
end
