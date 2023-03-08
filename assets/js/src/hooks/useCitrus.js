import React from "react";

import {
  useWallet,
  useConnection,
  useAnchorWallet,
} from "@solana/wallet-adapter-react";

import { CitrusSdk } from "@famousfoxfederation/citrus-sdk";
import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

export const CitrusContext = React.createContext({});

export const CitrusProvider = (props) => {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  const citrusSdk = React.useMemo(
    () => new CitrusSdk(wallet, connection),
    [wallet]
  );

  const getOffers = async (foxy_address) => {
    let loans = await citrusSdk.fetchCollectionLoans(
      new PublicKey(foxy_address)
    );

    let offers = loans
      .filter((l) => l.status == "waitingForBorrower")
      .sort((a, b) => b.terms.principal - a.terms.principal);

    return offers;
  };

  const takeLoan = async (loan, mint) => {
    res = citrusSdk.borrowLoan(loan, mint);

    toast.promise(res, {
      loading: "Taking Loan",
      success: (sig) => <a href={`https://solscan.io/tx/${sig}`}>solscan</a>,
    });
  };

  const getInterest = (offer) => {
    return (
      citrusSdk.calculateInterest({
        duration: offer.terms?.duration / 3600 / 24,
        apy: offer.terms?.apy / 100,
        principal: offer.terms?.principal / LAMPORTS_PER_SOL,
      }) / LAMPORTS_PER_SOL
    );
  };

  return (
    <CitrusContext.Provider
      value={{
        citrusSdk,
        takeLoan: takeLoan,
        getOffers: getOffers,
        getInterest: getInterest,
      }}
    >
      {props.children}
    </CitrusContext.Provider>
  );
};

export const useCitrus = (foxy_address) => {
  const [offers, setOffers] = React.useState([]);

  const { citrusSdk, takeLoan, getOffers, getInterest } =
    React.useContext(CitrusContext);

  React.useEffect(() => {
    if (!foxy_address) return;

    getOffers(foxy_address).then((offers) => {
      setOffers(offers);
    });
  }, [foxy_address]);

  return { citrusSdk, takeLoan, offers, getInterest };
};
