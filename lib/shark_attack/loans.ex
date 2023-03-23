defmodule SharkAttack.Loans do
  @moduledoc """
  The Loans context.
  """

  import Ecto.Query, warn: false

  alias Ecto.Changeset
  alias SharkAttack.LoansWorker
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

  def get_loan!(address), do: Repo.get_by(Loan, loan: address)

  def get_user_loan_plans(user_address) do
    Repo.all(LoanPlan, user_address: user_address) |> Repo.preload(:plan_settings)
  end

  def get_user!(address), do: Repo.get!(User, address)

  def get_loans_history!(address) do
    query =
      from(l in Loan,
        where: l.lender == ^address,
        select: l,
        where: not is_nil(l.dateRepaid) or not is_nil(l.dateForeclosed),
        order_by: [desc: coalesce(l.dateRepaid, l.dateForeclosed)]
      )

    Repo.all(query)
  end

  def get_loans_history!(address, "borrower") do
    query =
      from(l in Loan,
        where: l.borrower == ^address,
        select: l,
        where: not is_nil(l.dateRepaid) or not is_nil(l.dateForeclosed),
        order_by: [desc: coalesce(l.dateRepaid, l.dateForeclosed)]
      )

    Repo.all(query)
  end

  def get_loans_history!(address, limit) do
    query =
      from(l in Loan,
        where: l.lender == ^address,
        select: l,
        where: not is_nil(l.dateRepaid) or not is_nil(l.dateForeclosed),
        order_by: [desc: coalesce(l.dateForeclosed, l.dateRepaid)],
        limit: ^limit
      )

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

  def get_active_loans() do
    query =
      from l in Loan,
        where: is_nil(l.dateRepaid),
        where: is_nil(l.dateForeclosed)

    Repo.all(query)
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

  def create_if_not_exists_loan(attrs \\ %{}) do
    case Repo.get_by(Loan, loan: attrs["loan"]) do
      nil ->
        %Loan{loan: attrs["loan"]}
        |> Loan.changeset(attrs)
        |> Repo.insert(on_conflict: :nothing)

      _ ->
        :ok
    end
  end

  def create_or_update_loan(attrs \\ %{}) do
    case Repo.get_by(Loan, loan: attrs["loan"]) do
      nil ->
        %Loan{loan: attrs["loan"]}
        |> Loan.changeset(attrs)
        |> Repo.insert()

      post ->
        post
        |> Loan.changeset(attrs)
        |> Changeset.delete_change(:earnings)
        |> Repo.update()
    end
  end

  def get_loan(loan) do
    case LoansWorker.get_loan(loan) do
      {:ok, []} ->
        Repo.get_by(Loan, loan: loan)

      {:ok, loan} ->
        loan = List.first(loan)

        for {key, val} <- loan, into: %{} do
          {String.to_atom(key), val}
        end

      _ ->
        nil
    end
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
