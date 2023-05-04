defmodule SharkAttackWeb.PlanController do
  use SharkAttackWeb, :controller
  require Logger

  def index(conn, params) do
    user = SharkAttack.Users.get_user_from_address!(params["user_address"])

    plans = SharkAttack.Loans.get_user_loan_plans(user.address)

    conn
    |> json(plans)
  end

  def save(conn, params) do
    case SharkAttack.SharkyApi.verify(params["msg"], params["user_address"]) do
      %{"verify" => true} ->
        {:ok, plan} =
          %{"user_address" => params["user_address"]}
          |> Map.put("max_ltf", params["max_ltf"])
          |> Map.put("max_amount", params["max_amount"])
          |> Map.put("collection_id", params["collection_id"])
          |> SharkAttack.Loans.create_plan_settings()

        conn
        |> json(plan)

      _res ->
        conn
        |> json(%{"error" => "Invalid signature"})
    end
  end

  def update(conn, params) do
    case SharkAttack.SharkyApi.verify(params["msg"], params["user_address"]) do
      %{"verify" => true} ->
        {:ok, plan} =
          SharkAttack.Loans.get_plan_settings!(params["id"])
          |> SharkAttack.Loans.update_plan_settings(params)

        conn
        |> json(plan)

      _res ->
        conn
        |> json(%{"error" => "Invalid signature"})
    end
  end

  def delete(conn, params) do
    case SharkAttack.SharkyApi.verify(params["msg"], params["user_address"]) do
      %{"verify" => true} ->
        {:ok, plan} =
          SharkAttack.Loans.get_plan_settings!(params["id"])
          |> SharkAttack.Loans.delete_plan_settings()

        conn
        |> json(plan)

      _res ->
        conn
        |> json(%{"error" => "Invalid signature"})
    end
  end
end
