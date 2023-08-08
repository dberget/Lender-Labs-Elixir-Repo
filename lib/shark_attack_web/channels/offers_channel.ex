defmodule SharkAttackWeb.OffersChannel do
  use Phoenix.Channel

  def join("room:offers", _message, socket) do
    {:ok, socket}
  end

  def handle_in("subscribe", _, socket) do
    labs_offers = SharkAttack.Offers.get_active_offers() |> Enum.map(& &1.loan_address)

    loans =
      :ets.tab2list(:offers)
      |> Enum.map(&elem(&1, 1))
      |> Enum.sort_by(& &1["offerTime"], :desc)
      |> Enum.map(
        &(&1
          |> Map.put(
            "is_lender_labs",
            Enum.member?(labs_offers, &1["pubkey"])
          ))
      )
      |> Enum.take(1000)

    push(socket, "subscribe", %{data: loans})

    {:noreply, socket}
  end

  defp get_lender_name(offer) do
    SharkAttack.Helpers.do_get_request(
      "https://api.helius.xyz/v0/addresses/#{offer["lender"]}/names?api-key=8fea9de0-b3d0-4bf4-a1fb-0945dfd91d42"
    )
    |> Map.get("domainNames")
    |> List.first()
  end

  def push(offer) do
    res = SharkAttack.Offers.get_offer(offer["pubkey"])

    # name =
    #   SharkAttack.Helpers.do_get_request(
    #     "https://api.helius.xyz/v0/addresses/#{offer["lender"]}/names?api-key=8fea9de0-b3d0-4bf4-a1fb-0945dfd91d42"
    #   )
    #   |> Map.get("domainNames")
    #   |> List.first()

    offer =
      offer
      |> Map.put("is_lender_labs", !is_nil(res))

    # |> Map.put("name", name)

    SharkAttackWeb.Endpoint.broadcast!("room:offers", "new", %{
      data: offer
    })
  end

  def delete(offer) do
    SharkAttackWeb.Endpoint.broadcast!("room:offers", "delete", %{pubkey: offer})
  end
end
