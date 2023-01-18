defmodule SharkAttack.Repo do
  use Ecto.Repo,
    otp_app: :shark_attack,
    adapter: Ecto.Adapters.MyXQL
end
