import sharky, { aprToInterestRatio, apyToApr } from "@sharkyfi/client";
import toast from "react-hot-toast";
import { PublicKey } from "@solana/web3.js";

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
};

export const getSharkyInterest = (apy, duration, amountSol) => {
  const amount = aprToInterestRatio(apyToApr(apy), duration) * amountSol;

  // Amount plus fee
  return amount + amount * 0.16;
};
