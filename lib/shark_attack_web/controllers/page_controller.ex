defmodule SharkAttackWeb.PageController do
  use SharkAttackWeb, :controller

  def home(conn, _params) do
    render(conn, :home, layout: false)
  end
end
