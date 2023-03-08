import React from "react";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { initSharkyClient, takeLoan, getSharkyInterest } from "../utils/sharky";

export const SharkyModal = ({
  offers,
  selectedNft,
  selectedOffer,
  setSelectedOffer,
  collection,
  sharkyIndexes,
}) => {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();

  const sharkyClient = initSharkyClient(connection, wallet);

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

      <div className="overflow-scroll h-48 w-1/4 text-center">
        <h4 className="font-bold">Available Offers</h4>
        {offers?.map((offer) => (
          <div
            style={{
              color:
                offer.pubkey === selectedOffer?.pubkey ? "#58BC98" : "white",
            }}
            className={`my-1 cursor-pointer hover:text-[#58BC98]`}
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
