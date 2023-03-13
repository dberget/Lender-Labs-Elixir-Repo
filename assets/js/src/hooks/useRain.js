import React from "react";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import BN from "bn.js";

import { notify } from "../utils/discord";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  VersionedTransaction,
  TransactionMessage,
  SystemProgram,
} from "@solana/web3.js";
import {
  NATIVE_MINT,
  createSyncNativeInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";

import { toast } from "react-hot-toast";
import { Rain, Pool } from "@rainfi/sdk";

export const RainContext = React.createContext({});

export const RainProvider = (props) => {
  const { connection } = useConnection();
  const { publicKey, signTransaction, signAllTransactions } = useWallet();
  const [rainPools, setRainPools] = React.useState([]);
  const [rainLoans, setRainLoans] = React.useState([]);

  const rain = React.useMemo(
    () => new Rain(connection, publicKey),
    [publicKey]
  );

  const getPools = async () => {
    const pools = await rain.utils.getAllPools(connection);

    setRainPools(pools);
  };

  const getLoans = async () => {
    const loans = await rain.utils.getLoansFromBorrower(connection, publicKey);

    const newLoans = [];
    for (let index = 0; index < loans.length; index++) {
      const loan = loans[index];

      if (loan.status == "ongoing") {
        loan.end = loan.expiredAt;
        loan.platform = "Rain";

        newLoans.push(loan);
      }
    }

    setRainLoans(newLoans);
  };

  const takeLoan = async (mint, pool, collectionId) => {
    const { getCollection, getFeesDetailed } = rain.utils;

    const collection = await getCollection(connection, collectionId);
    const bestOffer = (collection.floorPrice * pool.loanToValue) / 10000;

    const durationDays = pool?.loanCurve.maxDuration / 60 / 60 / 24;
    const fees = getFeesDetailed(pool, bestOffer, durationDays);

    const { instruction, signers } = await rain.borrow({
      nftMint: mint,
      poolOwner: new PublicKey(pool.owner),
      duration: durationDays,
      amount: bestOffer,
      interest: fees.feesInSol,
      slippage: 50,
    });

    const blockhash = await connection.getLatestBlockhash();

    const lookupTable = (
      await connection.getAddressLookupTable(
        new PublicKey("ztFFV6nfS7veRm2BbQgwaLnsenBjEfs6fpQde6reaco")
      )
    ).value;

    const messageV0 = new TransactionMessage({
      payerKey: publicKey,
      recentBlockhash: blockhash.blockhash,
      instructions: instruction,
    }).compileToV0Message([lookupTable]);

    const transaction = new VersionedTransaction(messageV0);

    const signedTx = await signTransaction(transaction);

    signedTx.sign([signers]);

    let sig = connection.sendRawTransaction(signedTx.serialize());

    await toast.promise(sig, {
      loading: "Taking loan...",
      success: (sig) => {
        return (
          <a
            href={`https://solscan.io/tx/${sig}`}
            target="_blank"
            rel="noreferrer"
          >
            View on Solscan
          </a>
        );
      },
    });

    notify(`Rain Loan Taken, ${bestOffer / LAMPORTS_PER_SOL} SOL}`);
  };

  const getPool = (poolAddress) => {
    let pool = rainPools.find((pool) => pool.address == poolAddress);

    return new Pool(connection, new PublicKey(pool.owner), publicKey);
  };

  const repayAll = async () => {
    const transactions = await Promise.all(
      rainLoans.map((loan) => repayLoan(loan, true))
    );

    const signedTxs = await signAllTransactions(transactions);

    signedTxs.map(async (tx) => {
      let res = connection.sendRawTransaction(tx.serialize(), {
        commitment: "confirmed",
      });

      toast.promise(res, {
        loading: "Repaying...",
        success: (data) => (
          <a target="_blank" href={`https://solscan.io/tx/${data}`}>
            https://solscan.io/tx/{data.substr(0, 5)}...
          </a>
        ),
      });
    });
  };

  const repayLoan = async (loan, returnTx) => {
    let pool = getPool(loan.poolAddress);

    const repayIx = await pool.repay(
      new PublicKey(loan.accountAddress),
      loan.amount + loan.interest
    );

    const lookupTable = (
      await connection.getAddressLookupTable(
        new PublicKey("ztFFV6nfS7veRm2BbQgwaLnsenBjEfs6fpQde6reaco")
      )
    ).value;

    const blockhash = await connection.getLatestBlockhash();

    const messageV0 = new TransactionMessage({
      payerKey: publicKey,
      recentBlockhash: blockhash.blockhash,
      instructions: repayIx,
    }).compileToV0Message([lookupTable]);

    const transaction = new VersionedTransaction(messageV0);

    if (returnTx) return transaction;

    const signedTx = await signTransaction(transaction);

    let sig = connection.sendRawTransaction(signedTx.serialize(), {
      skipPreflight: true,
    });

    await toast.promise(sig, {
      loading: "Taking loan...",
      success: (sig) => {
        return (
          <a
            href={`https://solscan.io/tx/${sig}`}
            target="_blank"
            rel="noreferrer"
          >
            View on Solscan
          </a>
        );
      },
    });

    notify(`Rain loan repaid! ${loan.accountAddress}`);
  };

  React.useEffect(() => {
    if (publicKey) {
      getPools();
      getLoans();
    }
  }, [publicKey]);

  const getInterest = (pool) => {
    const { interestLamports, interestPercentage, rainFees } =
      rain.utils.computeInterest(
        new BN(pool.loanAmount * LAMPORTS_PER_SOL),
        pool.loanCurve.maxDuration / 60 / 60 / 24,
        pool.loanCurve.interestRate,
        new BN(pool.totalAmount),
        new BN(pool.borrowedAmount),
        pool.loanCurve?.baseInterest,
        pool.loanCurve?.maxDuration / 60 / 60 / 24,
        pool.loanCurve?.curveRate,
        pool.loanCurve?.curveRateDay
      );

    return interestLamports / LAMPORTS_PER_SOL;
  };

  return (
    <RainContext.Provider
      value={{
        rain,
        rainPools,
        repayLoan,
        getInterest,
        getLoans,
        rainLoans,
        takeLoan,
        repayAll,
      }}
    >
      {props.children}
    </RainContext.Provider>
  );
};

export const useRain = (collectionId) => {
  const { connection } = useConnection();
  const [rainPoolsWithCollection, setRainPoolsWithCollection] =
    React.useState(null);

  const {
    rain,
    rainPools,
    getInterest,
    rainLoans,
    takeLoan,
    repayLoan,
    repayAll,
  } = React.useContext(RainContext);

  const getRainPoolsWithCollection = async (rain_fi_id) => {
    let rain_collection = await rain.utils.getCollection(
      connection,
      rain_fi_id
    );

    let rainPoolsWithCollection = rainPools
      .map((pool) => {
        let collection = pool.collections.find(
          (collection) => collection.collection == rain_fi_id
        );

        if (!collection) return null;

        return {
          ...pool,
          loanToValue: collection?.collectionLtv,
          floorPrice: rain_collection?.floorPrice,
          loanAmount:
            ((collection?.collectionLtv / 10000) *
              rain_collection?.floorPrice) /
            LAMPORTS_PER_SOL,
        };
      })
      .filter(Boolean)
      .sort((a, b) => b.loanToValue - a.loanToValue);

    setRainPoolsWithCollection(rainPoolsWithCollection);
  };

  React.useEffect(() => {
    if (collectionId) {
      getRainPoolsWithCollection(collectionId);
    }
  }, [collectionId]);

  return {
    rainPoolsWithCollection,
    rain,
    getInterest,
    rainLoans,
    takeLoan,
    repayLoan,
    repayAll,
  };
};
