defmodule SharkAttack.Loans do
  @moduledoc """
  The Loans context.
  """

  import Ecto.Query, warn: false

  require Logger

  alias Ecto.Changeset
  alias SharkAttack.LoansWorker
  alias SharkAttack.Repo

  alias SharkAttack.Loans.{PlanSettings, Loan}

  alias SharkAttack.Accounts.User
  alias SharkAttack.Loans.LoanData

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
  def get_plan_settings!(id), do: Repo.get!(PlanSettings, id)

  def get_loan!(address), do: Repo.get_by(Loan, loan: address)

  def get_user_loan_plans(user_address) do
    Repo.all(PlanSettings, user_address: user_address)
  end

  def get_user!(address), do: Repo.get!(User, address)

  def get_loans_history!(address) do
    query =
      from(l in Loan,
        where: l.lender == ^address,
        select: l,
        where: l.status == "COMPLETE",
        order_by: [desc: coalesce(l.dateRepaid, l.dateForeclosed)]
      )

    Repo.all(query)
  end

  def get_loans_history(address, :week) do
    query =
      from(l in Loan,
        where: l.lender == ^address,
        select: l,
        where: l.status == "COMPLETE",
        where: coalesce(l.dateRepaid, l.dateForeclosed) > fragment("NOW() - INTERVAL 1 WEEK")
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

  def get_active_loans() do
    query =
      from(l in Loan,
        where: l.status == "ACTIVE",
        select: l
      )

    Repo.all(query)
  end

  def create_active_loan(attrs) do
    loan =
      attrs
      |> Map.drop(["earnings"])
      |> Map.put("platform", "SHARKY")
      |> Map.put("status", "ACTIVE")
      |> Map.put("fees", attrs["total_owed"] - attrs["amountSol"])

    %Loan{}
    |> Loan.changeset(loan)
    |> Repo.insert(on_conflict: :nothing)
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

  def update_or_insert_completed_loan(attrs \\ %{}) do
    loan = Repo.get_by(Loan, loan: attrs["loan"])

    cond do
      is_nil(loan) ->
        %Loan{loan: attrs["loan"]}
        |> Loan.changeset(attrs)
        |> Repo.insert()

      loan.status == "COMPLETE" ->
        :ok

      loan.status == "ACTIVE" ->
        loan
        |> Loan.changeset(attrs)
        |> Repo.update()

      true ->
        Logger.info(loan)
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
      {:ok, nil} ->
        case Repo.get_by(Loan, loan: loan) do
          nil -> %{}
          loan -> loan
        end

      {:ok, loan} ->
        for {key, val} <- loan, into: %{} do
          {String.to_atom(key), val}
        end

      _ ->
        %{}
    end
  end

  def create_plan_settings(attrs \\ %{}) do
    %PlanSettings{}
    |> PlanSettings.changeset(attrs)
    |> Repo.insert()
  end

  def update_plan_settings(%PlanSettings{} = loan_plan, attrs) do
    loan_plan
    |> PlanSettings.changeset(attrs)
    |> Repo.update()
  end

  def delete_plan_settings(%PlanSettings{} = loan_plan) do
    Repo.delete(loan_plan)
  end

  def change_loan_plan(%PlanSettings{} = loan_plan, attrs \\ %{}) do
    PlanSettings.changeset(loan_plan, attrs)
  end

  def change_plan_settings(%PlanSettings{} = plan_settings, attrs \\ %{}) do
    PlanSettings.changeset(plan_settings, attrs)
  end

  @doc """
  Returns the list of loan_data.

  ## Examples

      iex> list_loan_data()
      [%LoanData{}, ...]

  """
  def list_loan_data do
    Repo.all(LoanData)
  end

  @doc """
  Gets a single loan_data.

  Raises `Ecto.NoResultsError` if the Loan data does not exist.

  ## Examples

      iex> get_loan_data!(123)
      %LoanData{}

      iex> get_loan_data!(456)
      ** (Ecto.NoResultsError)

  """
  def get_loan_data!(id), do: Repo.get!(LoanData, id)

  @doc """
  Creates a loan_data.

  ## Examples

      iex> create_loan_data(%{field: value})
      {:ok, %LoanData{}}

      iex> create_loan_data(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_loan_data(attrs \\ %{}) do
    %LoanData{}
    |> LoanData.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a loan_data.

  ## Examples

      iex> update_loan_data(loan_data, %{field: new_value})
      {:ok, %LoanData{}}

      iex> update_loan_data(loan_data, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_loan_data(%LoanData{} = loan_data, attrs) do
    loan_data
    |> LoanData.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a loan_data.

  ## Examples

      iex> delete_loan_data(loan_data)
      {:ok, %LoanData{}}

      iex> delete_loan_data(loan_data)
      {:error, %Ecto.Changeset{}}

  """
  def delete_loan_data(%LoanData{} = loan_data) do
    Repo.delete(loan_data)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking loan_data changes.

  ## Examples

      iex> change_loan_data(loan_data)
      %Ecto.Changeset{data: %LoanData{}}

  """
  def change_loan_data(%LoanData{} = loan_data, attrs \\ %{}) do
    LoanData.changeset(loan_data, attrs)
  end
end
