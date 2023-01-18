defmodule SharkAttack.LoansTest do
  use SharkAttack.DataCase

  alias SharkAttack.Loans

  describe "loan_plans" do
    alias SharkAttack.Loans.LoanPlan

    import SharkAttack.LoansFixtures

    @invalid_attrs %{}

    test "list_loan_plans/0 returns all loan_plans" do
      loan_plan = loan_plan_fixture()
      assert Loans.list_loan_plans() == [loan_plan]
    end

    test "get_loan_plan!/1 returns the loan_plan with given id" do
      loan_plan = loan_plan_fixture()
      assert Loans.get_loan_plan!(loan_plan.id) == loan_plan
    end

    test "create_loan_plan/1 with valid data creates a loan_plan" do
      valid_attrs = %{}

      assert {:ok, %LoanPlan{} = loan_plan} = Loans.create_loan_plan(valid_attrs)
    end

    test "create_loan_plan/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Loans.create_loan_plan(@invalid_attrs)
    end

    test "update_loan_plan/2 with valid data updates the loan_plan" do
      loan_plan = loan_plan_fixture()
      update_attrs = %{}

      assert {:ok, %LoanPlan{} = loan_plan} = Loans.update_loan_plan(loan_plan, update_attrs)
    end

    test "update_loan_plan/2 with invalid data returns error changeset" do
      loan_plan = loan_plan_fixture()
      assert {:error, %Ecto.Changeset{}} = Loans.update_loan_plan(loan_plan, @invalid_attrs)
      assert loan_plan == Loans.get_loan_plan!(loan_plan.id)
    end

    test "delete_loan_plan/1 deletes the loan_plan" do
      loan_plan = loan_plan_fixture()
      assert {:ok, %LoanPlan{}} = Loans.delete_loan_plan(loan_plan)
      assert_raise Ecto.NoResultsError, fn -> Loans.get_loan_plan!(loan_plan.id) end
    end

    test "change_loan_plan/1 returns a loan_plan changeset" do
      loan_plan = loan_plan_fixture()
      assert %Ecto.Changeset{} = Loans.change_loan_plan(loan_plan)
    end
  end
end
