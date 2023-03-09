import React from "react";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import BN from "bn.js";

import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Rain } from "@rainfi/sdk";

export const RainContext = React.createContext({});

export const RainProvider = (props) => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [rainPools, setRainPools] = React.useState([]);
  const [rainLoans, setRainLoans] = React.useState([]);

  const rain = React.useMemo(
    () => new Rain(connection, publicKey),
    [publicKey]
  );

  const getPools = async () => {
    const pools = await rain.utils.getAllPools(connection);

    setRainPools(pools);
  };

  const getLoans = async () => {
    const loans = await rain.utils.getLoansFromBorrower(connection, publicKey);

    const newLoans = [];
    for (let index = 0; index < loans.length; index++) {
      const loan = loans[index];

      if (loan.status == "ongoing") {
        loan.end = loan.expiredAt;

        newLoans.push(loan);
      }
    }

    setRainLoans(newLoans);
  };

  React.useEffect(() => {
    if (publicKey) {
      getPools();
      getLoans();
    }
  }, [publicKey]);

  const getInterest = (pool) => {
    const { interestLamports, interestPercentage, rainFees } =
      rain.utils.computeInterest(
        new BN(pool.loanAmount * LAMPORTS_PER_SOL),
        pool.loanCurve.maxDuration / 60 / 60 / 24,
        pool.loanCurve.interestRate,
        new BN(pool.totalAmount),
        new BN(pool.borrowedAmount),
        pool.loanCurve?.baseInterest,
        pool.loanCurve?.maxDuration / 60 / 60 / 24,
        pool.loanCurve?.curveRate,
        pool.loanCurve?.curveRateDay
      );

    return interestLamports / LAMPORTS_PER_SOL;
  };

  return (
    <RainContext.Provider
      value={{
        rain,
        rainPools,
        getInterest,
        getLoans,
        rainLoans,
      }}
    >
      {props.children}
    </RainContext.Provider>
  );
};

export const useRain = (collectionId) => {
  const { connection } = useConnection();
  const [rainPoolsWithCollection, setRainPoolsWithCollection] =
    React.useState(null);

  const { rain, rainPools, getInterest, rainLoans } =
    React.useContext(RainContext);

  const getRainPoolsWithCollection = async (rain_fi_id) => {
    let rain_collection = await rain.utils.getCollection(
      connection,
      rain_fi_id
    );

    let rainPoolsWithCollection = rainPools
      .map((pool) => {
        let collection = pool.collections.find(
          (collection) => collection.collection == rain_fi_id
        );

        if (!collection) return null;

        return {
          ...pool,
          loanToValue: collection?.collectionLtv,
          floorPrice: rain_collection?.floorPrice,
          loanAmount:
            ((collection?.collectionLtv / 10000) *
              rain_collection?.floorPrice) /
            LAMPORTS_PER_SOL,
        };
      })
      .filter(Boolean)
      .sort((a, b) => b.loanToValue - a.loanToValue);

    setRainPoolsWithCollection(rainPoolsWithCollection);
  };

  React.useEffect(() => {
    if (collectionId) {
      getRainPoolsWithCollection(collectionId);
    }
  }, [collectionId]);

  return { rainPoolsWithCollection, rain, getInterest, rainLoans };
};
