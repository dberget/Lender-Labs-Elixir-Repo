defmodule SharkAttack.DuckDB do
  @moduledoc """
  Client for interacting with DuckDB HTTP server.
  Provides functions for executing queries and managing connections.
  """
  use HTTPoison.Base

  @default_base_url "http://localhost:8000"

  @doc """
  Executes a SQL query against DuckDB and returns the parsed result.

  ## Examples
      iex> DuckDB.query("SELECT * FROM users LIMIT 1")
      {:ok, [%{"id" => 1, "name" => "John"}]}

      iex> DuckDB.query("INVALID SQL")
      {:error, "SQL syntax error"}
  """
  def query(sql) when is_binary(sql) do
    url = get_base_url()

    case HTTPoison.get("#{url}/query", [], params: %{q: sql}) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        {:ok, Jason.decode!(body)}

      {:ok, %HTTPoison.Response{status_code: status, body: body}} ->
        {:error, "DuckDB request failed with status #{status}: #{body}"}

      {:error, %HTTPoison.Error{reason: reason}} ->
        {:error, "HTTP request failed: #{inspect(reason)}"}
    end
  rescue
    e in Jason.DecodeError ->
      {:error, "Failed to parse DuckDB response: #{inspect(e)}"}

    e ->
      {:error, "Unexpected error: #{inspect(e)}"}
  end

  @doc """
  Executes a SQL query and raises on error.
  """
  def query!(sql) do
    case query(sql) do
      {:ok, result} -> result
      {:error, error} -> raise "DuckDB query failed: #{error}"
    end
  end

  @doc """
  Checks if the DuckDB server is available.
  Returns true if server responds successfully, false otherwise.
  """
  def alive? do
    case HTTPoison.get("#{get_base_url()}/health") do
      {:ok, %HTTPoison.Response{status_code: 200}} -> true
      _ -> false
    end
  rescue
    _ -> false
  end

  # Private helpers

  defp get_base_url do
    Application.get_env(:shark_attack, :duckdb_url, @default_base_url)
  end
end
