defmodule SharkAttackWeb.EventController do
  use SharkAttackWeb, :controller
  require Logger

  def debug(conn, params) do
    event = Map.get(params, "_json") |> Jason.decode!()

    SharkAttack.Workers.LoanHandler.update_loan(event)

    conn
    |> json(%{message: "ok"})
  end

  def index(conn, params) do
    event = Map.get(params, "_json") |> List.first()

    # SharkAttack.Events.insert_loan_event(
    #   event["type"],
    #   event["source"],
    #   event
    # )

    SharkAttack.Workers.LoanHandler.update_loan(event)

    conn
    |> json(%{message: "ok"})
  end

  def dlmm(conn, params) do
    event = Map.get(params, "_json") |> List.first()

    case event do
      %{
        "type" => "UNKNOWN",
        "instructions" => instructions,
        "nativeTransfers" => transfers,
        "accountData" => _account_data
      }
      when is_list(instructions) and is_list(transfers) ->
        # Find the main lending instruction (should be the second instruction after compute budget)
        lending_instruction =
          Enum.find(instructions, fn instruction ->
            instruction["programId"] == "LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo" and
              length(instruction["accounts"]) >= 13
          end)

        is_new_pool =
          case lending_instruction do
            nil ->
              false

            _ ->
              # Check for specific patterns of new pool creation:

              # 1. Multiple rent payments (positive native balance changes > 2 SOL)
              # rent_payments =
              #   Enum.count(account_data, fn acc ->
              #     acc["nativeBalanceChange"] > 2_000_000
              #   end)

              # 2. No token transfers in the transaction (new pools don't transfer tokens)
              no_token_transfers =
                case event do
                  %{"tokenTransfers" => []} -> true
                  _ -> false
                end

              # 3. First real instruction to lending program (after compute budget)
              is_first_lending =
                Enum.find_index(instructions, fn instr ->
                  instr["programId"] == "LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo"
                end) == 1

              # 4. Has exactly 3 instructions (compute budget, lending, compute budget)
              has_three_instructions = length(instructions) == 3

              # All conditions must be true for new pool creation
              # rent_payments >= 3 and
              is_first_lending and
                no_token_transfers and
                has_three_instructions
          end

        if is_new_pool do
          IO.inspect(event["signature"], label: "New pool created")
          Logger.info("New pool created: #{event["signature"]}")
          # Handle new pool creation here
        end

      _ ->
        nil
    end

    conn
    |> json(%{message: "ok"})
  end

  def purchase(conn, params) do
    SharkAttack.Users.create_user(%{address: params["transactionObject"]["meta"]["senderPK"]})

    conn
    |> json(%{message: "ok"})
  end

  def nft(conn, params) do
    event = Map.get(params, "_json") |> List.first()

    purchased_mint =
      event["events"]["nft"]["nfts"] |> List.first() |> Map.get("mint") |> IO.inspect()

    SharkAttack.Events.insert_loan_event(
      event["type"],
      event["source"],
      event
    )

    conn
    |> json(%{mint: purchased_mint})
  end
end
