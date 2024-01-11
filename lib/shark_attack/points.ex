defmodule SharkAttack.Points do
  alias SharkAttack.Points.{PointEntry, UserPoints}
  alias SharkAttack.Repo
  import Ecto.Query

  def get_user_points(address) do
    Repo.get_by(UserPoints, address: address)
  end

  @spec all() :: [%PointEntry{}]
  def all() do
    Repo.all(UserPoints)
  end

  @spec create(map()) :: {:ok, PointEntry.t()} | {:error, Changeset.t()}
  def create(attrs) do
    %PointEntry{}
    |> PointEntry.changeset(attrs)
    |> Repo.insert()
  end

  @spec update(integer(), map()) ::
          {:ok, PointEntry.t()} | {:error, Changeset.t()}
  def update(id, attrs) do
    point_entry = Repo.get(PointEntry, id)

    PointEntry.changeset(point_entry, attrs)
    |> Repo.update()
  end

  @spec delete(integer()) :: {:ok, PointEntry.t()} | {:error, Changeset.t()}
  def delete(id) do
    point_entry = Repo.get(PointEntry, id)

    Repo.delete(point_entry)
  end

  def get_points_from_event_type(address, event_type) do
    from(p in PointEntry,
      select: sum(p.amount),
      where: p.address == ^address,
      where: p.event_type == ^event_type
    )
    |> Repo.one()
  end
end
