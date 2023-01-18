defmodule SharkAttackWeb.LoanPlanLive.Index do
  use SharkAttackWeb, :live_view

  alias SharkAttack.Loans.PlanSettings
  alias SharkAttack.Loans
  alias SharkAttack.Loans.LoanPlan

  @impl true
  def mount(_params, _session, socket) do
    {:ok, assign(socket, :loan_plans, list_loan_plans())}
  end

  @impl true
  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  defp apply_action(socket, :edit, %{"id" => id}) do
    socket
    |> assign(:page_title, "Edit Loan plan")
    |> assign(:loan_plan, Loans.get_loan_plan!(id))
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:page_title, "New Loan plan")
    |> assign(:plan_settings, %PlanSettings{})
    |> assign(:loan_plan, %LoanPlan{})
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "Listing Loan plans")
    |> assign(:loan_plan, nil)
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    loan_plan = Loans.get_loan_plan!(id)
    {:ok, _} = Loans.delete_loan_plan(loan_plan)

    {:noreply, assign(socket, :loan_plans, list_loan_plans())}
  end

  defp list_loan_plans do
    Loans.list_loan_plans()
  end
end
