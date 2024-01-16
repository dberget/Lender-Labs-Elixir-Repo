defmodule SharkAttack.Raffles do
  alias SharkAttack.Repo
  alias SharkAttack.Raffles.Raffle
  alias SharkAttack.Raffles.Entry
  import Ecto.Query
  require Logger

  def create_raffle(attrs) do
    %Raffle{}
    |> Raffle.changeset(attrs)
    |> SharkAttack.Repo.insert()
  end

  def create_raffle_entry(attrs) do
    %Entry{}
    |> Entry.changeset(attrs)
    |> SharkAttack.Repo.insert()
  end

  def update_raffle(raffle_id, attrs) do
    SharkAttack.Repo.get(Raffle, raffle_id)
    |> Raffle.changeset(attrs)
    |> SharkAttack.Repo.update!()
  end

  def get_raffle(id) do
    SharkAttack.Repo.get(Raffle, id) |> Repo.preload(:entries)
  end

  def get_raffle_entry(id) do
    SharkAttack.Repo.get(Entry, id)
  end

  def get_active_raffles() do
    query =
      from(r in Raffle,
        where: r.status == "ACTIVE"
      )

    SharkAttack.Repo.all(query) |> Repo.preload(:entries)
  end

  def get_raffle_entries_by_user(user) do
    query =
      from(r in Entry,
        where: r.user == ^user
      )

    SharkAttack.Repo.all(query) |> Repo.preload(:raffle)
  end

  def get_raffle_entries_by_raffle(raffle_id) do
    query =
      from(r in Entry,
        where: r.raffle_id == ^raffle_id
      )

    SharkAttack.Repo.all(query)
  end

  def draw_raffle(raffle_id) do
    raffle_entries = get_raffle_entries_by_raffle(raffle_id)

    winner =
      Enum.flat_map(raffle_entries, fn entry ->
        List.duplicate(entry.user, entry.entries)
      end)
      |> Enum.shuffle()
      |> Enum.shuffle()
      |> Enum.random()

    update_raffle(raffle_id, %{winner: winner, status: "DRAWN"})
  end
end
