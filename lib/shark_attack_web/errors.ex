defmodule SharkAttackWeb.ErrorHTML do
  use SharkAttackWeb, :html

  def render(template, _assigns) do
    Phoenix.Controller.status_message_from_template(template)
  end
end
