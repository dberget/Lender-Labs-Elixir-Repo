import React from "react";
import { useFrakt } from "../hooks/useFrakt";
import { SolIcon } from "./SolIcon";

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
  const { takeLoan, getBondMarket } = useFrakt();
  const [bondMarket, setBondMarket] = React.useState(null);

  React.useEffect(() => {
    getBondMarket().then((market) => setBondMarket(market));
  }, []);

  console.log(bondMarket);

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
      className="p-4 flex justify-evenly"
      style={{ background: "#242424", width: 800 }}
    >
      <div className="flex flex-col items-center w-1/3">
        <div className="text-center">
          <span className="font-bold"> {collection?.name}</span>{" "}
          <div>{selectedOffer?.name}</div>
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
          <button
            className="mx-1"
            onClick={() => takeLoan(offers[selectedIndex])}
          >
            Take
          </button>
          <button className="mx-1" onClick={() => close()}>
            Close
          </button>
        </div>
      </div>

      <div className="flex flex-col w-2/3">
        {selectedOffer?.priceBased !== undefined && (
          <div className="flex justify-center mx-auto">
            <button
              style={{ lineHeight: 0 }}
              className="mx-1 px-8 py-4"
              onClick={() => setLoanType("timeBased")}
            >
              Time
            </button>
            <button
              style={{ lineHeight: 0 }}
              className="mx-1 px-8 py-4"
              onClick={() => setLoanType("priceBased")}
            >
              Perpetual
            </button>
          </div>
        )}

        <div className="mt-4 w-1/2 mx-auto">
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
    <div className="flex">
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
    <div className="flex">
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
            FP Liquidation Threshold:{" "}
            <span className="font-bold text-red-700">
              {liquidationPrice.toFixed(2)} <SolIcon />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
