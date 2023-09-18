defmodule SharkAttack.Helpers do
  def do_post_request(url, params \\ %{}) do
    Finch.build(
      :post,
      url,
      [{"content-type", "application/json"}],
      Jason.encode!(params)
    )
    |> Finch.request(SharkAttackWeb.Finch, receive_timeout: 150_000)
    |> parse_response()
  end

  def do_get_request(url, headers \\ []) do
    Finch.build(
      :get,
      url,
      headers
    )
    |> Finch.request(SharkAttackWeb.Finch,
      receive_timeout: 175_000
    )
    |> parse_response()
  end

  def parse_response({:ok, %{status: 200, body: body}}) do
    body |> Jason.decode!()
  end

  def parse_response({:ok, %{status: 500, body: body}}) do
    {:error, body}
  end

  def parse_response({:error, %Mint.TransportError{reason: :econnrefused}}) do
    {:error, "Connection refused"}
  end

  def parse_response({:error, %Mint.TransportError{reason: error}}) do
    {:error, error}
  end

  def parse_response(res) do
    res
  end

  def safe_string_to_integer(nil), do: nil

  def safe_string_to_integer(value) when is_integer(value) do
    value
  end

  def safe_string_to_integer(str) when is_binary(str) do
    String.to_integer(str)
  end
end
