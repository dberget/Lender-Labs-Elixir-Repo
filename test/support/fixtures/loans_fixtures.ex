defmodule SharkAttack.LoansFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `SharkAttack.Loans` context.
  """

  @doc """
  Generate a loan_plan.
  """
  def loan_plan_fixture(attrs \\ %{}) do
    {:ok, loan_plan} =
      attrs
      |> Enum.into(%{

      })
      |> SharkAttack.Loans.create_loan_plan()

    loan_plan
  end

  @doc """
  Generate a loan_data.
  """
  def loan_data_fixture(attrs \\ %{}) do
    {:ok, loan_data} =
      attrs
      |> Enum.into(%{

      })
      |> SharkAttack.Loans.create_loan_data()

    loan_data
  end
end
