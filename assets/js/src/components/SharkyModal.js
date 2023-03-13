import React from "react";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import {
  initSharkyClient,
  takeLoan,
  getSharkyInterest,
  takeAllLoans,
} from "../utils/sharky";
import { PublicKey } from "@solana/web3.js";

export const SharkyModal = ({
  offers,
  selectedNft,
  selectedOffer,
  setSelectedOffer,
  collection,
  sharkyIndexes,
  close,
  selectedIndex,
  setSelectedNftIndex,
  nfts,
}) => {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();

  const sharkyClient = initSharkyClient(connection, wallet);

  const handleUpdateIndex = () => {
    if (selectedIndex === nfts.length - 1) {
      setSelectedNftIndex(0);

      return;
    }

    setSelectedNftIndex(selectedIndex + 1);
  };

  return (
    <div
      className="p-4 flex justify-evenly"
      style={{ background: "#242424", width: 600 }}
    >
      <div className="flex flex-col items-center w-1/3">
        <div className="text-center">
          <span className="font-bold"> {collection?.name}</span>{" "}
          <div>{selectedNft?.name}</div>
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
          <button
            className="mx-1"
            onClick={() =>
              takeLoan(
                selectedOffer,
                selectedNft.mint,
                sharkyClient,
                sharkyIndexes[selectedNft?.mint?.address.toString()]
              )
            }
          >
            Take
          </button>
          {nfts.length > 1 && (
            <button
              className="mx-1"
              onClick={() =>
                takeAllLoans(
                  offers,
                  nfts.map((nft) => ({
                    address: new PublicKey(nft?.mintAddress?.toString()),
                  })),
                  sharkyClient,
                  sharkyIndexes
                )
              }
            >
              Take All
            </button>
          )}
        </div>
      </div>

      <div className="w-1/4 text-center">
        <h4 className="font-bold pb-2">Loan Overview</h4>
        <div className="">
          {selectedOffer && (
            <div>
              <div>
                You Get:{" "}
                <span className="font-bold">{selectedOffer.amountSol}</span>
              </div>

              <div>
                You'll Owe:{" "}
                <span className="font-bold">
                  {(
                    selectedOffer.amountSol +
                    getSharkyInterest(
                      collection?.apy,
                      collection?.duration,
                      selectedOffer.amountSol
                    )
                  ).toFixed(3)}
                </span>
              </div>
              <div>
                Due In:{" "}
                <span className="font-bold">
                  {collection.duration / 60 / 60 / 24 + " days"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-scroll h-48 w-1/4 text-center">
        <h4 className="font-bold pb-2">Available Offers</h4>
        {offers?.map((offer) => (
          <div
            style={{
              color:
                offer.pubkey === selectedOffer?.pubkey ? "#58BC98" : "white",
            }}
            className={`mb-1 cursor-pointer hover:text-[#58BC98]`}
            onClick={() => setSelectedOffer(offer)}
            key={offer.pubkey}
          >
            {offer.amountSol}
          </div>
        ))}
      </div>
    </div>
  );
};
