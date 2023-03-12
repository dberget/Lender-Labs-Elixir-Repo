import React from "react";

import {
  useWallet,
  useConnection,
  useAnchorWallet,
} from "@solana/wallet-adapter-react";
import { createLoansService } from "@frakt-protocol/frakt-sdk/lib/loans/loansService";
import { loans as loanSDK } from "@frakt-protocol/frakt-sdk";
import { toast } from "react-hot-toast";
import {
  getBondsPreview,
  getBondMarket,
  getMarketPairs,
  getNftMerkleTreeProof,
} from "../utils/frakt";
import { fbondFactory } from "fbonds-core/lib/fbond-protocol/functions";
import { validateAndSellNftToTokenToNftPair } from "fbonds-core/lib/fbond-protocol/functions/router";
import { PublicKey, LAMPORTS_PER_SOL, Transaction } from "@solana/web3.js";

const BONDS_PROGRAM_PUBKEY = new PublicKey(
  "4tdmkuY6EStxbS6Y8s5ueznL3VPMSugrvQuDeAHGZhSt"
);
const BONDS_ADMIN_PUBKEY = new PublicKey(
  "9J4yDqU6wBkdhP5bmJhukhsEzBkaAXiBmii52kTdxpQq"
);

const BOND_DECIMAL_DELTA = 1e4;
const BOND_SOL_DECIMAIL_DELTA = 1e5;
const BOND_MAX_RETURN_AMOUNT_FILTER = 1000 * 1e9; //? 1000 SOL

const API_DOMAIN = "api.frakt.xyz";
const PROGRAM_PUBLIC_KEY = "A66HabVL3DzNzeJgcHYtRRNW1ZRMKwBfrdSR4kLsZ9DJ";
const ADMIN_PUBLIC_KEY = "9aTtUqAnuSMndCpjcPosRNf3fCkrTQAV8C8GERf3tZi3";

export const FraktContext = React.createContext({});

