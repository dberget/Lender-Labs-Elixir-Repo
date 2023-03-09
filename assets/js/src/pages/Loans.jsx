import React from "react";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";

import sharky from "@sharkyfi/client";
import { getSharkyInterest } from "../utils/sharky";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";

import { useBorrower } from "../providers/useBorrower";
import { useFrakt } from "../hooks/useFrakt";
import { useCitrus } from "../hooks/useCitrus";

import useSwr from "swr";

import { useModal } from "react-hooks-use-modal";
import { useRain } from "../hooks/useRain";

const initSharkyClient = (connection, wallet) => {
  let provider = sharky.createProvider(connection, wallet);
  const sharkyClient = sharky.createSharkyClient(provider);
  return sharkyClient;
};

export function Loans() {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const metaplex = new Metaplex(connection);

  const { loans: fraktLoans } = useFrakt();
  const { citrus, loans: citrusLoans } = useCitrus();
  const { rainLoans } = useRain();

  const { loans: sharkyLoans } = useBorrower();

  if (!sharkyLoans) return null;

  const allLoans = [
    ...rainLoans,
    ...citrusLoans,
    ...fraktLoans,
    ...sharkyLoans,
  ].sort((a, b) => a.end - b.end);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 w-full px-2 xl:px-0 xl:w-5/6 mx-auto justify-items-center">
      {allLoans.length > 0 &&
        allLoans.map((loan) => (
          <div>{new Date(loan.end * 1000).toLocaleDateString()}</div>
        ))}
    </div>
  );
}
