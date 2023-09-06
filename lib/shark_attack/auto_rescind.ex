defmodule SharkAttack.AutoRescind do
  alias SharkAttack.{Offers, Repo}
  alias SharkAttack.Loans.AutoRescind
  alias Ecto.Changeset

  import Ecto.Query
  require Logger

  def get_and_rescind_loans() do
    get_offers_to_rescind() |> rescind_offers()
  end

  defp try_overwrite_auto_rescind(loan_id) do
    post = SharkAttack.Repo.get_by(SharkAttack.Loans.AutoRescind, [loan_id: loan_id, status: "ACTIVE"])
    Logger.info("Offer #{inspect(post)} already exists, overwriting")
    cond do
      is_nil(post) -> :ok
      true -> close_nonce_accounts([post.nonce_account], "UPDATED")
    end
  end

  def insert_auto_rescind(user_address, loan_id, nonce_account, transaction, duration) do
    try_overwrite_auto_rescind(loan_id)
    end_time = DateTime.utc_now() |> DateTime.add(duration, :minute)
    %SharkAttack.Loans.AutoRescind{}
    |> SharkAttack.Loans.AutoRescind.changeset(%{
      user_address: user_address,
      loan_id: loan_id,
      nonce_account: nonce_account,
      encoded_transaction: transaction,
      end_time: end_time,
      status: "ACTIVE"
    })
    |> Repo.insert()

    :ok
  end

  defp update_nonce_status(nonce_account, new_status) do
    post = SharkAttack.Repo.get_by(SharkAttack.Loans.AutoRescind, nonce_account: nonce_account)

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
      Logger.info("Offer with nonce #{nonce_account} is not ACTIVE, not updating status")
      :error
    end
  end

  def get_auto_rescind_info(nonce_account) do
    SharkAttack.Repo.get_by(SharkAttack.Loans.AutoRescind, nonce_account: nonce_account)
  end

  def get_nonce_accounts(user_address) do
    query =
      from(l in SharkAttack.Loans.AutoRescind,
        where: l.status == "ACTIVE" and l.user_address == ^user_address,
        select: l
      )

    SharkAttack.Repo.all(query)
    # map each loan to its nonce account
    |> Enum.map(fn offer -> %{
        "loan_id" => offer.loan_id,
        "nonce_account" => offer.nonce_account,
        "remaining" => DateTime.diff(offer.end_time, DateTime.utc_now(), :minute)
      }
    end)
  end

  def get_offers_to_rescind(user_address) do
    # get all the offers in AutoRescind that are ACTIVE and have a end_time in the past
    query =
      from(l in SharkAttack.Loans.AutoRescind,
        where:
          l.status == "ACTIVE" and l.end_time < ^DateTime.utc_now() and
            l.user_address == ^user_address,
        select: l
      )

    SharkAttack.Repo.all(query)
  end

  def get_offers_to_rescind() do
    # get all the offers in AutoRescind that are ACTIVE and have a end_time in the past
    query =
      from(l in SharkAttack.Loans.AutoRescind,
        where: l.status == "ACTIVE" and l.end_time < ^DateTime.utc_now(),
        select: l
      )

    SharkAttack.Repo.all(query)
  end

  def rescind_offers([]), do: :ok

  def rescind_offers(offers) do
    # for each offer, get the nonce account and send the transaction
    for offer <- offers do
      fetched_offer = SharkAttack.Offers.get_offer(offer.loan_id)

      cond do
        Map.get(fetched_offer, :rescinded) == 1 ->
          close_nonce_accounts([offer.nonce_account], "REVOKED")

        Map.get(fetched_offer, :taken) == 1 ->
          close_nonce_accounts([offer.nonce_account], "TAKEN")

        true ->
          Logger.info("Revoking offer #{offer.loan_id}")

          SharkAttack.Helpers.do_post_request(
            "http://localhost:5001/revoke_offer",
            %{encodedTx: offer.encoded_transaction, nonceAccount: offer.nonce_account}
          )
          |> parse_rescind_response(offer)
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

  defp parse_rescind_response(
         %{"resp" => %{"txHash" => txHash, "closeNonceHash" => close_nonce_hash}},
         offer
       ) do
    Logger.info("Offer #{offer.loan_id} revoked with tx #{txHash} and close nonce tx #{close_nonce_hash}")

    update_nonce_status(offer.nonce_account, "AUTO_REVOKED")

    :ok
  end

  defp parse_rescind_response(%{"resp" => %{"error" => reason}}, offer) do
    Logger.info("Unable to revoke offer #{offer.loan_id} because #{reason}")
    :ok
  end

  defp parse_rescind_response({:error, reason}, _) do
    Logger.warn("Error calling the node backend to rescind offer, #{reason}")

    :error
  end

  defp parse_close_response(
         %{"resp" => %{"closeNonceHash" => close_nonce_hash}},
         nonce_account,
         new_status
       ) do
    Logger.info("Nonce account #{nonce_account} closed with tx #{close_nonce_hash}")

    update_nonce_status(nonce_account, new_status)

    :ok
  end

  defp parse_close_response({:error, reason}, _, _) do
    Logger.warn("Error calling the node backend to close the nonce account, #{reason}")

    :error
  end
end
