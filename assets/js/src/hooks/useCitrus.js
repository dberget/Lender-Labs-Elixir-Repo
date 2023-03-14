import React from "react";

import { useConnection, useAnchorWallet } from "@solana/wallet-adapter-react";

import { CitrusSdk } from "@famousfoxfederation/citrus-sdk";
import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { notify } from "../utils/discord";
import { toast } from "react-hot-toast";

export const CitrusContext = React.createContext({});

export const CitrusProvider = (props) => {
  const [loans, setLoans] = React.useState([]);
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

  const getLoans = async () => {
    let loans = await citrusSdk.fetchUserLoans(wallet.publicKey, "borrower");

    const newLoans = [];
    for (let index = 0; index < loans.length; index++) {
      const loan = loans[index];

      loan.end = loan.startTime + loan?.terms?.duration;
      loan.platform = "Citrus";

      newLoans.push(loan);
    }

    setLoans(newLoans);
  };

  React.useEffect(() => {
    if (wallet?.publicKey) {
      getLoans();
    }
  }, [wallet]);

  const takeLoan = async (loan, mint) => {
    res = citrusSdk.borrowLoan(loan, mint);

    await toast.promise(res, {
      loading: "Taking Loan",
      success: (sig) => <a href={`https://solscan.io/tx/${sig}`}>solscan</a>,
    });

    notify(
      `Citrus Loan taken! ${loan.terms.principal / LAMPORTS_PER_SOL} SOL}`
    );
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
        loans,
      }}
    >
      {props.children}
    </CitrusContext.Provider>
  );
};

export const useCitrus = (foxy_address) => {
  const [offers, setOffers] = React.useState([]);

  const { citrusSdk, takeLoan, getOffers, getInterest, loans } =
    React.useContext(CitrusContext);

  const repayLoan = async (loan) => {
    let sig = citrusSdk.repayLoan(loan);

    toast.promise(sig, { loading: "Repaying Loan", success: "Repayed Loan!" });
  };

  React.useEffect(() => {
    if (!foxy_address) return;

    getOffers(foxy_address).then((offers) => {
      setOffers(offers);
    });
  }, [foxy_address]);

  return { citrusSdk, takeLoan, offers, getInterest, loans, repayLoan };
};
