import React from "react";
import { useFrakt } from "../hooks/useFrakt";
import { SolIcon } from "./SolIcon";

import {
  getMaxBorrowValueOptimized,
  getBondLoansCombinations,
} from "fbonds-core/lib/fbond-protocol/utils/cartManager";

import Button from "./Button";

export const FraktModal = ({
  offers,
  selectedOffer,
  setSelectedOffer,
  setSelectedNftIndex,
  selectedIndex,
  close,
  collection,
}) => {
  // timeBased | priceBased | Bond
  const [loanType, setLoanType] = React.useState("timeBased");
  const { takeLoan, getBondMarket, getMarketPairs, buildBondLoan } = useFrakt();
  const [bondMarket, setBondMarket] = React.useState(null);
  const [bondPairs, setBondPairs] = React.useState(null);
  const [maxBondBorrow, setMaxBondBorrow] = React.useState(null);
  const [bestPair, setBestPair] = React.useState(null);

  // React.useEffect(() => {
  //   getBondMarket().then((market) => setBondMarket(market));
  //   getMarketPairs().then((market) => setBondPairs(market));
  // }, []);

  // React.useEffect(() => {
  //   if (bondMarket && bondPairs) {
  //     let maxBorrow = getMaxBorrowValueOptimized({
  //       pairs: bondPairs,
  //       collectionFloor: bondMarket.oracleFloor.floor,
  //     });

  //     const pairCombos = getBondLoansCombinations({
  //       nfts: [selectedOffer.mint],
  //       collectionFloor: bondMarket.oracleFloor.floor,
  //       pairs: bondPairs,
  //       durationFilter: 604800,
  //     });

  //     const pair = bondPairs.find(
  //       (pair) => pair.publicKey === pairCombos[0].orders[0].pairPubkey
  //     );

  //     setBestPair(pair);
  //     setMaxBondBorrow(maxBorrow);
  //   }
  // }, [bondPairs, bondMarket]);

  const handleUpdateIndex = () => {
    if (selectedIndex === offers.length - 1) {
      setSelectedNftIndex(0);

      setSelectedOffer(offers[0]);

      return;
    }

    setSelectedOffer(offers[selectedIndex + 1]);
    setSelectedNftIndex(selectedIndex + 1);
  };

  return (
    <div
      className="modal-size p-1 md:p-4 flex justify-evenly"
      style={{ background: "#242424" }}
    >
      <div className="flex flex-col items-center w-1/2 md:w-1/3">
        <div className="text-center">
          <span>{selectedOffer?.name ?? collection?.name}</span>
        </div>

        <img
          style={{ minHeight: 128 }}
          className="w-32 my-2"
          src={selectedOffer?.imageUrl}
        />

        {offers.length > 1 && (
          <img
            onClick={() => handleUpdateIndex()}
            className="hero-arrow-right-solid cursor-pointer p-4"
          />
        )}

        <div className="mt-auto">
          <Button
            className="mr-1 p-3 md:px-4 md:py-3"
            onClick={() =>
              // buildBondLoan({
              //   mint: offers[selectedIndex].mint,
              //   pair: bondPairs[1],
              //   market: bondMarket,
              // })

              takeLoan(offers[selectedIndex])
            }
          >
            Take
          </Button>
        </div>
      </div>

      <div className="flex flex-col w-1/2 md:w-2/3">
        {selectedOffer?.priceBased !== undefined && (
          <div className="flex justify-center mx-auto">
            <Button
              style={{ lineHeight: 0 }}
              className="mr-1 px-4"
              onClick={() => setLoanType("timeBased")}
            >
              Time
            </Button>
            <Button
              style={{ lineHeight: 0 }}
              className="md:mx-1 px-4"
              onClick={() => setLoanType("priceBased")}
            >
              Perpetual
            </Button>
          </div>
        )}

        <div className="mt-4 flex w-full mx-auto">
          {loanType === "timeBased" ? (
            <TimeBased selectedOffer={selectedOffer} />
          ) : (
            <PriceBased selectedOffer={selectedOffer} />
          )}
        </div>
      </div>
    </div>
  );
};

const TimeBased = ({ selectedOffer }) => {
  return (
    <div className="flex mx-auto">
      {selectedOffer && (
        <div>
          <div>
            You Get:{" "}
            <span className="font-bold">
              {selectedOffer?.timeBased?.loanValue.toFixed(2)} <SolIcon />
            </span>
          </div>

          <div>
            You'll Owe:{" "}
            <span className="font-bold">
              {selectedOffer?.timeBased?.repayValue} <SolIcon />
            </span>
          </div>
          <div>
            Due In:{" "}
            <span className="font-bold">
              {selectedOffer?.timeBased?.returnPeriodDays} Days
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

const PriceBased = ({ selectedOffer }) => {
  const { valuation, priceBased, ltvPercents } = selectedOffer;

  const loanValue = parseFloat(valuation) * (priceBased?.ltvPercents / 100);

  const feeOnDay = (loanValue * (priceBased.borrowAPRPercents * 0.01)) / 365;
  const upfrontFee = loanValue * 0.01;

  const collaterizationRateValue =
    selectedOffer?.priceBased?.collaterizationRate / 100;

  const liquidationPrice =
    selectedOffer?.maxLoanValue +
    selectedOffer?.maxLoanValue * collaterizationRateValue;

  return (
    <div className="flex mx-auto">
      {selectedOffer && (
        <div>
          <div>
            You Get:{" "}
            <span className="font-bold">
              {selectedOffer?.maxLoanValue.toFixed(2)} <SolIcon />
            </span>
          </div>

          <div>
            Upfront Fee:{" "}
            <span className="font-bold">
              {upfrontFee.toFixed(2)} <SolIcon />
            </span>
          </div>
          <div>
            Weekly Fee:{" "}
            <span className="font-bold">
              {(feeOnDay * 7).toFixed(4)} <SolIcon />
            </span>
          </div>

          <div className="mt-2">
            Current FP:{" "}
            <span>
              {selectedOffer.valuation.toFixed(2)} <SolIcon />
            </span>
          </div>
          <div>
            FP Liq. Threshold:{" "}
            <span className="font-bold text-red-700">
              {liquidationPrice.toFixed(2)} <SolIcon />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
