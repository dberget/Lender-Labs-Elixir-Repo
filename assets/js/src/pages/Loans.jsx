import React from "react";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { splitTimeShort } from "../utils/time";
import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

import sharky from "@sharkyfi/client";
import { Metaplex } from "@metaplex-foundation/js";

import { useBorrower } from "../providers/useBorrower";
import { useFrakt } from "../hooks/useFrakt";
import { useCitrus } from "../hooks/useCitrus";
import { useRain } from "../hooks/useRain";
import { SolIcon } from "../components/SolIcon";
import {
  repayLoan as repaySharkyLoan,
  repayAll,
  takeLoan,
} from "../utils/sharky";
import toast from "react-hot-toast";
import useSwr from "swr";

const initSharkyClient = (connection, wallet) => {
  let provider = sharky.createProvider(connection, wallet);
  const sharkyClient = sharky.createSharkyClient(provider);
  return sharkyClient;
};

export function Loans() {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const { signAllTransactions } = useWallet();
  const metaplex = new Metaplex(connection);
  const [filter, setFilter] = React.useState(null);

  const { loans: fraktLoans } = useFrakt();
  const { citrus, loans: citrusLoans } = useCitrus();
  const { rainLoans, repayAll: repayAllRain } = useRain();

  const sharkyClient = initSharkyClient(connection, wallet);

  const { loans: sharkyLoans, isLoading } = useBorrower();

  if (!sharkyLoans) return <div></div>;

  const handleFilterLoans = async (newFilter) => {
    if (filter === newFilter) {
      setFilter(null);
      return;
    }
    setFilter(newFilter);
  };

  const allLoans = [
    ...rainLoans,
    ...citrusLoans,
    ...fraktLoans,
    ...sharkyLoans,
  ].sort((a, b) => a.end - b.end);

  const handleRepayAll = async () => {
    if (sharkyLoans.length > 0) {
      toast("Building Sharky repay transactions...");
      await repayAll(
        sharkyClient,
        sharkyLoans,
        signAllTransactions,
        wallet.publicKey,
        connection
      );
    }

    if (rainLoans.length > 0) {
      toast("Building Rain repay transactions...");
      await repayAllRain(rainLoans);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-evenly mx-auto w-1/4">
        <div
          style={{
            backgroundColor: filter == "Sharky" ? "#28292B" : "transparent",
          }}
          className="p-4"
        >
          <img
            onClick={() => handleFilterLoans("Sharky")}
            className={"w-auto h-12 cursor-pointer"}
            src={"/images/sharky.png"}
          />
        </div>
        <div
          style={{
            backgroundColor: filter == "FRAKT" ? "#28292B" : "transparent",
          }}
          className="p-4"
        >
          <img
            onClick={() => handleFilterLoans("FRAKT")}
            className={"h-12 cursor-pointer"}
            src={"/images/frakt.png"}
          />
        </div>
        <div
          style={{
            backgroundColor: filter == "Rain" ? "#28292B" : "transparent",
          }}
          className="p-4"
        >
          <img
            onClick={() => handleFilterLoans("Rain")}
            className={"w-auto h-12 cursor-pointer"}
            src={"/images/rainfi.png"}
          />
        </div>
        <div
          style={{
            backgroundColor: filter == "Citrus" ? "#28292B" : "transparent",
          }}
          className="p-4"
        >
          <img
            onClick={() => handleFilterLoans("Citrus")}
            className={"w-auto h-12 cursor-pointer"}
            src={"/images/citrus-logo.png"}
          />
        </div>
      </div>
      <div className="flex justify-evenly mx-auto w-1/4">
        <button onClick={() => handleRepayAll()}>Repay All</button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full px-2 xl:px-0 xl:w-5/6 mx-auto justify-items-center">
        {allLoans.length > 0 && (
          <LoanCards
            sharkyClient={sharkyClient}
            filter={filter}
            metaplex={metaplex}
            loans={allLoans}
          />
        )}
      </div>
    </div>
  );
}

const LoanCards = ({ loans, metaplex, sharkyClient, filter }) => {
  const CardMap = {
    Rain: (props) => (
      <RainCard key={props.index} {...props} metaplex={metaplex} />
    ),
    Citrus: (props) => (
      <CitrusCard key={props.index} {...props} metaplex={metaplex} />
    ),
    FRAKT: (props) => (
      <FraktCard key={props.index} {...props} metaplex={metaplex} />
    ),
    Sharky: (props) => (
      <SharkyCard
        key={props.index}
        sharkyClient={sharkyClient}
        metaplex={metaplex}
        {...props}
      />
    ),
  };

  let filteredLoans = loans;

  if (filter) {
    filteredLoans = filteredLoans.filter((loan) => loan.platform === filter);
  }

  filteredLoans = filteredLoans.map((loan, index) =>
    CardMap[loan.platform]({ loan, index })
  );

  return filteredLoans;
};

const FraktCard = ({ loan }) => {
  const { repayLoan } = useFrakt();

  return (
    <div className="bg-[#28292B] p-4 my-2 w-full rounded flex border-b-4 border-[#A2FF2F]">
      <img src={loan?.nft.imageUrl} className="w-20 h-20 rounded" />

      <div className="flex w-full ml-2">
        <div>
          {/* <img className={"w-auto h-8 ml-auto"} src={"/images/frakt.png"} /> */}
          <div className="font-bold">
            {(loan.loanValue / LAMPORTS_PER_SOL).toFixed(2)} <SolIcon />{" "}
          </div>

          <div>
            {splitTimeShort(
              Math.abs(new Date() - new Date(loan.end * 1000)) / 36e5
            )}
          </div>
        </div>

        <div className="ml-auto flex-col flex">
          <button className="mt-auto" onClick={() => repayLoan(loan)}>
            Repay
          </button>
        </div>
      </div>
    </div>
  );
};

const SharkyCard = ({ loan, metaplex, sharkyClient }) => {
  const { data } = useBorrower();
  const { connection } = useConnection();
  const [nft, setNft] = React.useState(null);

  React.useEffect(() => {
    const getNft = async () => {
      const nft = await metaplex
        .nfts()
        .findByMint({ mintAddress: new PublicKey(loan.nftCollateralMint) });

      setNft(nft);
    };

    getNft();
  }, []);

  const { data: sharkyOffers } = useSwr(
    `/api/get_collection_offers?collection=${loan?.orderBook}`,
    (...args) => fetch(...args, {}).then((res) => res.json())
  );

  const renewSharkyLoan = async (loan, sharkyClient, connection) => {
    await repaySharkyLoan(loan, sharkyClient, connection);

    setTimeout(() => {
      takeLoan(
        sharkyOffers[0],
        nft.mint,
        sharkyClient,
        data?.indexes[nft?.mint?.address.toString()]
      );
    }, 5000);
  };

  return (
    <div className="bg-[#28292B] p-4 my-2 w-full rounded flex border-b-4 border-[#FF1757]">
      <img src={nft?.json?.image} className="w-20 h-20 rounded" />

      <div className="flex w-full ml-2">
        <div>
          <div className="font-bold">
            {loan.amountSol.toFixed(2)} <SolIcon />{" "}
          </div>

          <div>
            {splitTimeShort(
              Math.abs(new Date() - new Date(loan.end * 1000)) / 36e5
            )}
          </div>
        </div>

        <div className="ml-auto flex-col flex">
          {/* <img className={"w-auto h-8 ml-auto"} src={"/images/sharky.png"} /> */}
          {/* {sharkyOffers && sharkyOffers.length > 0 && (
            <button
              className="mt-auto"
              onClick={() => renewSharkyLoan(loan, sharkyClient, connection)}
            >
              Renew ({`${sharkyOffers[0].amountSol}`})
            </button>
          )} */}
          <button
            className="mt-2"
            onClick={() => repaySharkyLoan(loan, sharkyClient, connection)}
          >
            Repay
          </button>
        </div>
      </div>
    </div>
  );
};

const CitrusCard = ({ loan, metaplex }) => {
  const [nft, setNft] = React.useState(null);
  const { citrusSdk, repayLoan } = useCitrus();

  React.useEffect(() => {
    const getNft = async () => {
      const nft = await metaplex
        .nfts()
        .findByMint({ mintAddress: new PublicKey(loan.mint) });

      setNft(nft);
    };
    getNft();
  }, []);

  return (
    <div className="bg-[#28292B] p-4 my-2 w-full rounded flex border-b-4 border-[#F97315]">
      <img src={nft?.json?.image} className="w-20 h-20 rounded" />

      <div className="flex w-full ml-2">
        <div>
          <div className="font-bold">
            {(loan.terms.principal / LAMPORTS_PER_SOL).toFixed(2)} <SolIcon />{" "}
          </div>

          <div>
            {splitTimeShort(
              Math.abs(new Date() - new Date(loan.end * 1000)) / 36e5
            )}
          </div>
        </div>

        <div className="ml-auto flex-col flex">
          <button className="mt-auto" onClick={() => repayLoan(loan)}>
            Repay
          </button>
        </div>
      </div>
    </div>
  );
};

const RainCard = ({ loan, metaplex }) => {
  const [nft, setNft] = React.useState(null);
  const { rain, repayLoan } = useRain();

  const getNft = async () => {
    const nft = await metaplex
      .nfts()
      .findByMint({ mintAddress: new PublicKey(loan.mint) });

    setNft(nft);
  };

  React.useEffect(() => {
    getNft();
  }, []);

  return (
    <div className="bg-[#28292B] p-4 my-2 w-full rounded flex border-b-4 border-[#2FB5FE]">
      <img src={nft?.json?.image} className="w-20 h-20 rounded" />

      <div className="flex w-full ml-2">
        <div>
          <div className="font-bold">
            {(loan.amount / LAMPORTS_PER_SOL).toFixed(2)} <SolIcon />{" "}
          </div>

          <div>
            {splitTimeShort(
              Math.abs(new Date() - new Date(loan.end * 1000)) / 36e5
            )}
          </div>
        </div>
        <div className="ml-auto flex-col flex">
          {/* <img className={"w-auto h-8 ml-auto"} src={"/images/rainfi.png"} /> */}
          <button className="mt-auto" onClick={() => repayLoan(loan)}>
            Repay
          </button>
        </div>
      </div>
    </div>
  );
};
