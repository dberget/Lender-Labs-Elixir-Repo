defmodule SharkAttackWeb.OffersChannel do
  use Phoenix.Channel

  def join("room:offers", _message, socket) do
    {:ok, socket}
  end

  def handle_in("subscribe", _, socket) do
    loans =
      :ets.tab2list(:offers)
      |> Enum.map(&elem(&1, 1))
      |> Enum.sort_by(& &1["offerTime"], :desc)

    push(socket, "subscribe", %{data: loans})

    {:noreply, socket}
  end

  def push(offer) do
    SharkAttackWeb.Endpoint.broadcast!("room:offers", "new", %{data: offer})
  end

  def delete(offer) do
    SharkAttackWeb.Endpoint.broadcast!("room:offers", "delete", %{pubkey: offer})
  end
end
