defmodule SharkAttack.LenderFee do
  alias SharkAttack.Repo
  alias SharkAttack.Loans.LenderFee
  alias Ecto.Changeset

  import Ecto.Query
  require Logger

  def batch_refund_and_collect_fees() do
    refund_fees()
    collect_fees()
  end

  def insert_lender_fee(user_address, loan_id, nonce_account, amount) do
    %LenderFee{}
    |> LenderFee.changeset(%{
      user_address: user_address,
      loan_id: loan_id,
      nonce_account: nonce_account,
      status: "ACTIVE",
      amount: amount
    })
    |> Repo.insert()

    :ok
  end

  defp update_lender_fee_status(nonce_account, new_status) do
    post = SharkAttack.Repo.get_by(LenderFee, nonce_account: nonce_account)

    if post.status == "ACTIVE" do
      post =
        post
        |> Changeset.change(%{status: new_status})
        |> Changeset.optimistic_lock(:version)

      case SharkAttack.Repo.update(post) do
        {:ok, _struct} -> :ok
        {:error, _changeset} -> :error
      end
    else
      Logger.info("Fee with nonce #{nonce_account} is not ACTIVE, not updating status")
      :error
    end
  end

  def refund_rescinded_loan(loan_id) do
    fee_info = SharkAttack.Repo.get_by(LenderFee, loan_id: loan_id)

    if not is_nil(fee_info) do
      close_fee_account({fee_info.nonce_account, fee_info.user_address}, "RESCINDED")
    end
  end

  def refund_fees() do
    query =
      from fee in LenderFee,
        join: offer in SharkAttack.Loans.Offer,
        on: fee.loan_id == offer.loan_address,
        left_join: loan in SharkAttack.Loans.Loan,
        on: fee.loan_id == loan.loan,
        where:
          fee.status == "ACTIVE" and (offer.rescinded == 1 or not is_nil(loan.dateForeclosed)),
        select: {fee.nonce_account, fee.user_address}

    SharkAttack.Repo.all(query)
    |> close_fee_accounts("REFUNDED")
  end

  def collect_fees() do
    query =
      from fee in LenderFee,
        join: loan in SharkAttack.Loans.Loan,
        on: fee.loan_id == loan.loan,
        where: fee.status == "ACTIVE" and not is_nil(loan.dateRepaid),
        select: {fee.nonce_account}

    SharkAttack.Repo.all(query)
    |> close_fee_accounts("COLLECTED")
  end

  defp close_fee_account({nonce_account, user_address}, new_status) do
    Logger.info("Closing nonce account #{nonce_account} and sending funds to #{user_address}")

    SharkAttack.Helpers.do_post_request(
      "http://localhost:5001/close_nonce",
      %{nonceAccount: nonce_account, destination: user_address}
    )
    |> parse_close_response(nonce_account, new_status)
  end

  defp close_fee_account({nonce_account}, new_status) do
    Logger.info("Closing nonce account #{nonce_account} and collecting the fees")

    SharkAttack.Helpers.do_post_request(
      "http://localhost:5001/close_nonce",
      %{nonceAccount: nonce_account}
    )
    |> parse_close_response(nonce_account, new_status)
  end

  def close_fee_accounts(accounts, new_status) do
    for account <- accounts do
      close_fee_account(account, new_status)
    end
  end

  defp parse_close_response(
         %{"resp" => %{"closeNonceHash" => close_nonce_hash}},
         nonce_account,
         new_status
       ) do
    Logger.info("Nonce account #{nonce_account} closed with tx #{close_nonce_hash}")

    update_lender_fee_status(nonce_account, new_status)

    :ok
  end

  defp parse_close_response({:error, reason}, _, _) do
    Logger.warning("Error calling the node backend to close the nonce account, #{reason}")

    :error
  end

  def get_fees_for_user(user_address) do
    query = from fee in LenderFee, where: fee.user_address == ^user_address

    SharkAttack.Repo.all(query) |> Repo.preload(:offer)
  end

  def get_active_fees() do
    query = from fee in LenderFee, where: fee.status == "ACTIVE"

    SharkAttack.Repo.all(query)
  end
end
