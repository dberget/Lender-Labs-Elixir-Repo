import React from "react";
import {
  useWallet,
  useConnection,
  useAnchorWallet,
} from "@solana/wallet-adapter-react";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import useSwr from "swr";

const url = `https://rpc.helius.xyz/?api-key=8fea9de0-b3d0-4bf4-a1fb-0945dfd91d42`;

export const useBorrower = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const pkOverride = urlParams.get("pk");

  const { publicKey } = useWallet();

  let pubKey = pkOverride ?? publicKey;

  const { data } = useSwr(
    pubKey ? `/api/get_borrower_collections?borrower=${pubKey}` : null,
    (...args) => fetch(...args, {}).then((res) => res.json())
  );

  const {
    data: loanData,
    isLoading,
    isValidating,
  } = useSwr(
    pubKey ? `/api/get_borrower_loans?borrower=${pubKey}` : null,
    (...args) => fetch(...args, {}).then((res) => res.json())
  );

  return { data, isLoading, loanData, pubKey };
};