export const FraktProvider = (props) => {
  const [nfts, setFraktNfts] = React.useState([]);
  const [loans, setLoans] = React.useState([]);
  const { publicKey, signTransaction } = useWallet();
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  const { proposeLoan, fetchWalletNfts } = createLoansService({
    apiDomain: API_DOMAIN,
    programPublicKey: PROGRAM_PUBLIC_KEY,
    adminPublicKey: ADMIN_PUBLIC_KEY,
  });

  const getLoans = async () => {
    const res = await fetch(
      `https://api.frakt.xyz/loan/all/${publicKey.toString()}`
    );

    const data = await res.json();

    for (let index = 0; index < data.length; index++) {
      const loan = data[index];

      loan.end = loan.classicParams.timeBased.expiredAt;
      loan.platform = "FRAKT";
    }

    setLoans(data);
  };

  const getMarket = async (marketAdd) => {
    return getBondMarket(marketAdd);
  };

  const repayLoan = async (loan) => {
    const { ixs } = await loanSDK.paybackLoanIx({
      user: publicKey,
      loan: new PublicKey(loan.pubkey),
      liquidityPool: new PublicKey(loan.classicParams.liquidityPool),
      collectionInfo: new PublicKey(loan.classicParams.collectionInfo),
      royaltyAddress: new PublicKey(loan.classicParams.royaltyAddress),
      connection,
      nftMint: new PublicKey(loan.nft.mint),
      admin: new PublicKey(ADMIN_PUBLIC_KEY),
      programId: new PublicKey(PROGRAM_PUBLIC_KEY),
    });

    const transaction = new Transaction().add(...ixs);

    const blockhash = await connection.getLatestBlockhash();

    transaction.feePayer = publicKey;
    transaction.recentBlockhash = blockhash.blockhash;

    const signedTx = await signTransaction(transaction);

    let sig = connection.sendRawTransaction(signedTx.serialize());

    toast.promise(sig, {
      loading: "Repaying loan...",
      success: (sig) => <a href={`https://solscan.io/tx/${sig}`}>Solscan</a>,
    });
  };

  React.useEffect(() => {
    if (!publicKey) return;

    getLoans();
    getBondsPreview();
    // getBondMarket

    fetchWalletNfts({
      walletPublicKey: publicKey,
    }).then((nfts) => {
      setFraktNfts(nfts);
    });
  }, [publicKey]);

  const takeLoan = async (fraktNft) => {
    let res = proposeLoan({
      nftMint: fraktNft.mint, // pubkey as a string
      valuation: fraktNft.valuation, // Valuation of proposed nft (contained in BorrowNft type from fetchWalletNfts)
      ltv: fraktNft.timeBased.ltvPercents, // Loan to value (contained in BorrowNft type from fetchWalletNfts)
      isPriceBased: false, // is loan flip of perpetual (contained in BorrowNft type from fetchWalletNfts)
      connection, // web3.Connection
      wallet, // Object that implements Wallet interface: {publicKey, signTransaction, signAllTransactions}
    });

    await toast.promise(res, {
      loading: "Taking loan...",
      success: "Success!",
    });
  };

  const buildBondLoan = async ({ mint, pair, market }) => {
    const amountToReturn =
      Math.trunc((1 * LAMPORTS_PER_SOL) / pair.currentSpotPrice) *
      BOND_DECIMAL_DELTA;

    const proof = await (async () => {
      if (market.whitelistEntry?.whitelistType !== "merkleTree") {
        return [];
      }
      return await getNftMerkleTreeProof({ mint: new PublicKey(mint) });
    })();

    const {
      fbond: bondPubkey,
      collateralBox: collateralBoxPubkey,
      fbondTokenMint: bondTokenMint,
      instructions: createBondIxns,
      signers: createBondSigners,
    } = await fbondFactory.createBondWithSingleCollateral({
      accounts: {
        tokenMint: new PublicKey(mint),
        userPubkey: publicKey,
      },
      args: {
        amountToDeposit: 1,
        amountToReturn: amountToReturn,
        bondDuration: pair.validation.durationFilter,
      },
      connection,
      programId: BONDS_PROGRAM_PUBKEY,
      sendTxn: async () => await Promise.resolve(null),
    });

    const {
      instructions: validateAndsellIxs,
      signers: validateAndsellSigners,
    } = await validateAndSellNftToTokenToNftPair({
      accounts: {
        collateralBox: collateralBoxPubkey,
        fbond: bondPubkey,
        fbondTokenMint: bondTokenMint,
        collateralTokenMint: new PublicKey(mint),
        fraktMarket: new PublicKey(market.fraktMarket.publicKey),
        oracleFloor: new PublicKey(market.oracleFloor?.publicKey),
        whitelistEntry: new PublicKey(market.whitelistEntry?.publicKey),
        hadoMarket: new PublicKey(pair.hadoMarket),
        pair: new PublicKey(pair.publicKey),
        userPubkey: publicKey,
        protocolFeeReceiver: new PublicKey(BONDS_ADMIN_PUBKEY),
        assetReceiver: new PublicKey(pair.assetReceiver),
      },
      args: {
        proof: proof,
        amountToSell: amountToReturn / BOND_DECIMAL_DELTA, //? amount of fbond tokens decimals
        minAmountToGet:
          (amountToReturn / BOND_DECIMAL_DELTA) * pair.currentSpotPrice, //? SOL lamports
        skipFailed: false,
      },
      connection,
      programId: BONDS_PROGRAM_PUBKEY,
      sendTxn: async () => await Promise.resolve(null),
    });

    const transaction = new Transaction().add(
      ...createBondIxns,
      ...validateAndsellIxs
    );

    const blockhash = await connection.getLatestBlockhash();

    transaction.feePayer = publicKey;
    transaction.recentBlockhash = blockhash.blockhash;

    transaction.sign(...createBondSigners, ...validateAndsellSigners);

    const signedTx = await signTransaction(transaction);

    let sig = await connection.sendRawTransaction(signedTx.serialize(), {
      skipPreflight: true,
    });

    console.log(sig);
  };

  return (
    <FraktContext.Provider
      value={{ takeLoan, nfts, loans, getMarket, buildBondLoan, repayLoan }}
    >
      {props.children}
    </FraktContext.Provider>
  );
};

export const useFrakt = () => {
  const { takeLoan, nfts, loans, getMarket, buildBondLoan, repayLoan } =
    React.useContext(FraktContext);

  return {
    takeLoan,
    nfts,
    loans,
    repayLoan,
    getBondMarket: getMarket,
    getMarketPairs,
    buildBondLoan,
  };
};
