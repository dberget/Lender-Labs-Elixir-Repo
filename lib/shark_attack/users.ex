defmodule SharkAttack.Users do
  import Ecto.Query, warn: false
  alias SharkAttack.Repo
  alias SharkAttack.Accounts.User

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

  def get_users_with_discord_id!() do
    Repo.all(from(u in User, where: not is_nil(u.discordId))) |> Repo.preload(:user_settings)
  end

  def create_user(attrs) when is_map(attrs) do
    create_user(attrs[:address])
  end

  def create_user(address) do
    case Repo.get(User, address) do
      nil ->
        user =
          %User{}
          |> User.changeset(%{address: address})
          |> Repo.insert(on_conflict: :nothing)

        create_default_user_setting(address)

        :ok

      _ ->
        :ok
    end
  end

  def get_user_favorites(address) do
    query = from(c in SharkAttack.Accounts.Favorites, where: c.user_address == ^address)

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

  def create_saved_search(attrs) do
    %SharkAttack.Accounts.SavedSearch{}
    |> SharkAttack.Accounts.SavedSearch.changeset(attrs)
    |> Repo.insert()
  end

  def delete_saved_search(id) do
    %SharkAttack.Accounts.SavedSearch{id: id}
    |> Repo.delete()
  end

  def get_saved_searches(address) do
    Repo.all(
      from(uw in SharkAttack.Accounts.SavedSearch,
        where: uw.user_address == ^address
      )
    )
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

  def get_user_pull_history?(address) do
    case Repo.get_by(SharkAttack.Accounts.PullHistory, address: address) do
      nil -> %SharkAttack.Accounts.PullHistory{}
      res -> res
    end
  end

  def get_purchases() do
    SharkAttack.Helpers.do_get_request(
      "https://api.hel.io/v1/export/payments?publicKey=Labsrz67AZ3Z7zk76k8hWh38nZSsfgUn4VtSU6ZdWL3",
      [
        {"authorization",
         "Bearer n24Y98PGn/38OZx0vU81pCSVBV6ZvVjYlbkBi1owTOSq+Yt8r75k1jkKVQzN4z6icCOi5M/yDYLbwIN90wC9YN6CRWTxo9yS+bzVBSJX860GRIBK7DJWC7upbDSj44Do"}
      ]
    )
    # |> Enum.filter(fn %{"paymentRequestId" => paymentId} -> paymentId in @paylinks end)
    |> Enum.map(&(%{address: Map.get(&1, "from")} |> create_user()))
  end
end
