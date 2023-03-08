import React from "react";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { useCitrus } from "../hooks/useCitrus";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { SolIcon } from "./SolIcon";

export const CitrusModal = ({
  offers,
  selectedNft,
  selectedOffer,
  setSelectedOffer,
  collection,
  close,
}) => {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();

  const { takeLoan, getInterest } = useCitrus(collection?.foxy_address);

  return (
    <div
      className="p-4 flex justify-evenly"
      style={{ background: "#242424", width: 800 }}
    >
      <div className="flex flex-col items-center w-1/3">
        <h4 className="text-bold">{collection?.name}</h4>

        <img className="w-32 my-2" src={selectedNft?.json?.image} />

        <div className="mt-auto">
          <button
            className="mx-1"
            onClick={() => takeLoan(selectedOffer, selectedNft.mint.address)}
          >
            Take
          </button>
          <button className="mx-1" onClick={() => close()}>
            Close
          </button>
        </div>
      </div>

      <div className="flex w-1/4">
        {selectedOffer && (
          <div>
            <div>
              You Get:{" "}
              <span className="font-bold">
                {selectedOffer?.terms.principal / LAMPORTS_PER_SOL}
              </span>
            </div>

            <div>
              You'll Owe:{" "}
              <span className="font-bold">
                {(
                  selectedOffer?.terms?.principal / LAMPORTS_PER_SOL +
                  getInterest(selectedOffer)
                ).toFixed(3)}
              </span>
            </div>
            <div>
              Due In:{" "}
              <span className="font-bold">
                {selectedOffer?.terms?.duration / 60 / 60 / 24 + " days"}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="overflow-scroll h-48 w-1/3 text-center">
        <h4 className="font-bold">Available Offers</h4>
        <OfferTable
          offers={offers}
          selectedOffer={selectedOffer}
          setSelectedOffer={setSelectedOffer}
        />
      </div>
    </div>
  );
};

const OfferTable = ({ offers, selectedOffer, setSelectedOffer }) => {
  const { getInterest } = useCitrus();

  return (
    <table className="table-auto border-spacing-2 w-full border-collapse">
      <thead>
        <tr className="text-center">
          <th>Amt</th>
          <th>Interest</th>
          <th>APY</th>
          <th>Days</th>
        </tr>
      </thead>
      <tbody>
        {offers.map((loan) => (
          <tr
            onClick={() => setSelectedOffer(loan)}
            style={{
              color:
                loan.loanAccount === selectedOffer?.loanAccount
                  ? "#58BC98"
                  : "white",
            }}
            key={loan.loanAccount}
            className="text-center h-6 cursor-pointer hover:text-[#58BC98]"
          >
            <td>
              <div className="flex justify-center">
                <span className="mr-1">
                  {loan?.terms?.principal / LAMPORTS_PER_SOL}
                </span>
                <SolIcon />
              </div>
            </td>
            <td>{getInterest(loan).toFixed(2)}</td>
            <td>{loan?.terms?.apy / 100}</td>
            <td>{loan?.terms?.duration / 3600 / 24}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
