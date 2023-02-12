defmodule SharkAttack.Helpers do
  def do_post_request(url, params \\ %{}) do
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
      url
    )
    |> Finch.request(SharkAttackWeb.Finch,
      receive_timeout: 15_000_000_000,
      pool_timeout: 15_000_000_000
    )
    |> parse_response()
  end

  def parse_response({:ok, %{status: 200, body: body}}) do
    body |> Jason.decode!()
  end

  def parse_response(res) do
    res
  end
end
