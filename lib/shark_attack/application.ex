defmodule SharkAttack.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      SharkAttack.Repo,
      # Start the Telemetry supervisor
      SharkAttackWeb.Telemetry,
      {Finch, name: SharkAttackWeb.Finch},
      # Start the PubSub system
      {Phoenix.PubSub, name: SharkAttack.PubSub},
      # Start the Endpoint (http/https)
      SharkAttackWeb.Endpoint,
      SharkAttack.Vault,
      SharkAttack.Discord
      SharkAttack.NotificationWorker
      # {SharkAttack.SolanaWS, name: SharkAttack.SolanaWS}
      # Start a worker by calling: SharkAttack.Worker.start_link(arg)
      # {SharkAttack.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: SharkAttack.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    SharkAttackWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
