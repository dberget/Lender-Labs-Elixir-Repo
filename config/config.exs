# This file is responsible for configuring your application
# and its dependencies with the aid of the Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
import Config

config :shark_attack,
  ecto_repos: [SharkAttack.Repo]

# Configures the endpoint
config :shark_attack, SharkAttackWeb.Endpoint,
  url: [host: "localhost"],
  compress: true,
  render_errors: [view: SharkAttackWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: SharkAttack.PubSub,
  live_view: [signing_salt: "EYLKcoEy"]

config :cors_plug,
  origin: [
    "https://lenderlabs.xyz",
    "https://stage.lenderlabs.xyz",
    "https://stage--chimerical-custard-213af0.netlify.app",
    "http://localhost:3000"
  ],
  max_age: 86400,
  headers: ["accept", "content-type", "origin", "authorization", "baggage"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"]

config :shark_attack, SharkAttack.Scheduler,
  timeout: 500_000,
  jobs: [
    {"5 5 * * 4", {SharkAttack.Notifications, :send_weekly_summary, []}},
    {"*/20 * * * *", {SharkAttack.LoansWorker, :flush, []}},
    # {"*/30 * * * *", {SharkAttack.Stats, :update_loans, []}},
    {"@daily", {SharkAttack.Stats, :pull_all_citrus_loans, []}},
    {"@daily", {SharkAttack.Staking, :stake_awards, []}},
    {"*/5 * * * *", {SharkAttack.Notifications, :foreclosures, []}},
    {"*/5 * * * *", {SharkAttack.DLMMPools, :update_pools_api, []}},
    {"*/1 * * * *", {SharkAttack.AutoForeclose, :get_and_foreclose_loans, []}},
    {"*/3 * * * *", {SharkAttack.AutoRescind, :get_and_rescind_loans, []}},
    {"*/3 * * * *", {SharkAttack.LenderFee, :batch_refund_and_collect_fees, []}}
  ]

# Configures the mailer
#
# By default it uses the "Local" adapter which stores the emails
# locally. You can see the emails in your browser, at "/dev/mailbox".
#
# For production it's recommended to configure a different adapter
# at the `config/runtime.exs`.
config :shark_attack, SharkAttack.Mailer, adapter: Swoosh.Adapters.Local

# Swoosh API client is needed for adapters other than SMTP.
config :swoosh, :api_client, false

# Configure tailwind (the version is required)
config :tailwind,
  version: "3.2.4",
  default: [
    args: ~w(
      --config=tailwind.config.js
      --input=css/app.css
      --output=../priv/static/assets/app.css
    ),
    cd: Path.expand("../assets", __DIR__)
  ]

# # Configure esbuild (the version is required)
# config :esbuild,
#   version: "0.13.5",
#   default: [
#     args:
#       ~w(js/app.jsx --bundle --target=esnext --outdir=../priv/static/assets --external:/fonts/* --external:/images/*),
#     cd: Path.expand("../assets", __DIR__),
#     env: %{"NODE_PATH" => Path.expand("../deps", __DIR__)}
#   ]

config :shark_attack, SharkAttack.Vault,
  ciphers: [
    default:
      {Cloak.Ciphers.AES.GCM,
       tag: "AES.GCM.V1", key: Base.decode64!("xdzZGSkAKVLSg8QkQx+BBxWourhdtRCKBuTE13uPxjA=")}
  ]

config :nostrum,
  token: "MTA3MzgwNzczODAwNzczMjI0NQ.G7LawU.Zyt_Ea2zGO9nRqM4KuGFZ-4aacEzxOgyCHE2B8",
  gateway_intents: [
    :guilds,
    :guild_messages,
    :direct_messages,
    :guild_members,
    :message_content
  ]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{config_env()}.exs"

config :shark_attack, SharkAttack.AccountCache,
  # 60 seconds timeout
  timeout: 60_000
