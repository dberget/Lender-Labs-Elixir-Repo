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
  end

  defp update_foreclose_status(loan_id, new_status) do
    post = SharkAttack.Repo.get_by(SharkAttack.Loans.AutoForeclose, loan_id: loan_id)

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
      Logger.info("Loan #{loan_id} is not ACTIVE, not updating status")
      :error
    end
  end

  def get_auto_foreclose_info(loan_id) do
    SharkAttack.Repo.get_by(SharkAttack.Loans.AutoForeclose, loan_id: loan_id)
  end

  def get_loans_to_foreclose(user_address) do
    # get all the loans in AutoForeclose that are ACTIVE and have a forecloseTime in the past
    query =
      from l in SharkAttack.Loans.AutoForeclose,
        where:
          l.status == "ACTIVE" and l.end_time < ^DateTime.utc_now() and
            l.user_address == ^user_address,
        select: l

    SharkAttack.Repo.all(query)
  end

  def get_loans_to_foreclose() do
    # get all the loans in AutoForeclose that are ACTIVE and have a forecloseTime in the past
    query =
      from l in SharkAttack.Loans.AutoForeclose,
        where: l.status == "ACTIVE" and l.end_time < ^DateTime.utc_now(),
        select: l

    SharkAttack.Repo.all(query)
  end

  def foreclose_loans([]), do: :ok

  def foreclose_loans(loans) do
    # for each loan, get the nonce account and send the transaction
    for loan <- loans do
      Logger.info("Foreclosing loan #{loan.loan_id}")

      SharkAttack.Helpers.do_post_request(
        "http://localhost:5001/foreclose_loan",
        %{encodedTx: loan.encoded_transaction, nonceAccount: loan.nonce_account}
      )
      |> parse_foreclose_response(loan)
    end
  end

  def close_nonce_account(loans) do
    for loan <- loans do
      Logger.info("Closing nonce account for loan #{loan.loan_id}")

      SharkAttack.Helpers.do_post_request(
        "http://localhost:5001/close_nonce",
        %{nonceAccount: loan.nonce_account}
      )
      |> parse_close_response(loan)
    end
  end

  defp parse_foreclose_response(
         %{"resp" => %{"txHash" => txHash, "closeNonceHash" => close_nonce_hash}},
         loan
       ) do
    Logger.info("loan #{loan.loan_id} with tx #{txHash} and close nonce tx #{close_nonce_hash}")

    update_foreclose_status(loan.loan_id, "FORECLOSED")

    :ok
  end

  defp parse_foreclose_response({:error, reason}, _) do
    Logger.warn("Error calling the node backend to foreclose loan, #{reason}")

    :error
  end

  defp parse_close_response(%{"resp" => %{"closeNonceHash" => close_nonce_hash}}, loan) do
    Logger.info("Nonce account closed for, #{loan.loan_id} with tx #{close_nonce_hash}")

    update_foreclose_status(loan.loan_id, "CANCELLED")

    :ok
  end

  defp parse_close_response({:error, reason}, _) do
    Logger.warn("Error calling the node backend to close the nonce account, #{reason}")

    :error
  end
end
