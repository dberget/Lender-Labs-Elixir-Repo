import sharky, { aprToInterestRatio, apyToApr } from "@sharkyfi/client";
import toast from "react-hot-toast";
import { PublicKey } from "@solana/web3.js";
import { notify } from "./discord";

export const initSharkyClient = (connection, wallet) => {
  let provider = sharky.createProvider(connection, wallet);
  const sharkyClient = sharky.createSharkyClient(provider);
  return sharkyClient;
};

export const takeLoan = async (offer, mint, sharkyClient, nftIndex) => {
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

  let nftListIndex = nftIndex;

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
  });

  notify(`Sharky loan taken! ${offer.amountSol} - ${mint.address}`);
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
    success: ({ sig }) => <a href={`https://solscan.io/tx/${sig}`}>Solscan</a>,
  });

  notify(`Sharky loan repaid! ${loan.amountSol}`);
};

export const getSharkyInterest = (apy, duration, amountSol) => {
  const amount = aprToInterestRatio(apyToApr(apy), duration) * amountSol;

  // Amount plus fee
  return amount + amount * 0.16;
};
