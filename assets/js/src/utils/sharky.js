import React from "react";
import sharky, { aprToInterestRatio, apyToApr } from "@sharkyfi/client";
import toast from "react-hot-toast";
import { PublicKey, Transaction } from "@solana/web3.js";
import { notify } from "./discord";

export const initSharkyClient = (connection, wallet) => {
  let provider = sharky.createProvider(connection, wallet);
  const sharkyClient = sharky.createSharkyClient(provider);
  return sharkyClient;
};

export const takeAllLoans = async (
  offers,
  mints,
  sharkyClient,
  indexes,
  pubkey
) => {
  for (let i = 0; i < mints.length; i++) {
    await takeLoan(
      offers[i],
      mints[i],
      sharkyClient,
      indexes[mints[i].address?.toString()],
      pubkey
    );
  }
};

export const takeLoan = async (
  offer,
  mint,
  sharkyClient,
  nftListIndex,
  pubkey
) => {
  const { connection } = sharkyClient.program.provider;

  const account = await connection.getAccountInfo(
    new PublicKey(offer.pubkey),
    "confirmed"
  );

  const keyedAccountInfo = {
    accountId: new PublicKey(offer.pubkey),
    accountInfo: account,
  };

  const loan = await sharkyClient.parseLoan({
    program: sharkyClient.program,
    keyedAccountInfo,
  });

  const metadata = await connection.getParsedAccountInfo(
    mint.address,
    "confirmed"
  );
  const { freezeAuthority } = metadata?.value?.data?.parsed?.info;
  const isFreezable = Boolean(freezeAuthority);

  const loanPromise = loan.take({
    program: sharkyClient.program,
    nftMintPubKey: mint.address,
    nftListIndex,
    skipFreezingCollateral: !isFreezable,
  });

  await toast.promise(loanPromise, {
    loading: "Taking loan...",
    success: ({ sig }) => {
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
    error: (err) => {
      console.log(err.message);
    },
  });

  notify(`Sharky loan taken! ${offer.amountSol} - ${pubkey}`);
};

export const repayLoan = async (loan, sharkyClient, connection) => {
  const account = await connection.getAccountInfo(
    new PublicKey(loan.pubkey),
    "confirmed"
  );

  const keyedAccountInfo = {
    accountId: new PublicKey(loan.pubkey),
    accountInfo: account,
  };

  const parsedLoan = await sharkyClient.parseLoan({
    program: sharkyClient.program,
    keyedAccountInfo,
  });

  const { orderBook } = await sharkyClient.fetchOrderBook({
    program: sharkyClient.program,
    orderBookPubKey: new PublicKey(loan.orderBook),
  });

  let sig = parsedLoan.repay({
    program: sharkyClient.program,
    orderBook,
  });

  await toast.promise(sig, {
    loading: "Repaying loan...",
    success: ({ sig }) => (
      <a target="_blank" href={`https://solscan.io/tx/${sig}`}>
        Solscan
      </a>
    ),
  });

  notify(`Sharky loan repaid! ${loan.pubkey}`);
};

export const getSharkyInterest = (apy, duration, amountSol) => {
  const amount = aprToInterestRatio(apyToApr(apy), duration) * amountSol;

  // Amount plus fee
  return amount + amount * 0.16;
};

export const renewLoan = async (
  loan,
  sharkyClient,
  offer,
  publicKey = null,
  sendTransaction = null,
  connection = null
) => {
  const parsedLoan = await parseLoan({ loan, sharkyClient });
  const parsedOffer = await parseLoan({ loan: offer, sharkyClient });

  let { instructions } = await parsedLoan.createExtendInstruction({
    program: sharkyClient.program,
    valueMint: new PublicKey(parsedLoan.data.valueTokenMint),
    orderBookPubKey: new PublicKey(parsedLoan.data.orderBook),
    newLoan: parsedOffer,
    feeAuthorityPubKey: new PublicKey(
      "feegKBq3GAfqs9G6muPjdn8xEEZhALLTr2xsigDyxnV"
    ),
  });

  if (sendTransaction == null) {
    return instructions;
  }

  const blockhash = await connection.getRecentBlockhash();

  instructions.programId = new PublicKey(
    "SHARKobtfF1bHhxD2eqftjHBdVSCbKo9JtgK71FhELP"
  );

  let transaction = new Transaction().add(instructions[0]);

  transaction.recentBlockhash = blockhash.blockhash;
  transaction.feePayer = publicKey;

  sendTransaction(transaction, connection);
};

export const repayAll = async (
  sharkyClient,
  loans,
  signAllTransactions,
  publicKey,
  connection
) => {
  let transactions = await Promise.all(
    loans.map(async (loan) => {
      let accountInfo = {
        data: new Buffer.from(loan.rawData.data),
        executable: false,
        lamports: 3243360,
        owner: new PublicKey("SHARKobtfF1bHhxD2eqftjHBdVSCbKo9JtgK71FhELP"),
        rentEpoch: 0,
      };

      const parsedLoan = await sharkyClient.parseLoan({
        program: sharkyClient.program,
        keyedAccountInfo: {
          accountId: new PublicKey(loan.pubkey),
          accountInfo: accountInfo,
        },
      });

      let ix = await parsedLoan.createRepayInstruction({
        program: sharkyClient.program,
        valueMint: new PublicKey(parsedLoan.data.valueTokenMint),
        orderBookPubKey: new PublicKey(parsedLoan.data.orderBook),
        feeAuthorityPubKey: new PublicKey(
          "feegKBq3GAfqs9G6muPjdn8xEEZhALLTr2xsigDyxnV"
        ),
      });

      const blockhash = await connection.getLatestBlockhash();

      let transaction = new Transaction().add(ix);
      transaction.feePayer = publicKey;
      transaction.recentBlockhash = blockhash.blockhash;

      return transaction;
    })
  );

  const signedTxs = await signAllTransactions(transactions);

  notify(`Sharky loan repay all! ${publicKey}`);

  signedTxs.map(async (tx) => {
    let res = connection.sendRawTransaction(tx.serialize(), {
      commitment: "confirmed",
    });

    await toast.promise(res, {
      loading: "Repaying...",
      success: (data) => (
        <a target="_blank" href={`https://solscan.io/tx/${data}`}>
          https://solscan.io/tx/{data.substr(0, 5)}...
        </a>
      ),
      error: (err) => console.log(err.message),
    });
  });
};

const parseLoan = async ({ loan, sharkyClient }) => {
  let accountInfo = {
    data: new Buffer.from(loan.rawData.data),
    executable: false,
    lamports: 3243360,
    owner: new PublicKey("SHARKobtfF1bHhxD2eqftjHBdVSCbKo9JtgK71FhELP"),
    rentEpoch: 0,
  };

  return sharkyClient.parseLoan({
    program: sharkyClient.program,
    keyedAccountInfo: {
      accountId: new PublicKey(loan.pubkey),
      accountInfo: accountInfo,
    },
  });
};
