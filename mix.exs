defmodule SharkAttack.MixProject do
  use Mix.Project

  def project do
    [
      app: :shark_attack,
      version: "0.1.5",
      elixir: "~> 1.14",
      elixirc_paths: elixirc_paths(Mix.env()),
      start_permanent: Mix.env() == :prod,
      aliases: aliases(),
      deps: deps()
    ]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [
      mod: {SharkAttack.Application, []},
      extra_applications: [:logger, :runtime_tools]
    ]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_), do: ["lib"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [
      {:phoenix, "~> 1.7"},
      {:phoenix_ecto, "~> 4.4"},
      {:ecto_sql, "~> 3.6"},
      {:myxql, ">= 0.0.0"},
      {:phoenix_html, "~> 3.0"},
      {:phoenix_live_reload, "~> 1.2", only: :dev},
      {:phoenix_live_view, "~> 0.18.3"},
      {:phoenix_live_dashboard, "~> 0.7.2"},
      {:floki, ">= 0.30.0", only: :test},
      {:swoosh, "~> 1.3"},
      {:telemetry_metrics, "~> 0.6"},
      {:telemetry_poller, "~> 1.0"},
      {:gettext, "~> 0.18"},
      {:jason, "~> 1.2"},
      {:plug_cowboy, "~> 2.5"},
      {:websockex, "~> 0.4.3"},
      {:solana, "~> 0.2.0", override: true},
      {:solana_spl, "~> 0.1.1", override: true},
      {:finch, "~> 0.10"},
      {:number, "~> 1.0.3"},
      {:cloak_ecto, "~> 1.2.0"},
      {:nostrum, "~> 0.6.1"},
      {:sentry, "~> 8.0"},
      {:hackney, "~> 1.8"},
      {:cors_plug, "~> 3.0"},
      {:tailwind, "~> 0.1.8", runtime: Mix.env() == :dev},
      {:gun, "== 2.0.1",
       [env: :prod, hex: "remedy_gun", repo: "hexpm", optional: false, override: true]},
      {:cowlib, "~> 2.11.1",
       [env: :prod, hex: "remedy_cowlib", repo: "hexpm", optional: false, override: true]}
    ]
  end

  # Aliases are shortcuts or tasks specific to the current project.
  # For example, to install project dependencies and perform other setup tasks, run:
  #
  #     $ mix setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    [
      setup: ["deps.get", "ecto.setup", "cmd --cd assets npm install"],
      "ecto.setup": ["ecto.create", "ecto.migrate", "run priv/repo/seeds.exs"],
      "ecto.reset": ["ecto.drop", "ecto.setup"],
      test: ["ecto.create --quiet", "ecto.migrate --quiet", "test"],
      "assets.setup": ["tailwind.install --if-missing"],
      "assets.build": ["tailwind default"],
      "assets.deploy": [
        # "cmd --cd assets node build.js --deploy",
        # "tailwind default --minify",
        "phx.digest"
      ],
      sentry_recompile: ["compile", "deps.compile sentry --force"]
    ]
  end
end
