import React from "react";
import { useRain } from "../hooks/useRain";

export const RainModal = ({
  offers: rainPoolsWithCollection,
  selectedNft,
  selectedOffer,
  setSelectedOffer,
  collection,
  close,
  selectedIndex,
  setSelectedNftIndex,
  nfts,
}) => {
  const { rain, getInterest, takeLoan } = useRain();

  const handleUpdateIndex = () => {
    if (selectedIndex === nfts.length - 1) {
      setSelectedNftIndex(0);

      return;
    }

    setSelectedNftIndex(selectedIndex + 1);
  };

  return (
    <div className="modal-size" style={{ background: "#242424" }}>
      <div className="md:hidden">
        {selectedOffer && (
          <div className="flex justify-around pt-2">
            <div>
              You Get:{" "}
              <span className="font-bold">
                {selectedOffer?.loanAmount?.toFixed(2)}
              </span>
            </div>

            <div>
              You'll Owe:{" "}
              <span className="font-bold">
                {selectedOffer &&
                  (
                    selectedOffer?.loanAmount + getInterest(selectedOffer)
                  ).toFixed(2)}{" "}
              </span>
            </div>
            <div>
              Due In:{" "}
              <span className="font-bold">
                {selectedOffer.loanCurve?.maxDuration / 60 / 60 / 24 + " days"}
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
              className="mx-1"
              onClick={() =>
                takeLoan(
                  selectedNft.mint.address,
                  selectedOffer,
                  collection?.rain_fi_id
                )
              }
            >
              Take
            </Button>
          </div>
        </div>

        <div className="w-1/2 md:w-1/4 text-center hidden md:block">
          <h4 className="font-bold pb-2">Loan Overview</h4>
          <div className="">
            {selectedOffer && (
              <div>
                <div>
                  You Get:{" "}
                  <span className="font-bold">
                    {selectedOffer?.loanAmount?.toFixed(2)}
                  </span>
                </div>

                <div>
                  You'll Owe:{" "}
                  <span className="font-bold">
                    {(
                      selectedOffer?.loanAmount + getInterest(selectedOffer)
                    ).toFixed(2)}{" "}
                  </span>
                </div>
                <div>
                  Due In:{" "}
                  <span className="font-bold">
                    {selectedOffer.loanCurve?.maxDuration / 60 / 60 / 24 +
                      " days"}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-scroll h-48 w-1/2 md:w-1/3 text-center">
          <h4 className="font-bold">Available Offers</h4>
          <OfferTable
            offers={rainPoolsWithCollection}
            selectedOffer={selectedOffer}
            setSelectedOffer={setSelectedOffer}
          />
        </div>
      </div>
    </div>
  );
};

const OfferTable = ({ offers, selectedOffer, setSelectedOffer }) => {
  const { getInterest } = useRain();

  return (
    <table className="table-auto border-spacing-2 w-full border-collapse">
      <thead>
        <tr className="text-center">
          <th>Amt</th>
          <th>Interest</th>
          <th>Days</th>
        </tr>
      </thead>
      <tbody>
        {offers.map((loan) => (
          <tr
            onClick={() => setSelectedOffer(loan)}
            style={{
              color:
                loan.poolAddress === selectedOffer?.poolAddress
                  ? "#58BC98"
                  : "white",
            }}
            key={loan.poolAddress}
            className="text-center h-6 cursor-pointer hover:text-[#58BC98]"
          >
            <td>
              <div className="flex justify-center">
                <span className="mr-1">{loan?.loanAmount?.toFixed(2)}</span>
              </div>
            </td>
            <td>{getInterest(loan).toFixed(2)}</td>
            <td>{loan?.loanCurve?.maxDuration / 60 / 60 / 24}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
