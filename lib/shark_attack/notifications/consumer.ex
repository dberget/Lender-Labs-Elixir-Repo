defmodule SharkAttack.Notifications.Consumer do
  use GenStage

  def start_link(_initial) do
    GenStage.start_link(__MODULE__, :state_doesnt_matter)
  end

  def init(state) do
    {:consumer, state, subscribe_to: [SharkAttack.Notifications.ProducerConsumer]}
  end

  def handle_events(events, _from, state) do
    Enum.each(events, &send_message/1)

    # We are a consumer, so we would never emit items.
    {:noreply, [], state}
  end

  def send_message({:foreclosure, embed}) do
    SharkAttack.DiscordConsumer.send_to_webhook(
      :foreclosure,
      embed
    )
  end

  def send_message({:dao, address, embed}) do
    address
    |> SharkAttack.DiscordConsumer.send_to_webhook(embed)
  end

  def send_message({:user, discordId, embed}) do
    res =
      discordId
      |> SharkAttack.DiscordConsumer.create_dm_channel()
      |> SharkAttack.DiscordConsumer.send_raw_message(embed)

    case res do
      {:ok, _} ->
        SharkAttack.Notifications.track_notification(%{
          sent: true,
          discord_id: discordId,
          signature: embed.url
        })

      error ->
        SharkAttack.Notifications.track_notification(%{
          error: error,
          sent: false,
          discord_id: discordId,
          signature: embed.url
        })
    end
  end
end
