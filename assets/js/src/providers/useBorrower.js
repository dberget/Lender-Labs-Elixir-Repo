import React from "react";
import {
  useWallet,
  useConnection,
  useAnchorWallet,
} from "@solana/wallet-adapter-react";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import useSwr from "swr";

const url = `https://rpc.helius.xyz/?api-key=d250e974-e6c5-4428-a9ca-25f8cd271444`;

export const useBorrower = () => {
  //   const router = useRouter();
  //   let pkOverride = router.query.pk;
  const { publicKey } = useWallet();

  const wallet = useAnchorWallet();
  const { connection } = useConnection();

  //   let pubKey = pkOverride ?? publicKey;

  const { data, isLoading } = useSwr(
    publicKey ? `/api/get_borrower_collections?borrower=${publicKey}` : null,
    (...args) => fetch(...args, {}).then((res) => res.json())
  );

  const { data: loans } = useSwr(
    publicKey ? `/api/get_borrower_loans?borrower=${publicKey}` : null,
    (...args) => fetch(...args, {}).then((res) => res.json())
  );

  return { data, isLoading, loans };
};
