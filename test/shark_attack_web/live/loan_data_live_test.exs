defmodule SharkAttackWeb.LoanDataLiveTest do
  use SharkAttackWeb.ConnCase

  import Phoenix.LiveViewTest
  import SharkAttack.LoansFixtures

  @create_attrs %{}
  @update_attrs %{}
  @invalid_attrs %{}

  defp create_loan_data(_) do
    loan_data = loan_data_fixture()
    %{loan_data: loan_data}
  end

  describe "Index" do
    setup [:create_loan_data]

    test "lists all loan_data", %{conn: conn} do
      {:ok, _index_live, html} = live(conn, ~p"/loan_data")

      assert html =~ "Listing Loan data"
    end

    test "saves new loan_data", %{conn: conn} do
      {:ok, index_live, _html} = live(conn, ~p"/loan_data")

      assert index_live |> element("a", "New Loan data") |> render_click() =~
               "New Loan data"

      assert_patch(index_live, ~p"/loan_data/new")

      assert index_live
             |> form("#loan_data-form", loan_data: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      assert index_live
             |> form("#loan_data-form", loan_data: @create_attrs)
             |> render_submit()

      assert_patch(index_live, ~p"/loan_data")

      html = render(index_live)
      assert html =~ "Loan data created successfully"
    end

    test "updates loan_data in listing", %{conn: conn, loan_data: loan_data} do
      {:ok, index_live, _html} = live(conn, ~p"/loan_data")

      assert index_live |> element("#loan_data-#{loan_data.id} a", "Edit") |> render_click() =~
               "Edit Loan data"

      assert_patch(index_live, ~p"/loan_data/#{loan_data}/edit")

      assert index_live
             |> form("#loan_data-form", loan_data: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      assert index_live
             |> form("#loan_data-form", loan_data: @update_attrs)
             |> render_submit()

      assert_patch(index_live, ~p"/loan_data")

      html = render(index_live)
      assert html =~ "Loan data updated successfully"
    end

    test "deletes loan_data in listing", %{conn: conn, loan_data: loan_data} do
      {:ok, index_live, _html} = live(conn, ~p"/loan_data")

      assert index_live |> element("#loan_data-#{loan_data.id} a", "Delete") |> render_click()
      refute has_element?(index_live, "#loan_data-#{loan_data.id}")
    end
  end

  describe "Show" do
    setup [:create_loan_data]

    test "displays loan_data", %{conn: conn, loan_data: loan_data} do
      {:ok, _show_live, html} = live(conn, ~p"/loan_data/#{loan_data}")

      assert html =~ "Show Loan data"
    end

    test "updates loan_data within modal", %{conn: conn, loan_data: loan_data} do
      {:ok, show_live, _html} = live(conn, ~p"/loan_data/#{loan_data}")

      assert show_live |> element("a", "Edit") |> render_click() =~
               "Edit Loan data"

      assert_patch(show_live, ~p"/loan_data/#{loan_data}/show/edit")

      assert show_live
             |> form("#loan_data-form", loan_data: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      assert show_live
             |> form("#loan_data-form", loan_data: @update_attrs)
             |> render_submit()

      assert_patch(show_live, ~p"/loan_data/#{loan_data}")

      html = render(show_live)
      assert html =~ "Loan data updated successfully"
    end
  end
end
