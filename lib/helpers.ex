defmodule SharkAttack.Helpers do
  def do_post_request(url, params \\ %{}) do
    IO.inspect(params)

    Finch.build(
      :post,
      url,
      [{"content-type", "application/json"}],
      Jason.encode!(params)
    )
    |> Finch.request(SharkAttackWeb.Finch)
    |> parse_response()
  end

  def do_get_request(url) do
    Finch.build(
      :get,
      url,
      [],
      nil,
      receive_timeout: 1_500_000_000,
      pool_timeout: 1_500_000_000
    )
    |> Finch.request(SharkAttackWeb.Finch)
    |> parse_response()
  end

  def parse_response({:ok, %{status: 200, body: body}}) do
    body |> Jason.decode!()
  end

  def parse_response(res) do
    res
  end
end
