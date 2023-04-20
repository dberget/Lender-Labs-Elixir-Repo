# defmodule SharkAttackWeb.LoanPlanLiveTest do
#   use SharkAttackWeb.ConnCase

#   import Phoenix.LiveViewTest
#   import SharkAttack.LoansFixtures

#   @create_attrs %{}
#   @update_attrs %{}
#   @invalid_attrs %{}

#   defp create_loan_plan(_) do
#     loan_plan = loan_plan_fixture()
#     %{loan_plan: loan_plan}
#   end

#   describe "Index" do
#     setup [:create_loan_plan]

#     test "lists all loan_plans", %{conn: conn} do
#       {:ok, _index_live, html} = live(conn, Routes.loan_plan_index_path(conn, :index))

#       assert html =~ "Listing Loan plans"
#     end

#     test "saves new loan_plan", %{conn: conn} do
#       {:ok, index_live, _html} = live(conn, Routes.loan_plan_index_path(conn, :index))

#       assert index_live |> element("a", "New Loan plan") |> render_click() =~
#                "New Loan plan"

#       assert_patch(index_live, Routes.loan_plan_index_path(conn, :new))

#       assert index_live
#              |> form("#loan_plan-form", loan_plan: @invalid_attrs)
#              |> render_change() =~ "can&#39;t be blank"

#       {:ok, _, html} =
#         index_live
#         |> form("#loan_plan-form", loan_plan: @create_attrs)
#         |> render_submit()
#         |> follow_redirect(conn, Routes.loan_plan_index_path(conn, :index))

#       assert html =~ "Loan plan created successfully"
#     end

#     test "updates loan_plan in listing", %{conn: conn, loan_plan: loan_plan} do
#       {:ok, index_live, _html} = live(conn, Routes.loan_plan_index_path(conn, :index))

#       assert index_live |> element("#loan_plan-#{loan_plan.id} a", "Edit") |> render_click() =~
#                "Edit Loan plan"

#       assert_patch(index_live, Routes.loan_plan_index_path(conn, :edit, loan_plan))

#       assert index_live
#              |> form("#loan_plan-form", loan_plan: @invalid_attrs)
#              |> render_change() =~ "can&#39;t be blank"

#       {:ok, _, html} =
#         index_live
#         |> form("#loan_plan-form", loan_plan: @update_attrs)
#         |> render_submit()
#         |> follow_redirect(conn, Routes.loan_plan_index_path(conn, :index))

#       assert html =~ "Loan plan updated successfully"
#     end

#     test "deletes loan_plan in listing", %{conn: conn, loan_plan: loan_plan} do
#       {:ok, index_live, _html} = live(conn, Routes.loan_plan_index_path(conn, :index))

#       assert index_live |> element("#loan_plan-#{loan_plan.id} a", "Delete") |> render_click()
#       refute has_element?(index_live, "#loan_plan-#{loan_plan.id}")
#     end
#   end

#   describe "Show" do
#     setup [:create_loan_plan]

#     test "displays loan_plan", %{conn: conn, loan_plan: loan_plan} do
#       {:ok, _show_live, html} = live(conn, Routes.loan_plan_show_path(conn, :show, loan_plan))

#       assert html =~ "Show Loan plan"
#     end

#     test "updates loan_plan within modal", %{conn: conn, loan_plan: loan_plan} do
#       {:ok, show_live, _html} = live(conn, Routes.loan_plan_show_path(conn, :show, loan_plan))

#       assert show_live |> element("a", "Edit") |> render_click() =~
#                "Edit Loan plan"

#       assert_patch(show_live, Routes.loan_plan_show_path(conn, :edit, loan_plan))

#       assert show_live
#              |> form("#loan_plan-form", loan_plan: @invalid_attrs)
#              |> render_change() =~ "can&#39;t be blank"

#       {:ok, _, html} =
#         show_live
#         |> form("#loan_plan-form", loan_plan: @update_attrs)
#         |> render_submit()
#         |> follow_redirect(conn, Routes.loan_plan_show_path(conn, :show, loan_plan))

#       assert html =~ "Loan plan updated successfully"
#     end
#   end
# end
