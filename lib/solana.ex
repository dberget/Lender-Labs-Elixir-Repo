defmodule SharkAttack.Solana do
  import SharkAttack.Helpers

  @rpc_url "https://mainnet.helius-rpc.com/?api-key=d250e974-e6c5-4428-a9ca-25f8cd271444"
  # @rpc_url "https://stylish-misty-replica.solana-mainnet.quiknode.pro/b8961d53b160fcc4e0557911b4ed5e6e3ebf9ac8/"
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

  @spec get_account_info(binary | {any, binary}, binary | Tesla.Client.t()) ::
          {:error, any} | {:ok, Tesla.Env.t()}
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

  def get_user_token_mints(wallet) do
    params = get_token_accounts_request(wallet)

    res = do_post_request(@rpc_url, params)

    res["result"]
    |> Enum.map(fn x ->
      get_in(x, ["account", "data", "parsed", "info"])
    end)
  end

  def get_token_accounts(wallet) do
    params = get_token_accounts_request(wallet)

    do_post_request(@rpc_url, params)
  end

  def get_token_accounts_request(wallet) do
    %{
      "jsonrpc" => "2.0",
      "id" => 1,
      "method" => "getProgramAccounts",
      "params" => [
        "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        %{
          "encoding" => "jsonParsed",
          "filters" => [
            %{
              "dataSize" => 165
            },
            %{
              "memcmp" => %{
                "offset" => 32,
                "bytes" => wallet
              }
            }
          ]
        }
      ]
    }
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

  def get_account_signatures(account, limit \\ 5) do
    params = get_account_signatures_request(account, limit)

    res = do_post_request(@rpc_url, params)

    res["result"]
  end

  def get_account_signatures_request(account, limit) do
    %{
      "jsonrpc" => "2.0",
      "id" => 1,
      "method" => "getSignaturesForAddress",
      "params" => [
        account,
        %{
          "limit" => limit
        }
      ]
    }
  end

  def get_assets(mints) do
    params = Enum.map(mints, &get_assets_request(&1))

    res = do_post_request(@rpc_url, params)

    res
  end

  def get_assets_request(mint) do
    %{
      "jsonrpc" => "2.0",
      "id" => mint,
      "method" => "getAsset",
      "params" => %{
        "id" => mint
      }
    }
  end

  def fetch_assets(address, page) do
    body = %{
      "jsonrpc" => "2.0",
      "id" => "my-id",
      "method" => "searchAssets",
      "params" => %{
        "ownerAddress" => address,
        "page" => page,
        "limit" => 1000
      }
    }

    case do_post_request(@rpc_url, body) do
      {:error, _} ->
        {:error, []}

      body ->
        %{"result" => %{"items" => items}} = body

        {:ok, items}
    end
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
