defmodule SharkAttackWeb.PageController do
  use SharkAttackWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
