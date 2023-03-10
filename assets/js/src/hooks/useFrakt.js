import React from "react";

import {
  useWallet,
  useConnection,
  useAnchorWallet,
} from "@solana/wallet-adapter-react";
import { createLoansService } from "@frakt-protocol/frakt-sdk/lib/loans/loansService";
import { toast } from "react-hot-toast";
import { getBondsPreview, getBondMarket, getMarketPairs } from "../utils/frakt";

const API_DOMAIN = "api.frakt.xyz";
const PROGRAM_PUBLIC_KEY = "A66HabVL3DzNzeJgcHYtRRNW1ZRMKwBfrdSR4kLsZ9DJ";
const ADMIN_PUBLIC_KEY = "9aTtUqAnuSMndCpjcPosRNf3fCkrTQAV8C8GERf3tZi3";

export const FraktContext = React.createContext({});

export const FraktProvider = (props) => {
  const [nfts, setFraktNfts] = React.useState([]);
  const [loans, setLoans] = React.useState([]);
  const { publicKey } = useWallet();
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

  return (
    <FraktContext.Provider value={{ takeLoan, nfts, loans, getMarket }}>
      {props.children}
    </FraktContext.Provider>
  );
};

export const useFrakt = () => {
  const { takeLoan, nfts, loans, getMarket } = React.useContext(FraktContext);

  return { takeLoan, nfts, loans, getBondMarket: getMarket };
};
