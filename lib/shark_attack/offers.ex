defmodule SharkAttack.Offers do
  @moduledoc """
  The Offers context.
  """

  import Ecto.Query, warn: false

  alias SharkAttack.Loans.Offer
  alias SharkAttack.LenderFee
  alias SharkAttack.Repo

  def update_or_create_offer(attrs) do
    SharkAttack.Offers.create_offer(%{
      lender: attrs["lender"],
      loan_address: attrs["loan_address"],
      amount: attrs["amount"],
      collection_id: attrs["collection"],
      automation: attrs["automation"]
    })
  end

  def get_active_offers do
    query =
      from(o in Offer,
        where: o.inserted_at > fragment("NOW() - INTERVAL 3 WEEK"),
        where: is_nil(o.rescinded)
      )

    Repo.all(query)
  end

  def get_offers_since_fees do
    {:ok, datetime} = NaiveDateTime.new(~D[2023-12-01], ~T[00:00:00])

    query =
      from(o in Offer,
        where: o.inserted_at > ^datetime
      )

    Repo.all(query)
  end

  def create_offer(attr) do
    %Offer{}
    |> SharkAttack.Loans.Offer.changeset(attr)
    |> Repo.insert()
  end

  def update_offer(offerAddress, "taken") do
    taken_offer(offerAddress)
  end

  def update_offer(offer, "rescind") do
    rescind_offer(offer)
  end

  def update_offer(offer, attrs) do
    offer
    |> Offer.changeset(attrs)
    |> Repo.update()
  end

  def taken_offer(loanAddress) do
    case SharkAttack.Offers.get_offer(loanAddress) do
      nil ->
        :not_found

      offer ->
        offer
        |> Offer.changeset(%{taken: 1})
        |> Repo.update()
    end
  end

  def rescind_offer(loanAddress) do
    case SharkAttack.Offers.get_offer(loanAddress) do
      nil ->
        :not_found

      offer ->
        offer
        |> Offer.changeset(%{rescinded: 1})
        |> Repo.update()

        LenderFee.refund_rescinded_loan(loanAddress)
    end
  end

  def get_offer(loan_address) do
    Repo.get_by(Offer, loan_address: loan_address)
  end

  def get_automated_offers_for_lender(address) do
    query =
      from(o in Offer,
        where: o.automation == 1,
        where: o.lender == ^address,
        where: o.taken == 1
      )

    Repo.all(query)
  end

  def get_boosted_offer(loan_address) do
    Repo.get_by(SharkAttack.Loans.BoostedOffer, loan_address: loan_address)
  end

  def get_loan_offers_by_lender(lender) do
    Repo.all(Offer, lender: lender)
  end

  def last_month_offers() do
    query =
      from(o in Offer,
        where: o.inserted_at > fragment("NOW() - INTERVAL 4 WEEK")
      )

    Repo.all(query)
  end

  def user_has_loan_offers(lender) do
    query =
      from(o in Offer,
        where: o.lender == ^lender,
        where: o.inserted_at > fragment("NOW() - INTERVAL 4 WEEK")
      )

    Repo.all(query)
  end

  def get_lender_offers(lender) do
    {:ok, datetime} = NaiveDateTime.new(~D[2023-12-01], ~T[00:00:00])

    query =
      from(o in Offer,
        where: o.lender == ^lender,
        where: o.inserted_at > ^datetime,
        where: o.automation == false
      )

    Repo.all(query)
  end
end
