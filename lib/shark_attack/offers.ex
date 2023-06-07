defmodule SharkAttack.Offers do
  @moduledoc """
  The Offers context.
  """

  import Ecto.Query, warn: false

  alias SharkAttack.Loans.Offer
  alias SharkAttack.Repo

  def update_or_create_offer(attrs) do
    offer = SharkAttack.Offers.get_offer(attrs["loan_address"])

    case offer do
      nil ->
        SharkAttack.Offers.create_offer(%{
          lender: attrs["lender"],
          loan_address: attrs["loan_address"],
          amount: attrs["amount"],
          collection_id: attrs["collection"]
        })

      _ ->
        update_offer(offer, attrs["action"])
    end
  end

  def get_active_offers do
    Repo.all(Offer, taken: 0, rescinded: 0)
  end

  def create_offer(attr) do
    %Offer{}
    |> SharkAttack.Loans.Offer.changeset(attr)
    |> Repo.insert()
  end

  def update_offer(offer, "taken") do
    taken_offer(offer)
  end

  def update_offer(offer, "rescind") do
    rescind_offer(offer)
  end

  def update_offer(offer, attrs) do
    offer
    |> Offer.changeset(attrs)
    |> Repo.update()
  end

  def taken_offer(offer) do
    offer
    |> Offer.changeset(%{taken: 1})
    |> Repo.update()
  end

  def rescind_offer(loanAddress) do
    SharkAttack.Offers.get_offer(loanAddress)
    |> Offer.changeset(%{rescinded: 1})
    |> Repo.update()
  end

  def get_offer(loan_address) do
    Repo.get_by(Offer, loan_address: loan_address)
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

  def last_two_weeks() do
    query =
      from(o in Offer,
        where:
          o.inserted_at > fragment("NOW() - INTERVAL 3 WEEK") and
            is_nil(o.rescinded)
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
end
