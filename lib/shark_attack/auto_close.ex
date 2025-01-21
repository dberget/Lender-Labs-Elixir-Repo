defmodule SharkAttack.AutoClose do
  alias SharkAttack.Repo
  alias SharkAttack.Defi.AutoClose
  alias Ecto.Changeset

  import Ecto.Query
  require Logger

  def get_and_close_positions() do
    get_positions_to_close() |> close_positions()
  end

  def get_user_auto_close(user_address) do
    query =
      from(p in AutoClose,
        where: p.user_address == ^user_address,
        select: p
      )

    Repo.all(query)
  end

  def insert_auto_close(params) do
    %AutoClose{}
    |> AutoClose.changeset(Map.put(params, "status", "ACTIVE"))
    |> Repo.insert()
  end

  defp update_close_status(nonce_account, new_status) do
    position = Repo.get_by(AutoClose, nonce_account: nonce_account)

    if position.status == "ACTIVE" do
      position =
        position
        |> Changeset.change(%{status: new_status})
        |> Changeset.optimistic_lock(:version)

      case Repo.update(position) do
        {:ok, _struct} -> :ok
        {:error, _changeset} -> :error
      end
    else
      Logger.info("Position with nonce #{nonce_account} is not ACTIVE, not updating status")
      :error
    end
  end

  def get_auto_close_info(nonce_account) do
    Repo.get_by(AutoClose, nonce_account: nonce_account)
  end

  def get_nonce_accounts(user_address) do
    query =
      from(p in AutoClose,
        where: p.status == "ACTIVE" and p.user_address == ^user_address,
        select: p
      )

    Repo.all(query)
    |> Enum.map(fn position ->
      %{
        "position_address" => position.position_address,
        "nonce_account" => position.nonce_account
      }
    end)
  end

  def get_positions_to_close() do
    query =
      from(p in AutoClose,
        where: p.status == "ACTIVE",
        select: p
      )

    Repo.all(query)
  end

  def close_positions([]), do: :ok

  def close_positions(positions) do
    for position <- positions do
      Logger.info("Closing position #{position.position_address}")

      SharkAttack.Helpers.do_post_request(
        "http://localhost:5001/send_nonce_tx",
        %{encodedTx: position.encoded_transaction, nonceAccount: position.nonce_account}
      )
      |> parse_close_position_response(position)
    end
  end

  def close_nonce_accounts(accounts, new_status \\ "CANCELLED") do
    for account <- accounts do
      Logger.info("Closing nonce account #{account}")

      SharkAttack.Helpers.do_post_request(
        "http://localhost:5001/close_nonce",
        %{nonceAccount: account}
      )
      |> parse_close_response(account, new_status)
    end
  end

  defp parse_close_position_response(
         %{"resp" => %{"txHash" => txHash, "closeNonceHash" => close_nonce_hash}},
         position
       ) do
    Logger.info(
      "Position #{position.position_address} closed with tx #{txHash} and close nonce tx #{close_nonce_hash}"
    )

    update_close_status(position.nonce_account, "AUTO_CLOSED")

    :ok
  end

  defp parse_close_position_response(%{"resp" => %{"error" => reason}}, position) do
    Logger.info("Unable to close position #{position.position_address} because #{reason}")
    :ok
  end

  defp parse_close_position_response({:error, reason}, _) do
    Logger.warning("Error calling the node backend to close position, #{reason}")
    :error
  end

  defp parse_close_response(
         %{"resp" => %{"closeNonceHash" => close_nonce_hash}},
         nonce_account,
         new_status
       ) do
    Logger.info("Nonce account #{nonce_account} closed with tx #{close_nonce_hash}")

    update_close_status(nonce_account, new_status)

    :ok
  end

  defp parse_close_response({:error, reason}, _, _) do
    Logger.warning("Error calling the node backend to close the nonce account, #{reason}")
    :error
  end

  def cleanup_closed_positions() do
    get_positions_to_close()
    |> Enum.each(fn position ->
      response =
        SharkAttack.DLMMPools.get_dlmm_position_data(
          position.pool_address,
          position
        )

      case response do
        {:error, "{\"error\":\"Account does not exist or has no data " <> _} ->
          # Position no longer exists, mark as CLOSED
          Logger.info("Position #{position.position_address} no longer exists, marking as CLOSED")
          update_close_status(position.nonce_account, "CLOSED")

        %{"position" => _} ->
          # Position still exists, do nothing
          :ok

        {:error, reason} ->
          Logger.warning("Error checking position status: #{reason}")
          :error
      end
    end)
  end
end
