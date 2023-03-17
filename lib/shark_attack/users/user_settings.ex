defmodule SharkAttack.Accounts.UserSettings do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder,
           only: [
             :loan_taken,
             :loan_repaid,
             :loan_foreclosure,
             :ltf_alert,
             :summary_report,
             :frakt_raffles
           ]}
  schema "user_settings" do
    belongs_to(:user, SharkAttack.Accounts.User,
      foreign_key: :user_address,
      references: :address,
      type: :string
    )

    field(:loan_taken, :boolean, default: true)
    field(:loan_repaid, :boolean, default: true)
    field(:loan_foreclosure, :boolean, default: true)
    field(:ltf_alert, :boolean, default: false)
    field(:summary_report, :boolean, default: false)
    field(:frakt_raffles, :boolean, default: false)

    timestamps()
  end

  @doc false
  def changeset(loan_plan, attrs) do
    loan_plan
    |> cast(attrs, [
      :user_address,
      :loan_taken,
      :loan_repaid,
      :loan_foreclosure,
      :ltf_alert,
      :summary_report,
      :frakt_raffles
    ])
    |> validate_required([:user_address])
  end
end
