defmodule SharkAttack.NotificationWorker do
  @moduledoc """
  Schedules a timer to check for possible foreclosures every 5 minutes.
  """

  use GenServer

  require Logger

  def start_link(opts) do
    GenServer.start_link(__MODULE__, [], opts)
  end

  @impl true
  def init(state) do
    :timer.send_interval(:timer.minutes(5), :fetch)

    :timer.send_interval(:timer.minutes(7), :update)

    {:ok, state}
  end

  @impl true
  def handle_info(:fetch, state) do
    notify_users()

    {:noreply, state}
  end

  def handle_info(:update, state) do
    update_loan_data()

    {:noreply, state}
  end

  defp notify_users do
    Logger.info("Checking for foreclosures...")

    SharkAttack.Notifications.foreclosures()
  end

  defp update_loan_data do
    Logger.info("Updating Loan Data...")

    SharkAttack.Stats.update_loans()
  end
end
