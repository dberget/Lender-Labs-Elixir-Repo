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
      amount: round(amount)
    })
    |> Repo.insert()
  end

  def get_users_to_check() do
    SharkAttack.Offers.last_month_offers()
    |> Enum.map(fn offer ->
      offer.lender
    end)
    |> Enum.uniq()
    |> Enum.reject(fn address ->
      address in [
        "BSuZuU3LfNb1dKcJ5boaok7d8F8GARwJpVw5Cc379QLo",
        "HH1NaJzaTF4Xyw9M17ZTjWhyWnsHP3wLeBTN96GtQurN",
        "DHVZfycL8WYxjKkXjFoe2YAMZAdVHDSTNmW4WhSD4YhK",
        "DVtPTMGQVnxoBgqMmh94aF76VDYMGuzrmXYTAaLjnqbt",
        "ACeA7pZqUM9iRhevvSk9BHPqmcgnzeoXSFxsRM1Q6ukV",
        "6sFMxXyYTfFpC4GTWyv8RNNZArCbjHJDAAL8yso5KEhH",
        "CriWXfjc4RqsfZiMBBeqcz7wz8WM5Hj9vTpNoLHvxah9",
        "6T9wxnwB7hMr1KzZ8ncFJFPbiDUoqakYYLDcbheRU9Kv",
        "FhwcU3YiVS6THyFaj6MjT7A7qHG8gFZq5kAbQHDZsKDz",
        "6sWZrH1zzY8M6fiETNsbVFXNkx2G9kbzUuwvLrPYVHAP",
        "3n1KCZwki4sPBXBFTXF3t1eSDWGL9UuM5xjxJXvfcfow",
        "F2cfPH11coAjz496Vut7eBKGfKvkSUqTCg73hg9Dr46S"
      ]
    end)
    |> Enum.shuffle()
    |> Enum.map(&find_missing_fees/1)
  end

  def find_missing_fees(user_address) do
    offers_missing_fees =
      get_missing_fees_for_user(user_address)

    Logger.info(
      "Found #{Enum.count(offers_missing_fees)} offers without fees for #{user_address}"
    )

    loan_ids =
      Enum.map(offers_missing_fees, & &1.loan_address) |> Enum.chunk_every(50)

    Enum.each(loan_ids, fn ids ->
      signatures =
        ids
        |> Enum.map(fn loan_id ->
          case SharkAttack.Solana.get_signatures_for_address(loan_id)
               |> List.last(%{})
               |> Map.get("signature", nil) do
            nil ->
              nil

            signature ->
              {loan_id, signature}
          end
        end)
        |> Enum.filter(&(&1 != nil))

      all_signatures =
        Enum.map(signatures, &elem(&1, 1))
        |> Enum.uniq()

      txs =
        SharkAttack.Clients.Helius.parse_transactions(all_signatures)
        |> Enum.filter(
          &(&1["instructions"]
            |> Enum.any?(fn i -> i["programId"] == "11111111111111111111111111111111" end))
        )

      txs
      |> Enum.map(fn tx ->
        data =
          tx["instructions"]
          |> Enum.find(fn i -> i["programId"] == "11111111111111111111111111111111" end)

        if !is_nil(data) do
          %{"accounts" => [_address, nonce]} = data

          {loan, _sig} = signatures |> Enum.find(fn {_, sig} -> sig == tx["signature"] end)

          insert_lender_fee(
            user_address,
            loan,
            nonce,
            SharkAttack.Solana.fetch_native_balance(nonce)
          )
        end
      end)
      |> Enum.filter(&(&1 != nil))

      case txs do
        [] ->
          Logger.info("Batch complete.")

        _ ->
          Logger.info("Inserted #{length(txs)} missing fees for #{user_address}")
      end
    end)

    Logger.info("#{user_address} complete.")
  end

  # For backfilling the lender fee table
  def update_lender_fee_amount(nonce_account, new_amount) do
    post = SharkAttack.Repo.get_by(LenderFee, nonce_account: nonce_account)

    post =
      post
      |> Changeset.change(%{amount: new_amount})
      |> Changeset.optimistic_lock(:version)

    case SharkAttack.Repo.update(post) do
      {:ok, _struct} -> :ok
      {:error, _changeset} -> :error
    end
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

  def close_fee_account({nonce_account, user_address}, new_status) do
    Logger.info("Closing nonce account #{nonce_account} and sending funds to #{user_address}")

    SharkAttack.Helpers.do_post_request(
      "http://localhost:5001/close_nonce",
      %{nonceAccount: nonce_account, destination: user_address}
    )
    |> parse_close_response(nonce_account, new_status)
  end

  def close_fee_account({nonce_account}, new_status) do
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

  def get_unpaid_automation_fees(lender) do
    query =
      from offer in SharkAttack.Loans.Offer,
        left_join: fee in LenderFee,
        on: fee.loan_id == offer.loan_address,
        join: loan in SharkAttack.Loans.Loan,
        on: offer.loan_address == loan.loan,
        where: loan.status == "COMPLETE",
        where: offer.automation == true and is_nil(fee.loan_id),
        where: offer.lender == ^lender,
        where: offer.taken == 1,
        select: %{offer: offer, earnings: loan.earnings}

    SharkAttack.Repo.all(query)
  end

  def get_all_active_unpaid_automation_loans() do
    query =
      from offer in SharkAttack.Loans.Offer,
        left_join: fee in LenderFee,
        on: fee.loan_id == offer.loan_address,
        join: loan in SharkAttack.Loans.Loan,
        on: offer.loan_address == loan.loan,
        where: offer.automation == true and is_nil(fee.loan_id),
        where: offer.taken == 1,
        select: %{offer: offer}

    SharkAttack.Repo.all(query)
  end

  def get_fees_for_user(user_address) do
    query = from fee in LenderFee, where: fee.user_address == ^user_address

    SharkAttack.Repo.all(query) |> Repo.preload(:offer)
  end

  def get_missing_fees_for_user(user_address) do
    {:ok, datetime} = NaiveDateTime.new(~D[2023-12-01], ~T[00:00:00])

    query =
      from offer in SharkAttack.Loans.Offer,
        where: offer.lender == ^user_address,
        left_join: fee in LenderFee,
        on: fee.loan_id == offer.loan_address,
        where: offer.automation == false,
        where: offer.amount > 0.0,
        where: offer.inserted_at > ^datetime,
        where: is_nil(fee.loan_id)

    SharkAttack.Repo.all(query)
  end

  def get_active_fees() do
    query = from fee in LenderFee, where: fee.status == "ACTIVE"

    SharkAttack.Repo.all(query)
  end

  def get_collected_fees() do
    query = from fee in LenderFee, where: fee.status == "COLLECTED"

    SharkAttack.Repo.all(query)
  end
end
