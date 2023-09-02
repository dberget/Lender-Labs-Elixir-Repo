defmodule SharkAttack.AutoForeclose do
  alias SharkAttack.{Loans, Repo}
  alias SharkAttack.Loans.AutoForeclose
  alias Ecto.Changeset

  import Ecto.Query
  require Logger

  def get_and_foreclose_loans() do
    get_loans_to_foreclose() |> foreclose_loans()
  end

  def insert_auto_foreclose(user_address, loan_id, nonce_account, transaction) do
    loan = SharkAttack.Loans.get_loan(loan_id)

    %SharkAttack.Loans.AutoForeclose{}
    |> SharkAttack.Loans.AutoForeclose.changeset(%{
      user_address: user_address,
      loan_id: loan_id,
      nonce_account: nonce_account,
      encoded_transaction: transaction,
      end_time: DateTime.from_unix!(loan.end),
      status: "ACTIVE"
    })
    |> Repo.insert()

    :ok
  end

  defp update_foreclose_status(nonce_account, new_status) do
    post = SharkAttack.Repo.get_by(SharkAttack.Loans.AutoForeclose, nonce_account: nonce_account)

    if post.status == "ACTIVE" do
      post =
        post
        |> Changeset.change(%{status: new_status})
        |> Changeset.optimistic_lock(:version)

      case SharkAttack.Repo.update(post) do
        {:ok, struct} -> :ok
        {:error, changeset} -> :error
      end
    else
      Logger.info("Loan with nonce #{nonce_account} is not ACTIVE, not updating status")
      :error
    end
  end

  def get_auto_foreclose_info(nonce_account) do
    SharkAttack.Repo.get_by(SharkAttack.Loans.AutoForeclose, nonce_account: nonce_account)
  end

  def get_nonce_accounts(user_address) do
    query =
      from(l in SharkAttack.Loans.AutoForeclose,
        where: l.status == "ACTIVE" and l.user_address == ^user_address,
        select: l
      )

    SharkAttack.Repo.all(query)
    # map each loan to its nonce account
    |> Enum.map(fn loan -> %{"loan_id" => loan.loan_id, "nonce_account" => loan.nonce_account} end)
  end

  def get_loans_to_foreclose(user_address) do
    # get all the loans in AutoForeclose that are ACTIVE and have a forecloseTime in the past
    query =
      from(l in SharkAttack.Loans.AutoForeclose,
        where:
          l.status == "ACTIVE" and l.end_time < ^DateTime.utc_now() and
            l.user_address == ^user_address,
        select: l
      )

    SharkAttack.Repo.all(query)
  end

  def get_loans_to_foreclose() do
    # get all the loans in AutoForeclose that are ACTIVE and have a forecloseTime in the past
    query =
      from(l in SharkAttack.Loans.AutoForeclose,
        where: l.status == "ACTIVE" and l.end_time < ^DateTime.utc_now(),
        select: l
      )

    SharkAttack.Repo.all(query)
  end

  def foreclose_loans([]), do: :ok

  def foreclose_loans(loans) do
    # for each loan, get the nonce account and send the transaction
    for loan <- loans do
      fetched_loan = SharkAttack.Loans.get_loan(loan.loan_id)

      cond do
        !is_nil(Map.get(fetched_loan, :dateRepaid)) ->
          close_nonce_accounts([loan.nonce_account], "REPAID")

        !is_nil(Map.get(fetched_loan, :dateForeclosed)) ->
          close_nonce_accounts([loan.nonce_account], "FORECLOSED")

        true ->
          Logger.info("Foreclosing loan #{loan.loan_id}")

          SharkAttack.Helpers.do_post_request(
            "http://localhost:5001/foreclose_loan",
            %{encodedTx: loan.encoded_transaction, nonceAccount: loan.nonce_account}
          )
          |> parse_foreclose_response(loan)
      end
    end
  end

  def close_nonce_accounts(accounts, new_status \\ "CANCELLED") do
    for account <- accounts do
      Logger.info("Closing nonce account #{account}")

      SharkAttack.Helpers.do_post_request(
        "http://localhost:5001/close_nonce",
        %{nonceAccount: account}
      )
      |> parse_close_response(account, new_status)
    end
  end

  defp parse_foreclose_response(
         %{"resp" => %{"txHash" => txHash, "closeNonceHash" => close_nonce_hash}},
         loan
       ) do
    Logger.info("loan #{loan.loan_id} with tx #{txHash} and close nonce tx #{close_nonce_hash}")

    update_foreclose_status(loan.nonce_account, "AUTO_FORECLOSED")

    :ok
  end

  defp parse_foreclose_response(%{"resp" => %{"error" => reason}}, loan) do
    Logger.info("Unable to foreclose loan #{loan.loan_id} because #{reason}")
    :ok
  end

  defp parse_foreclose_response({:error, reason}, _) do
    Logger.warn("Error calling the node backend to foreclose loan, #{reason}")

    :error
  end

  defp parse_close_response(
         %{"resp" => %{"closeNonceHash" => close_nonce_hash}},
         nonce_account,
         new_status
       ) do
    Logger.info("Nonce account #{nonce_account} closed with tx #{close_nonce_hash}")

    update_foreclose_status(nonce_account, new_status)

    :ok
  end

  defp parse_close_response({:error, reason}, _, _) do
    Logger.warn("Error calling the node backend to close the nonce account, #{reason}")

    :error
  end
end
