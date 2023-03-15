import React from "react";
import { useCitrus } from "../hooks/useCitrus";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import Button from "./Button";

export const CitrusModal = ({
  offers,
  selectedNft,
  selectedOffer,
  setSelectedOffer,
  collection,
  close,
  selectedIndex,
  setSelectedNftIndex,
  nfts,
}) => {
  const { takeLoan, getInterest } = useCitrus(collection?.foxy_address);

  const handleUpdateIndex = () => {
    if (selectedIndex === nfts.length - 1) {
      setSelectedNftIndex(0);

      return;
    }

    setSelectedNftIndex(selectedIndex + 1);
  };

  const takeAllLoans = async () => {
    for (let index = 0; index < nfts.length; index++) {
      const offer = offers[index];

      const mint = nfts[index].mintAddress;

      await takeLoan(offer, mint);
    }
  };

  return (
    <div className="modal-size" style={{ background: "#242424" }}>
      <div className="md:hidden">
        {selectedOffer && (
          <div className="flex justify-around pt-2">
            <div>
              You Get:{" "}
              <span className="font-bold">
                {selectedOffer?.terms?.principal / LAMPORTS_PER_SOL}
              </span>
            </div>

            <div>
              You'll Owe:{" "}
              <span className="font-bold">
                {(
                  selectedOffer?.terms?.principal / LAMPORTS_PER_SOL +
                  getInterest(selectedOffer)
                ).toFixed(3)}{" "}
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

      <div className="p-4 flex justify-evenly">
        <div className="flex flex-col items-center w-1/2 md:w-1/3">
          <div className="text-center">
            <div>{selectedNft?.name ?? collection?.name}</div>
          </div>

          <img
            style={{ minHeight: 128 }}
            className="w-32 my-2"
            src={selectedNft?.json?.image}
          />
          {nfts.length > 1 && (
            <img
              onClick={() => handleUpdateIndex()}
              className="hero-arrow-right-solid cursor-pointer p-4"
            />
          )}

          <div className="mt-auto">
            <Button
              className="mx-1 p-3 md:px-4 md:py-3"
              onClick={() => takeLoan(selectedOffer, selectedNft.mint.address)}
            >
              Take
            </Button>
            {nfts.length > 1 && (
              <Button
                className="mr-1 p-3 md:px-4 md:py-3"
                onClick={() => takeAllLoans()}
              >
                Take All
              </Button>
            )}
          </div>
        </div>

        <div className="w-1/4 text-center hidden md:block">
          <h4 className="font-bold pb-2">Loan Overview</h4>
          <div className="">
            {selectedOffer && (
              <div>
                <div>
                  You Get:{" "}
                  <span className="font-bold">
                    {selectedOffer?.terms?.principal / LAMPORTS_PER_SOL}{" "}
                  </span>
                </div>

                <div>
                  You'll Owe:{" "}
                  <span className="font-bold">
                    {(
                      selectedOffer?.terms?.principal / LAMPORTS_PER_SOL +
                      getInterest(selectedOffer)
                    ).toFixed(3)}{" "}
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
        </div>

        <div className="overflow-scroll h-48  w-1/2 md:w-1/3 text-center">
          <h4 className="font-bold">Available Offers</h4>
          <OfferTable
            offers={offers}
            selectedOffer={selectedOffer}
            setSelectedOffer={setSelectedOffer}
          />
        </div>
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
