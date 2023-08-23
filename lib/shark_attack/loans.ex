defmodule SharkAttack.Loans do
  @moduledoc """
  The Loans context.
  """

  import Ecto.Query, warn: false

  require Logger

  alias SharkAttack.Collections.Collection
  alias Ecto.Changeset
  alias SharkAttack.LoansWorker
  alias SharkAttack.Repo

  alias SharkAttack.Loans.{PlanSettings, Loan, TakenLoan}

  alias SharkAttack.Accounts.User

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
    query =
      from(p in PlanSettings,
        where: p.user_address == ^user_address,
        select: p
      )

    Repo.all(query)
  end

  def get_user!(address), do: Repo.get!(User, address)

  def insert_taken_loan(attrs) do
    changeset = TakenLoan.changeset(%TakenLoan{}, attrs)

    case Repo.insert(changeset) do
      {:ok, loan} ->
        Logger.info("Inserted taken loan")
        loan

      {:error, changeset} ->
        Logger.error("Error inserting taken loan: #{inspect(changeset)}")
        changeset
    end
  end

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

  def get_collection_foreclosures(id) do
    query =
      from(c in Collection,
        where: c.id == ^id,
        join: l in Loan,
        on: c.sharky_address == l.orderBook,
        select: l,
        where: not is_nil(l.dateForeclosed),
        order_by: [desc: l.dateForeclosed]
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

  def get_loans_history(address, :month) do
    query =
      from(l in Loan,
        where: l.lender == ^address,
        select: l,
        where: l.status == "COMPLETE",
        where: coalesce(l.dateRepaid, l.dateForeclosed) > fragment("NOW() - INTERVAL 1 MONTH")
      )

    Repo.all(query)
  end

  def get_loans_history(address, "borrower") do
    query =
      from(l in Loan,
        where: l.borrower == ^address,
        select: l,
        where: l.status == "COMPLETE",
        order_by: [desc: coalesce(l.dateRepaid, l.dateForeclosed)]
      )

    Repo.all(query)
  end

  def get_loans_history!(address, "borrower") do
    case SharkAttack.SimpleCache.get(__MODULE__, :get_loans_history, [address, "borrower"],
           ttl: 60 * 60
         ) do
      nil -> []
      loans -> loans
    end
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
      |> Map.put("platform", String.upcase(attrs["platform"]))
      |> Map.put("earnings", 0.0)
      |> Map.put("status", "ACTIVE")
      |> Map.put("length", attrs["duration"])
      |> Map.put("loan", attrs["pubkey"])
      |> Map.put("dateOffered", build_date_taken(attrs["offerTime"]))
      |> Map.put("dateTaken", build_date_taken(attrs["start"]))

    %Loan{}
    |> Loan.changeset(loan)
    |> Repo.insert(on_conflict: {:replace_all_except, [:id, :inserted_at]})
  end

  def build_date_taken(nil) do
    NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second)
  end

  def build_date_taken(start) do
    Timex.from_unix(start)
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

  def update_or_insert_repaid_loan(attrs, sig) do
    current_timestamp = NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second)

    attrs
    |> Map.put(:repayTxId, sig)
    |> Map.put(:dateRepaid, current_timestamp)
    |> update_or_insert_completed_loan()
  end

  def update_or_insert_foreclosed_loan(attrs, signature) do
    current_timestamp = NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second)

    attrs
    |> Map.drop([:earnings])
    |> Map.put(:forecloseTxId, signature)
    |> Map.put(:dateForeclosed, current_timestamp)
    |> update_or_insert_completed_loan()
  end

  def update_or_insert_completed_loans(loans) do
    chunks = Enum.chunk_every(loans, 2000)

    Enum.map(chunks, fn chunk ->
      Repo.insert_all(Loan, chunk,
        on_conflict: {:replace_all_except, [:id, :inserted_at, :earnings]}
      )
    end)
  end

  def update_or_insert_completed_loan(attrs \\ %{}) do
    loanAddress =
      Map.get(
        attrs,
        :loan,
        Map.get(attrs, "pubKey", Map.get(attrs, "pubkey", Map.get(attrs, "loan")))
      )

    loan = Repo.get_by(Loan, loan: loanAddress)

    cond do
      is_nil(loan) ->
        %Loan{loan: loanAddress}
        |> Loan.changeset(attrs)
        |> Changeset.put_change(:status, "COMPLETE")
        |> Changeset.put_change(
          :length,
          Map.get(
            attrs,
            :duration,
            Map.get(attrs, :length, Map.get(attrs, "length", Map.get(attrs, "duration")))
          )
        )
        |> Changeset.put_change(
          :platform,
          Map.get(attrs, :platform, Map.get(attrs, "platform")) |> String.upcase()
        )
        |> Repo.insert()

      loan.status == "COMPLETE" ->
        :ok

      loan.status == "ACTIVE" ->
        loan
        |> Loan.changeset(attrs)
        |> Changeset.put_change(:status, "COMPLETE")
        |> Repo.update()

      true ->
        nil
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
        loan =
          for {key, val} <- loan, into: %{} do
            {String.to_atom(key), val}
          end

        Map.put(loan, :loan, loan.pubkey)
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
end
