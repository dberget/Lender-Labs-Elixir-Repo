defmodule SharkAttack.Users do
  import Ecto.Query, warn: false
  alias SharkAttack.Repo
  alias SharkAttack.Accounts.User

  @paylinks [
    "63c325b709ab5e7d1dd80693",
    "63c3264909ab5e7d1dd80906",
    "63c314e465f452f94a19a635",
    "63c2f71465f452f94a196437",
    "63c8793b1e7e23ce432243d2",
    "63c87a93f07af110f94a43c3",
    "63c87b971e7e23ce4322481d",
    "63c936661e7e23ce43237023",
    "63caba0dbc4646a3c14090f4",
    "63d2bbeb52ad37f49859a3b2"
  ]

  def get!(address), do: Repo.get(User, address)

  def get_user_from_address!(address, preloads \\ []) do
    user =
      case Repo.get(User, address) do
        nil -> get_user_from_sub_wallet!(address)
        user -> user
      end

    unless is_nil(user) do
      user |> Repo.preload(preloads)
    else
      nil
    end
  end

  def get_user_from_sub_wallet!(address) do
    case Repo.get_by(SharkAttack.Accounts.UserWallet, address: address) do
      %SharkAttack.Accounts.UserWallet{user_address: user_address} ->
        get!(user_address)

      nil ->
        nil
    end
  end

  def list!(), do: Repo.all(User)

  def create_user(attrs \\ %{}) do
    user =
      %User{}
      |> User.changeset(attrs)
      |> Repo.insert(on_conflict: :nothing)

    create_default_user_setting(attrs[:address])

    user
  end

  def get_user_favorites(address) do
    query = from c in SharkAttack.Accounts.Favorites, where: c.user_address == ^address

    Repo.all(query) |> Repo.preload(:collection) |> Enum.map(& &1.collection)
  end

  def save_favorite(address, favorite) do
    %SharkAttack.Accounts.Favorites{}
    |> SharkAttack.Accounts.Favorites.changeset(%{
      user_address: address,
      collection_id: favorite
    })
    |> Repo.insert()
  end

  def delete_favorite(collection, address) do
    favorite =
      Repo.get_by(SharkAttack.Accounts.Favorites, collection_id: collection, user_address: address)

    favorite
    |> Repo.delete()
  end

  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  def create_default_user_setting(user_address) do
    %SharkAttack.Accounts.UserSettings{}
    |> SharkAttack.Accounts.UserSettings.changeset(%{user_address: user_address})
    |> Repo.insert(on_conflict: :nothing)
  end

  def get_user_wallets(address) do
    Repo.all(
      from(uw in SharkAttack.Accounts.UserWallet,
        where: uw.user_address == ^address
      )
    )
  end

  def add_user_wallet(address, user_address) do
    %SharkAttack.Accounts.UserWallet{}
    |> SharkAttack.Accounts.UserWallet.changeset(%{address: address, user_address: user_address})
    |> Repo.insert(on_conflict: :nothing)
  end

  def delete_user_wallet(id) do
    %SharkAttack.Accounts.UserWallet{id: id}
    |> Repo.delete()
  end

  def get_purchases() do
    SharkAttack.Helpers.do_get_request(
      "https://api.hel.io/v1/export/payments?publicKey=BS61tv1KbsPhns3ppU8pmWozfReZjhxFL2MPhBdDWNEm",
      [
        {"authorization",
         "Bearer ro26WikjG6auKhJTh+csZ83XRwI9C28fk2tOdVfrOUYdhV79zvDSAAOnG8YiRr8CLfbPfg1HbYG6QOJyG2QeqJlCdH3FZ/+qnV+Agnz1gb1FyumfmKuC4w3eHnjkVnVZ"}
      ]
    )
    |> Enum.filter(fn %{"paymentRequestId" => paymentId} -> paymentId in @paylinks end)
    |> Enum.map(&(%{address: Map.get(&1, "from")} |> create_user()))
  end
end
