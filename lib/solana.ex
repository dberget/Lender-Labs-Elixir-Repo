defmodule SharkAttack.Solana do
  import SharkAttack.Helpers

  @asset_rpc_url "https://mainnet.helius-rpc.com/?api-key=8fea9de0-b3d0-4bf4-a1fb-0945dfd91d42"
  @rpc_url "https://stylish-misty-replica.solana-mainnet.quiknode.pro/b8961d53b160fcc4e0557911b4ed5e6e3ebf9ac8/"
  @pk Solana.pubkey!("FLshW3pj5KWt4S5JDnsHiFqoUu8WK8S8JhVHp5L9rC6x")

  def send_transaction(bin_tx) do
    params =
      %{
        "jsonrpc" => "2.0",
        "id" => 1,
        "method" => "sendTransaction",
        "params" => [
          bin_tx |> to_string() |> B58.encode58(),
          %{
            "encoding" => "base64"
          }
        ]
      }
      |> Jason.encode!()

    res = do_post_request(@rpc_url, params)

    res["result"]
  end

  def get_signatures_for_address(address) do
    params =
      %{
        "jsonrpc" => "2.0",
        "id" => "my-id",
        "method" => "getSignaturesForAddress",
        "params" => [
          address,
          %{
            "limit" => 10
          }
        ]
      }

    res = do_post_request(@rpc_url, params)

    res["result"]
  end

  def fetch_native_balance(address) do
    res =
      do_get_request(
        "https://api.helius.xyz/v0/addresses/#{address}/balances?api-key=879fb544-7947-4257-b907-3d94c9e29613"
      )

    res["nativeBalance"]
  end

  def sign_and_send_transaction(instructions) do
    {:ok, signer} = SharkAttack.getWallet()

    %{
      "result" => %{
        "value" => %{
          "blockhash" => blockhash
        }
      }
    } =
      SharkAttack.Helpers.do_post_request(@rpc_url, %{
        "id" => 1,
        "jsonrpc" => "2.0",
        "method" => "getLatestBlockhash",
        "params" => [
          %{
            "commitment" => "finalized"
          }
        ]
      })

    t = %Solana.Transaction{
      payer: @pk,
      blockhash: blockhash |> Solana.pubkey!(),
      instructions: instructions,
      signers: [signer]
    }

    %{"result" => sig} =
      SharkAttack.Helpers.do_post_request(
        @rpc_url,
        Solana.RPC.Request.send_transaction(t, skip_preflight: true)
        |> Solana.RPC.Request.encode()
      )

    sig
  end

  def get_account_info(account_address) do
    case SharkAttack.AccountCache.get_account(account_address) do
      nil ->
        client = Solana.RPC.client(network: @rpc_url)
        {:ok, account_data} = get_account_info(account_address, client)
        standardize_account_data(account_data)

      [] ->
        client = Solana.RPC.client(network: @rpc_url)
        {:ok, account_data} = get_account_info(account_address, client)
        standardize_account_data(account_data)

      %{
        "data" => [
          _data,
          "base64"
        ],
        "executable" => _,
        "lamports" => _,
        "owner" => _,
        "rentEpoch" => _,
        "space" => _
      } = account ->
        standardize_account_data(account)

      [account_data] ->
        standardize_account_data(account_data)
    end
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

  def getAndCreateTokenAccountIfNotExists(address, user, client) do
    token_account = get_token_account(address, Solana.pubkey!(user))

    {:ok, token_account_info} = get_account_info(B58.encode58(token_account), client)

    parse_token_account_info = token_account_info |> Jason.decode!()

    createTokenAccount(
      parse_token_account_info["result"]["value"],
      address,
      token_account,
      user
    )

    token_account
  end

  def send_nft(recipient, mint) do
    client = Solana.RPC.client(network: @rpc_url)

    from_token_acct = get_token_account(mint, @pk)

    to_token_acct = getAndCreateTokenAccountIfNotExists(mint, recipient, client)

    Process.sleep(30_000)

    ix =
      Solana.SPL.Token.transfer(
        to: to_token_acct,
        from: from_token_acct,
        owner: @pk,
        mint: mint |> Solana.pubkey!(),
        amount: 1
      )

    sign_and_send_transaction([ix])
  end

  defp createTokenAccount(nil, address, token_account, recipient) do
    ix =
      Solana.SPL.AssociatedToken.create_account(
        new: token_account,
        payer: @pk,
        owner: recipient |> Solana.pubkey!(),
        mint: address |> Solana.pubkey!()
      )

    sign_and_send_transaction([ix])
  end

  defp createTokenAccount(_info_, _, _address, _client), do: nil

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

  def get_program_accounts(programId) do
    params = get_program_account_request(programId)

    res = do_post_request(@rpc_url, params)

    res["result"]
  end

  def get_program_account_request(programId) do
    %{
      "jsonrpc" => "2.0",
      "id" => 1,
      "method" => "getProgramAccounts",
      "params" => [
        programId,
        %{
          "encoding" => "jsonParsed",
          "dataSlice" => %{
            "offset" => 0,
            "length" => 0
          }
        }
      ]
    }
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

  def get_transaction(signatures) do
    params = get_transaction_request(signatures)

    res = do_post_request(@rpc_url, params) |> IO.inspect()

    res["result"]
  end

  def get_transaction_request(signatures) do
    %{
      "jsonrpc" => "2.0",
      "id" => 1,
      "method" => "getTransaction",
      "params" => [
        signatures,
        "json"
      ]
    }
  end

  def get_asset(mint) do
    get_assets([mint])
  end

  def get_assets(mints) do
    params = Enum.map(mints, &get_assets_request(&1))

    res = do_post_request(@asset_rpc_url, params)

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
        "tokenType" => "nonFungible",
        "page" => page,
        "limit" => 1000
      }
    }

    case do_post_request(@asset_rpc_url, body) do
      {:error, _} ->
        {:error, []}

      body ->
        %{"result" => %{"items" => items}} = body

        {:ok, items}
    end
  end

  def fetch_creator_assets(address, page) do
    body = %{
      "jsonrpc" => "2.0",
      "id" => "my-id",
      "method" => "getAssetsByCreator",
      "params" => %{
        "onlyVerified" => true,
        "creatorAddress" => address,
        "page" => page
      }
    }

    case do_post_request(@asset_rpc_url, body) do
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

  defp standardize_account_data(account_data) when is_map(account_data) do
    case account_data do
      %{"data" => [_data, "base64"]} ->
        {:ok, account_data}

      {:ok, _data} = standardized ->
        standardized

      data when is_map(data) ->
        {:ok, data}
    end
  end

  defp standardize_account_data({_key, %{"data" => [_data, "base64"]} = data}) do
    {:ok, data}
  end

  defp standardize_account_data(nil), do: {:error, :account_not_found}
end
