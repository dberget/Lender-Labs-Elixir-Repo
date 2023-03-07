import React from "react";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import BN from "bn.js";

// import sharky, { aprToInterestRatio, apyToApr } from "@sharkyfi/client";
import { createLoansService } from "@frakt-protocol/frakt-sdk/lib/loans/loansService";
import { Rain } from "@rainfi/sdk";
import { CitrusSdk } from "@famousfoxfederation/citrus-sdk";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

import { useBorrower } from "../providers/useBorrower";
import useSwr from "swr";

import { useModal } from "react-hooks-use-modal";

const initSharkyClient = (connection, wallet) => {
  // let provider = sharky.createProvider(connection, wallet);
  // const sharkyClient = sharky.createSharkyClient(provider);
  // return sharkyClient;
};

export function Borrow() {
  const wallet = useAnchorWallet();
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [fraktNfts, setFraktNfts] = React.useState(null);
  const [rainPools, setRainPools] = React.useState([]);

  const { data } = useBorrower();

  // const sharkyClient = React.useMemo(
  //   () => initSharkyClient(connection, wallet),
  //   [connection, wallet]
  // );

  const rain = React.useMemo(
    () => new Rain(connection, publicKey),
    [publicKey]
  );

  const citrusSdk = React.useMemo(
    () => new CitrusSdk(wallet, connection),
    [wallet]
  );

  const { fetchBulkSuggestion, proposeLoan, proposeLoans, fetchWalletNfts } =
    React.useMemo(() =>
      createLoansService({
        apiDomain: "api.frakt.xyz",
        programPublicKey: "A66HabVL3DzNzeJgcHYtRRNW1ZRMKwBfrdSR4kLsZ9DJ",
        adminPublicKey: "9aTtUqAnuSMndCpjcPosRNf3fCkrTQAV8C8GERf3tZi3",
      })
    );

  React.useEffect(() => {
    if (publicKey) {
      getMintsCollection();
    }
  }, [publicKey]);

  const getMintsCollection = async () => {
    const borrowNfts = await fetchWalletNfts({
      walletPublicKey: publicKey,
    });

    setFraktNfts(borrowNfts);

    const pools = await rain.utils.getAllPools(connection);

    setRainPools(pools);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full md:w-5/6 mx-auto justify-items-center pb-8">
      {fraktNfts &&
        data?.collections?.map((collection) => {
          let fraktMatches = fraktNfts.filter((offer) =>
            collection.nfts.find((nft) => nft.mint === offer.mint)
          );

          return (
            <CollectionCard
              key={collection.id}
              collection={collection}
              rain={rain}
              citrusSdk={citrusSdk}
              fraktNfts={fraktNfts}
              // sharkyClient={sharkyClient}
              rainPools={rainPools}
              fraktOffers={fraktMatches}
            />
          );
        })}
    </div>
  );
}

