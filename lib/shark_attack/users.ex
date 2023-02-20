defmodule SharkAttack.Users do
  import Ecto.Query, warn: false
  alias SharkAttack.Repo
  alias SharkAttack.Accounts.User

  def get!(address), do: Repo.get!(User, address)

  def list!(), do: Repo.all(User)

  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert(on_conflict: :replace_all)
  end
end
