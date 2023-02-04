defmodule SharkAttack.Solana do
  import SharkAttack.Helpers

  @rpc_url "https://stylish-misty-replica.solana-mainnet.quiknode.pro/b8961d53b160fcc4e0557911b4ed5e6e3ebf9ac8/"
  @pk Solana.pubkey!("BS61tv1KbsPhns3ppU8pmWozfReZjhxFL2MPhBdDWNEm")

  def send_transaction(bin_tx) do
    params =
      %{
        "jsonrpc" => "2.0",
        "id" => 1,
        "method" => "sendTransaction",
        "params" => [
          Base.encode64(bin_tx),
          %{
            "encoding" => "base64"
          }
        ]
      }
      |> Jason.encode!()

    res = do_post_request(@rpc_url, params)

    res["result"]
  end

  def sign_and_send_transaction(instructions, client) do
    {:ok, signer} = SharkAttack.getWallet()

    {:ok, %{"blockhash" => blockhash}} =
      Solana.RPC.send(
        client,
        Solana.RPC.Request.get_latest_blockhash()
      )

    t = %Solana.Transaction{
      payer: @pk,
      blockhash: blockhash |> Solana.pubkey!(),
      instructions: instructions,
      signers: [signer]
    }

    Solana.RPC.send(
      client,
      Solana.RPC.Request.send_transaction(t, skip_preflight: true)
    )
  end

  def get_account_info(address, client) do
    request_account_info(address, client)
  end

  def request_account_info(address, client) do
    pubkey = Solana.pubkey!(address)

    Solana.RPC.send(
      client,
      Solana.RPC.Request.get_account_info(pubkey)
    )
  end

  def getAndCreateTokenAccountIfNotExists(address, client) do
    token_account = get_token_account(address, @pk)

    {:ok, token_account_info} = get_account_info(B58.encode58(token_account), client)
    createTokenAccount(token_account_info, address |> Solana.pubkey!(), client)

    token_account
  end

  defp createTokenAccount(nil, address, client) do
    {:ok, assoc_address} = Solana.SPL.AssociatedToken.find_address(address, @pk)

    ix =
      Solana.SPL.AssociatedToken.create_account(
        new: assoc_address,
        payer: @pk,
        owner: @pk,
        mint: address
      )

    sign_and_send_transaction(
      [ix],
      client
    )
  end

  defp createTokenAccount(_info_, _address, _client), do: nil

  def get_token_account(mint, address) do
    mint = Solana.pubkey!(mint)

    {:ok, res} = Solana.SPL.AssociatedToken.find_address(mint, address)

    res
  end

  def get_token_account_balance(token_account) do
    params =
      token_account
      |> get_token_balance_request()

    res = do_post_request(@rpc_url, params)

    get_in(res, ["result", "value", "amount"])
  end

  def get_program_accounts(programId, bytes, size) do
    params = get_program_account_request(programId, bytes, size)

    res = do_post_request(@rpc_url, params)

    res["result"]
  end

  def get_program_account_request(programId, bytes, size) do
    %{
      "jsonrpc" => "2.0",
      "id" => 1,
      "method" => "getProgramAccounts",
      "params" => [
        programId,
        %{
          "filters" => [
            %{
              "dataSize" => size
            },
            %{
              "memcmp" => %{
                "offset" => 10,
                "bytes" => bytes
              }
            }
          ],
          encoding: "base64"
        }
      ]
    }
    |> Jason.encode!()
  end

  def get_token_balance(address) do
    get_token_account_balance(address)
  end

  def get_token_balance_request(token_account) do
    %{
      "jsonrpc" => "2.0",
      "id" => 1,
      "method" => "getTokenAccountBalance",
      "params" => [
        token_account
      ]
    }
    |> Jason.encode!()
  end
end
