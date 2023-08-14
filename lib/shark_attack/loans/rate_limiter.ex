defmodule SharkAttack.RateLimiter do
  use Agent

  @moduledoc """
  This is a very simply way to check when something was last called for an address to prevent spamming.
  It's extremely simple, but it's good enough for now to prevent spamming discord dms.
  """

  @doc """
  Starts a new Agent.
  """
  def start_link(_opts) do
    Agent.start_link(fn -> %{} end, name: __MODULE__)
  end

  @doc """
  Gets a value from the `bucket` by `key`.
  """
  def get(key) do
    Agent.get(__MODULE__, &Map.get(&1, key))
  end

  @doc """
  Puts the `value` for the given `key` in the `bucket`.
  """
  def put(key, value) do
    Agent.update(__MODULE__, &Map.put(&1, key, value))
  end
end
