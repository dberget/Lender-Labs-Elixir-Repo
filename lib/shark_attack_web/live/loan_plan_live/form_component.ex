defmodule SharkAttackWeb.LoanPlanLive.FormComponent do
  # use SharkAttackWeb, :live_component

  # alias SharkAttack.Loans

  # @impl true
  # def update(%{loan_plan: loan_plan} = assigns, socket) do
  #   changeset = Loans.change_plan_settings(%SharkAttack.Loans.PlanSettings{})
  #   lp_changeset = Loans.change_loan_plan(loan_plan)

  #   collections = SharkAttack.Collections.list_collections() |> Enum.map(&{&1.name, &1.id})

  #   {:ok,
  #    socket
  #    |> assign(assigns)
  #    |> assign(:plan_settings, %SharkAttack.Loans.PlanSettings{})
  #    |> assign(:collections, collections)
  #    |> assign(:changeset, changeset)
  #    |> assign(:lp_changeset, lp_changeset)}
  # end

  # @impl true
  # def handle_event("validate", %{"plan_settings" => plan_settings_params}, socket) do
  #   changeset =
  #     socket.assigns.plan_settings
  #     |> Loans.change_plan_settings(plan_settings_params)
  #     |> Map.put(:action, :validate)

  #   {:noreply, assign(socket, :changeset, changeset)}
  # end

  # def handle_event("save", %{"loan_plan" => loan_plan_params}, socket) do
  #   save_loan_plan(socket, socket.assigns.action, loan_plan_params)
  # end

  # defp save_loan_plan(socket, :edit, loan_plan_params) do
  #   case Loans.update_loan_plan(socket.assigns.loan_plan, loan_plan_params) do
  #     {:ok, _loan_plan} ->
  #       {:noreply,
  #        socket
  #        |> put_flash(:info, "Loan plan updated successfully")
  #        |> push_redirect(to: socket.assigns.return_to)}

  #     {:error, %Ecto.Changeset{} = changeset} ->
  #       {:noreply, assign(socket, :changeset, changeset)}
  #   end
  # end

  # defp save_loan_plan(socket, :new, loan_plan_params) do
  #   case Loans.create_loan_plan(loan_plan_params) do
  #     {:ok, _loan_plan} ->
  #       {:noreply,
  #        socket
  #        |> put_flash(:info, "Loan plan created successfully")
  #        |> push_redirect(to: socket.assigns.return_to)}

  #     {:error, %Ecto.Changeset{} = changeset} ->
  #       {:noreply, assign(socket, changeset: changeset)}
  #   end
  # end
end
