import React from "react";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import BN from "bn.js";

import sharky from "@sharkyfi/client";
import { getSharkyInterest } from "../utils/sharky";
import { Rain } from "@rainfi/sdk";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";

import { useBorrower } from "../providers/useBorrower";
import { useFrakt } from "../hooks/useFrakt";
import { useCitrus } from "../hooks/useCitrus";

import { CitrusModal } from "../components/CitrusModal";
import { SharkyModal } from "../components/SharkyModal";

import useSwr from "swr";

import { useModal } from "react-hooks-use-modal";

const initSharkyClient = (connection, wallet) => {
  let provider = sharky.createProvider(connection, wallet);
  const sharkyClient = sharky.createSharkyClient(provider);
  return sharkyClient;
};

export function Borrow() {
  const wallet = useAnchorWallet();
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [rainPools, setRainPools] = React.useState([]);
  const metaplex = new Metaplex(connection);

  const { nfts: fraktNfts } = useFrakt();

  const { data } = useBorrower();

  const sharkyClient = React.useMemo(
    () => initSharkyClient(connection, wallet),
    [connection, wallet]
  );

  const rain = React.useMemo(
    () => new Rain(connection, publicKey),
    [publicKey]
  );

  React.useEffect(() => {
    if (publicKey) {
      getMintsCollection();
    }
  }, [publicKey]);

  const getMintsCollection = async () => {
    const pools = await rain.utils.getAllPools(connection);

    setRainPools(pools);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full px-2 xl:px-0 xl:w-5/6 mx-auto justify-items-center">
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
              sharkyIndexes={data?.indexes}
              fraktNfts={fraktNfts}
              sharkyClient={sharkyClient}
              rainPools={rainPools}
              fraktOffers={fraktMatches}
              metaplex={metaplex}
            />
          );
        })}
    </div>
  );
}

const CollectionCard = ({
  collection,
  rain,
  metaplex,
  rainPools,
  fraktOffers,
  sharkyIndexes,
}) => {
  const { connection } = useConnection();

  const { offers: citrusOffers, getInterest } = useCitrus(
    collection?.foxy_address
  );

  const [rainFiCollection, setRainFiCollection] = React.useState(null);

  const [rainPoolsWithCollection, setRainPoolsWithCollection] =
    React.useState(null);

  const [selectdPlatform, setSelectedPlatform] = React.useState("");

  const [Modal, open, close, isOpen] = useModal("app");

  const setOpen = (platform) => {
    setSelectedPlatform(platform);

    open();
  };

  const { data: sharkyOffers } = useSwr(
    collection?.sharky_address
      ? `/api/get_collection_offers?collection=${collection?.sharky_address}`
      : null,
    (...args) => fetch(...args, {}).then((res) => res.json())
  );

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
              interest={getSharkyInterest(
                collection?.apy,
                collection?.duration,
                sharkyOffers[0]["amountSol"]
              ).toFixed(2)}
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
          {citrusOffers.length > 0 && (
            <OfferDetailsBox
              className="cursor-pointer"
              open={() => setOpen("CITRUS")}
              amount={citrusOffers[0].terms?.principal / LAMPORTS_PER_SOL}
              duration={citrusOffers[0].terms?.duration / 60 / 60 / 24}
              interest={getInterest(citrusOffers[0]).toFixed(2)}
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
        foxy={citrusOffers}
        sharkyIndexes={sharkyIndexes}
        rainPools={rainPoolsWithCollection}
        Modal={Modal}
        platform={selectdPlatform}
        open={open}
        isOpen={isOpen}
        collection={collection}
        close={close}
        metaplex={metaplex}
      />
    </div>
  );
};

const ModalViewer = ({
  foxy,
  rainPools,
  frakt,
  platform,
  open,
  close,
  isOpen,
  collection,
  sharky,
  Modal,
  metaplex,
  sharkyIndexes,
}) => {
  const offerMap = {
    FRAKT: frakt,
    SHARKY: sharky,
    CITRUS: foxy,
    RAIN: rainPools,
  };

  const ModalViewMap = {
    // FRAKT: <FraktModal />,
    SHARKY: (props) => <SharkyModal sharkyIndexes={sharkyIndexes} {...props} />,
    CITRUS: (props) => <CitrusModal {...props} />,
    // RAIN: <RainModal />,
    "": () => null,
  };
  const offers = offerMap[platform] || [];
  const ModalView = ModalViewMap[platform] || null;

  const [selectedOffer, setSelectedOffer] = React.useState(null);

  const [nfts, setNfts] = React.useState([]);
  const [selectedIndex, setSelectedNftIndex] = React.useState(0);
  const [selectedNft, setSelectedNft] = React.useState(null);

  React.useEffect(() => {
    if (!isOpen) return;

    metaplex
      .nfts()
      .findAllByMintList({
        mints: collection.nfts.map((nft) => new PublicKey(nft.mint)),
      })
      .then((nfts) => {
        setNfts(nfts);
        setSelectedOffer(offers[0]);
      });
  }, [collection, isOpen]);

  const getNft = async (index) => {
    const nft = await metaplex.nfts().load({ metadata: nfts[index] });

    setSelectedNft(nft);
  };

  React.useEffect(() => {
    if (!nfts.length) return;

    if (isOpen) {
      getNft(selectedIndex);
    }
  }, [selectedIndex, isOpen, nfts]);

  return (
    <Modal>
      <ModalView
        selectedNft={selectedNft}
        close={close}
        setSelectedNft={setSelectedNft}
        setSelectedNftIndex={setSelectedNftIndex}
        offers={offers}
        selectedOffer={selectedOffer}
        setSelectedOffer={setSelectedOffer}
        collection={collection}
      />
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