const CollectionCard = ({
  collection,
  rain,
  citrusSdk,
  // sharkyClient,
  rainPools,
  fraktOffers,
}) => {
  const { connection } = useConnection();
  const [rainFiCollection, setRainFiCollection] = React.useState(null);
  const [rainPoolsWithCollection, setRainPoolsWithCollection] =
    React.useState(null);
  const [foxyOffers, setFoxyOffers] = React.useState([]);
  const [selectdPlatform, setSelectedPlatform] = React.useState(null);

  const [Modal, open, close, isOpen] = useModal("app");

  const setOpen = (platform) => {
    setSelectedPlatform(platform);

    open();
  };

  const { data: sharkyOffers } = useSwr(
    collection?.sharky_address
      ? `http://localhost:4000/api/get_collection_offers?collection=${collection?.sharky_address}`
      : null,
    (...args) => fetch(...args, {}).then((res) => res.json())
  );

  const getCitrusLoans = async () => {
    let loans = await citrusSdk.fetchCollectionLoans(
      new PublicKey(collection.foxy_address)
    );

    let offers = loans
      .filter((l) => l.status == "waitingForBorrower")
      .sort((a, b) => b.terms.principal - a.terms.principal);

    setFoxyOffers(offers);
  };

  const getRainCollection = async (rain_fi_id) => {
    let rain_collection = await rain.utils.getCollection(
      connection,
      rain_fi_id
    );

    setRainFiCollection(rain_collection);

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
    if (collection?.rain_fi_id && rainPools.length > 0) {
      getRainCollection(collection?.rain_fi_id);
    }

    if (collection?.foxy_address) {
      getCitrusLoans();
    }
  }, [collection, rainPools]);

  const calculateRainInterest = (pool) => {
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

    return (interestLamports / LAMPORTS_PER_SOL).toFixed(2);
  };

  // const getSharkyInterest = (offer) => {
  //   const amount =
  //     aprToInterestRatio(apyToApr(collection.apy), collection.duration) *
  //     offer["amountSol"];

  //   // Amount plus fee
  //   return (amount + amount * 0.16).toFixed(2);
  // };

  return (
    <div className="bg-[#28292B] p-4 my-2 w-full rounded flex">
      <div className="">
        <img className="w-16" src={collection?.logo} />
      </div>

      <div className="w-full">
        <div className="text-center w-full text-lg font-bold mb-3">
          {collection?.name}
        </div>

        <div className="flex justify-around mx-auto w-full">
          {sharkyOffers?.length > 0 && (
            <OfferDetailsBox
              open={() => setOpen("SHARKY")}
              amount={sharkyOffers[0]["amountSol"]}
              duration={collection.duration / 60 / 60 / 24}
              // interest={getSharkyInterest(sharkyOffers[0])}
            >
              <img className="w-8" src={"/images/sharky.png"} />
            </OfferDetailsBox>
          )}

          {rainPoolsWithCollection?.length > 0 && (
            <OfferDetailsBox
              open={() => setOpen("RAIN")}
              amount={rainPoolsWithCollection[0].loanAmount.toFixed(2)}
              interest={calculateRainInterest(rainPoolsWithCollection[0])}
              duration={
                rainPoolsWithCollection[0].loanCurve.maxDuration / 60 / 60 / 24
              }
            >
              <img className={"w-auto h-8"} src={"/images/rainfi.png"} />
            </OfferDetailsBox>
          )}
          {fraktOffers.length > 0 && (
            <OfferDetailsBox
              open={() => setOpen("FRAKT")}
              duration={fraktOffers[0].timeBased?.returnPeriodDays}
              amount={fraktOffers[0].maxLoanValue.toFixed(2)}
              interest={fraktOffers[0]?.timeBased?.repayValue}
            >
              <img
                className="w-8 rounded-full"
                src={
                  "https://miro.medium.com/v2/resize:fill:176:176/1*r3yM_n2CUdZLqsWE9BulGw.jpeg"
                }
              />
            </OfferDetailsBox>
          )}
          {foxyOffers.length > 0 && (
            <OfferDetailsBox
              className="cursor-pointer"
              open={() => setOpen("CITRUS")}
              amount={foxyOffers[0].terms?.principal / LAMPORTS_PER_SOL}
              duration={foxyOffers[0].terms?.duration / 60 / 60 / 24}
              interest={(
                citrusSdk.calculateInterest({
                  duration: foxyOffers[0].terms?.duration / 3600 / 24,
                  apy: foxyOffers[0].terms?.apy / 100,
                  principal: foxyOffers[0].terms?.principal / LAMPORTS_PER_SOL,
                }) / LAMPORTS_PER_SOL
              ).toFixed(2)}
            >
              <img
                className="w-8"
                src={"https://famousfoxes.com/logo.b8610686.svg"}
              />
            </OfferDetailsBox>
          )}
        </div>
      </div>

      <ModalViewer
        frakt={fraktOffers}
        sharky={sharkyOffers}
        foxy={foxyOffers}
        rainPools={rainPoolsWithCollection}
        Modal={Modal}
        platform={selectdPlatform}
        open={open}
        collection={collection}
        close={close}
      />
    </div>
  );
};

const ModalViewer = ({
  foxy,
  rainPools,
  frakt,
  platform,
  close,
  collection,
  sharky,
  Modal,
}) => {
  const offerMap = {
    FRAKT: frakt,
    SHARKY: sharky,
    CITRUS: foxy,
    RAIN: rainPools,
  };

  const offers = offerMap[platform];

  return (
    <Modal>
      <div className="p-4" style={{ background: "#242424", width: 800 }}>
        <h4 className="text-bold">
          {platform} {collection?.name}
        </h4>

        <button onClick={() => close()}>Close</button>
      </div>
    </Modal>
  );
};

const OfferDetailsBox = ({ open, amount, duration, interest, children }) => {
  return (
    <div
      onClick={() => open()}
      className="p-2 bg-[#242424] rounded w-1/3 mx-2 cursor-pointer"
    >
      <div className="flex">
        <div className="mx-1">{children}</div>
        <div className="mx-auto">
          <div className="font-bold text-center">{amount} SOL</div>
          <div className="font-light">
            <span>
              {duration} Days | {interest}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
