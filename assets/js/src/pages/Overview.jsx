import React from "react";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { splitTimeShort } from "../utils/time";
import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import useSwr from "swr";

import sharky from "@sharkyfi/client";
import { useBorrower } from "../providers/useBorrower";

import { useFrakt } from "../hooks/useFrakt";
import { useCitrus } from "../hooks/useCitrus";
import { useRain } from "../hooks/useRain";
import { SolIcon } from "../components/SolIcon";

export function Overview() {
  const { pubKey } = useBorrower();

  const { data, isLoading, isValidating } = useSwr(
    pubKey ? `/api/get_borrower_history?borrower=${pubKey}` : null,
    (...args) => fetch(...args, {}).then((res) => res.json())
  );

  const { connection } = useConnection();
  const { signAllTransactions } = useWallet();

  const [filter, setFilter] = React.useState(null);
  const [selectedForRepay, setSelectedForRepay] = React.useState([]);

  const { loans: fraktLoans, repayLoan: repayFraktLoan } = useFrakt();
  const { citrus, loans: citrusLoans, repayLoan } = useCitrus();
  const { rainLoans, repayAll: repayAllRain } = useRain();

  console.log(data);

  return <>Overview</>;
}
