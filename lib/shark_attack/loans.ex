defmodule SharkAttack.Loans do
  @moduledoc """
  The Loans context.
  """

  import Ecto.Query, warn: false

  alias SharkAttack.Loans.PlanSettings
  alias SharkAttack.Repo

  alias SharkAttack.Loans.{LoanPlan, Loan}

  alias SharkAttack.Accounts.User

  @doc """
  Returns the list of loan_plans.

  ## Examples

      iex> list_loan_plans()
      [%LoanPlan{}, ...]

  """
  def list_loan_plans do
    Repo.all(LoanPlan)
  end

  def list_loans do
    Repo.all(Loan)
  end

  @doc """
  Gets a single loan_plan.

  Raises `Ecto.NoResultsError` if the Loan plan does not exist.

  ## Examples

      iex> get_loan_plan!(123)
      %LoanPlan{}

      iex> get_loan_plan!(456)
      ** (Ecto.NoResultsError)

  """
  def get_loan_plan!(id), do: Repo.get!(LoanPlan, id)

  def get_loan!(address), do: Repo.get_by!(Loan, loan: address)

  def get_user_loan_plans(user_address) do
    Repo.all(LoanPlan, user_address: user_address) |> Repo.preload(:plan_settings)
  end

  def get_user!(address), do: Repo.get!(User, address)

  def get_loans_history!(address) do
    query =
      from l in Loan,
        where: l.lender == ^address,
        select: l

    Repo.all(query)
  end

  @doc """
  Creates a loan_plan.

  ## Examples

      iex> create_loan_plan(%{field: value})
      {:ok, %LoanPlan{}}

      iex> create_loan_plan(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_loan_plan(attrs \\ %{}) do
    %LoanPlan{}
    |> LoanPlan.changeset(attrs)
    |> Repo.insert()
  end

  def create_loan(attrs \\ %{}) do
    %Loan{}
    |> Loan.changeset(attrs)
    |> Repo.insert(on_conflict: :nothing)
  end

  def update_loan(%Loan{} = loan, attrs) do
    loan
    |> Loan.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Updates a loan_plan.

  ## Examples

      iex> update_loan_plan(loan_plan, %{field: new_value})
      {:ok, %LoanPlan{}}

      iex> update_loan_plan(loan_plan, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_loan_plan(%LoanPlan{} = loan_plan, attrs) do
    loan_plan
    |> LoanPlan.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a loan_plan.

  ## Examples

      iex> delete_loan_plan(loan_plan)
      {:ok, %LoanPlan{}}

      iex> delete_loan_plan(loan_plan)
      {:error, %Ecto.Changeset{}}

  """
  def delete_loan_plan(%LoanPlan{} = loan_plan) do
    Repo.delete(loan_plan)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking loan_plan changes.

  ## Examples

      iex> change_loan_plan(loan_plan)
      %Ecto.Changeset{data: %LoanPlan{}}

  """
  def change_loan_plan(%LoanPlan{} = loan_plan, attrs \\ %{}) do
    LoanPlan.changeset(loan_plan, attrs)
  end

  def change_plan_settings(%PlanSettings{} = plan_settings, attrs \\ %{}) do
    PlanSettings.changeset(plan_settings, attrs)
  end
end
