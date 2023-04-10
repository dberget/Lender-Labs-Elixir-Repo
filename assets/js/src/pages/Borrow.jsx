import React from "react";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";

import { getSharkyInterest } from "../utils/sharky";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";

import { useBorrower } from "../providers/useBorrower";
import { useFrakt } from "../hooks/useFrakt";
import { useCitrus } from "../hooks/useCitrus";

import { CitrusModal } from "../components/CitrusModal";
import { SharkyModal } from "../components/SharkyModal";
import { FraktModal } from "../components/FraktModal";
import { RainModal } from "../components/RainModal";

import useSwr from "swr";

import { useModal } from "react-hooks-use-modal";
import { useRain } from "../hooks/useRain";
import { SolIcon } from "../components/SolIcon";

export function Borrow() {
  const { connection } = useConnection();
  const metaplex = new Metaplex(connection);

  const { nfts: fraktNfts } = useFrakt();

  const { data } = useBorrower();

  if (data?.collections?.length === 0) {
    return (
      <div className="w-full text-center h-[60vh]">
        No currently loanable NFT's Found! If they are staked or already loaned
        they won't show up here.
        <div>
          Let us know in{" "}
          <a
            target={"_blank"}
            className="underline"
            href="https://discord.gg/2kwFGMNndR"
          >
            discord
          </a>{" "}
          if a collection is missing.
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-5 w-full px-2 xl:px-0 xl:w-5/6 mx-auto justify-items-center mb-48">
      {fraktNfts && (
        <DisplayCollections
          collections={data?.collections}
          indexes={data?.indexes}
          metaplex={metaplex}
          fraktNfts={fraktNfts}
        />
      )}
    </div>
  );
}

const DisplayCollections = ({ collections, metaplex, fraktNfts, indexes }) => {
  return collections?.map((collection) => {
    let fraktMatches = fraktNfts.filter((offer) =>
      collection.nfts.find((nft) => nft.mint === offer.mint)
    );

    return (
      <CollectionCard
        key={collection.id}
        collection={collection}
        sharkyIndexes={indexes}
        fraktNfts={fraktNfts}
        fraktOffers={fraktMatches}
        metaplex={metaplex}
      />
    );
  });
};

const CollectionCard = ({
  collection,
  metaplex,
  fraktOffers,
  sharkyIndexes,
}) => {
  const { connection } = useConnection();

  const { offers: citrusOffers, getInterest } = useCitrus(
    collection?.foxy_address
  );

  const { rainPoolsWithCollection, getInterest: getRainInterest } = useRain(
    collection?.rain_fi_id
  );

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

  return (
    <div className="bg-[#28292B] p-4 my-2 w-full rounded">
      <div className="w-full flex">
        <div className="w-1/4">
          <div className="flex flex-col justify-center w-full text-lg font-bold mb-3 w-full">
            <div>
              {collection?.name}{" "}
              <div className="flex font-light text-base">
                {collection?.fp.toFixed(2)} <SolIcon />
              </div>
            </div>
            {/* {collection?.logo && (
              <img className="w-16" src={collection?.logo} />
            )} */}
          </div>
        </div>

        <div className="flex flex-col items-start md:flex-row justify-center mx-auto w-full flex-wrap gap-5">
          {sharkyOffers?.length > 0 && (
            <OfferDetailsBox
              open={() => setOpen("SHARKY")}
              amount={sharkyOffers[0]["amountSol"].toFixed(2)}
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
              interest={getRainInterest(rainPoolsWithCollection[0]).toFixed(2)}
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
              interest={(
                fraktOffers[0]?.timeBased?.repayValue -
                fraktOffers[0].maxLoanValue
              ).toFixed(2)}
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
              <img className="w-8" src={"/images/citrus-logo.png"} />
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
    FRAKT: (props) => <FraktModal {...props} />,
    SHARKY: (props) => <SharkyModal sharkyIndexes={sharkyIndexes} {...props} />,
    CITRUS: (props) => <CitrusModal {...props} />,
    RAIN: (props) => <RainModal {...props} />,
    "": () => null,
  };
  const offers = offerMap[platform] || [];
  const ModalView = ModalViewMap[platform] || null;

  const [selectedOffer, setSelectedOffer] = React.useState(null);

  const [nfts, setNfts] = React.useState([]);
  const [selectedIndex, setSelectedNftIndex] = React.useState(0);
  const [selectedNft, setSelectedNft] = React.useState(null);

  React.useEffect(() => {
    metaplex
      .nfts()
      .findAllByMintList({
        mints: collection.nfts.map((nft) => new PublicKey(nft.mint)),
      })
      .then((nfts) => {
        setNfts(nfts);
      });

    if (!isOpen) return;

    setSelectedOffer(offers[0]);

    return () => {
      setSelectedOffer(null);
    };
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
        selectedIndex={selectedIndex}
        setSelectedNft={setSelectedNft}
        setSelectedNftIndex={setSelectedNftIndex}
        offers={offers}
        selectedOffer={selectedOffer}
        setSelectedOffer={setSelectedOffer}
        nfts={nfts}
        collection={collection}
      />
    </Modal>
  );
};

const OfferDetailsBox = ({ open, amount, duration, interest, children }) => {
  return (
    <div
      onClick={() => open()}
      className="p-2 bg-[#242424] rounded mx-auto md:mx-0 w-2/3 md:w-1/3 my-1 md:my-0 cursor-pointer"
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
