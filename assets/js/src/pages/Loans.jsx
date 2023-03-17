import React from "react";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { splitTimeShort } from "../utils/time";
import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import useSwr from "swr";

import sharky from "@sharkyfi/client";
import { Metaplex } from "@metaplex-foundation/js";

import { useBorrower } from "../providers/useBorrower";
import { useFrakt } from "../hooks/useFrakt";
import { useCitrus } from "../hooks/useCitrus";
import { useRain } from "../hooks/useRain";
import { SolIcon } from "../components/SolIcon";
import { repayAll, repayLoan as repaySharkyLoan } from "../utils/sharky";
import { Tooltip as ReactTooltip } from "react-tooltip";
import toast from "react-hot-toast";

import Button from "../components/Button";

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
  const [selectedForRepay, setSelectedForRepay] = React.useState([]);

  const { loans: fraktLoans, repayLoan: repayFraktLoan } = useFrakt();
  const { citrus, loans: citrusLoans, repayLoan } = useCitrus();
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
    if (sharkyLoans.length > 0 && (filter === "Sharky" || filter === null)) {
      toast("Building Sharky.fi transactions...");

      await repayAll(
        sharkyClient,
        sharkyLoans,
        signAllTransactions,
        wallet.publicKey,
        connection
      );
    }

    if (rainLoans.length > 0 && (filter === "Rain" || filter === null)) {
      toast("Building Rain.fi transactions...");

      await repayAllRain(rainLoans);
    }

    if (fraktLoans.length > 0 && (filter === "FRAKT" || filter === null)) {
      toast("Building Frakt transactions...");

      for (let i = 0; i < fraktLoans.length; i++) {
        const loan = fraktLoans[i];

        await repayFraktLoan(loan);
      }
    }

    if (citrusLoans.length > 0 && (filter === "Citrus" || filter === null)) {
      toast("Building Citrus transactions...");

      for (let i = 0; i < citrusLoans.length; i++) {
        const loan = citrusLoans[i];

        await repayLoan(loan);
      }
    }
  };

  const handleRepaySelected = async () => {
    const selectedSharkyLoans = selectedForRepay.filter(
      (l) => l.loan.platform === "Sharky"
    );

    if (selectedSharkyLoans.length > 0) {
      toast("Building bulk Sharky.fi transactions...");

      await repayAll(
        sharkyClient,
        selectedSharkyLoans.map((l) => l.loan),
        signAllTransactions,
        wallet.publicKey,
        connection
      );
    }

    const selectedRainLoans = selectedForRepay.filter(
      (l) => l.loan.platform === "Rain"
    );

    if (selectedRainLoans.length > 0) {
      toast("Building bulk Rain.fi transactions...");

      await repayAllRain(selectedRainLoans.map((l) => l.loan));
    }

    const selectedFraktLoans = selectedForRepay.filter(
      (l) => l.loan.platform === "FRAKT"
    );

    if (selectedFraktLoans.length > 0) {
      toast("Building Frakt repay transactions...");

      for (let i = 0; i < selectedFraktLoans.length; i++) {
        const loan = selectedFraktLoans[i].loan;

        toast("Building Citrus repay transaction...");
        await repayFraktLoan(loan);
      }
    }

    const selectedCitrusLoans = selectedForRepay.filter(
      (l) => l.loan.platform === "Citrus"
    );

    if (selectedCitrusLoans.length > 0) {
      toast("Building Citrus transactions...");

      for (let i = 0; i < selectedCitrusLoans.length; i++) {
        const loan = selectedCitrusLoans[i].loan;

        await repayLoan(loan);
      }
    }
  };

  const handleSetSelectedForRepay = (loan) => {
    const pk = loan.pubkey ?? loan.loanAccount ?? loan.accountAddress;

    const found = selectedForRepay.find((l) => l.key == pk);

    if (found) {
      setSelectedForRepay(selectedForRepay.filter((l) => l.key !== pk));
    } else {
      setSelectedForRepay([...selectedForRepay, { key: pk, loan }]);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-evenly mx-auto w-full md:w-1/4">
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
      <div className="flex justify-around mx-auto w-full md:w-1/4">
        <Button onClick={() => handleRepayAll()}>Repay All</Button>

        <Button onClick={() => handleRepaySelected()}>
          Repay Selected ({selectedForRepay.length})
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full px-2 xl:px-0 xl:w-5/6 mx-auto justify-items-center">
        {/* <StatsCard /> */}
        {allLoans.length > 0 && (
          <LoanCards
            sharkyClient={sharkyClient}
            setSelectedForRepay={handleSetSelectedForRepay}
            filter={filter}
            metaplex={metaplex}
            loans={allLoans}
            selectedForRepay={selectedForRepay}
          />
        )}
      </div>
    </div>
  );
}

const LoanCards = ({
  loans,
  metaplex,
  sharkyClient,
  filter,
  setSelectedForRepay,
  selectedForRepay,
}) => {
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
    CardMap[loan.platform]({
      loan,
      index,
      setSelectedForRepay,
      selectedForRepay,
    })
  );

  return filteredLoans;
};

const StatsCard = () => {
  const { publicKey } = useWallet();

  const { loans } = useSwr(
    publicKey ? `https://lenderlabs.xyz/api/borrower?pk=${publicKey}` : null,
    (...args) => fetch(...args, {}).then((res) => res.json())
  );

  return (
    <div className="bg-[#28292B] p-4 my-2 w-full rounded flex border-b-4 border-[#A2FF2F]">
      Stats
    </div>
  );
};

const FraktCard = ({ loan, setSelectedForRepay, selectedForRepay }) => {
  const { repayLoan } = useFrakt();

  const [isSelected, setIsSelected] = React.useState(false);

  React.useEffect(() => {
    const selected = selectedForRepay.find((l) => l.key == loan.pubkey);

    setIsSelected(selected);
  }, [selectedForRepay]);

  return (
    <div
      onClick={() => setSelectedForRepay(loan)}
      className="bg-[#28292B] p-4 my-2 w-full rounded flex border-b-4 border-[#A2FF2F]"
    >
      <img src={loan?.nft.imageUrl} className="w-20 h-20 rounded" />

      <div className="flex w-full ml-2">
        <div>
          {/* <img className={"w-auto h-8 ml-auto"} src={"/images/frakt.png"} /> */}
          <div className="font-bold">
            {(loan.loanValue / LAMPORTS_PER_SOL).toFixed(2)} <SolIcon />{" "}
          </div>
          <div id={"end-date" + loan.pubkey}>
            {splitTimeShort(
              Math.abs(new Date() - new Date(loan.end * 1000)) / 36e5
            )}
            <ReactTooltip
              anchorSelect={"#end-date" + loan.pubkey}
              place="bottom"
              content={`${new Date(loan.end * 1000).toLocaleString()}`}
            />
          </div>
        </div>

        <div className="ml-auto flex-col flex">
          <div
            className={`${
              isSelected ? "hero-check-circle-solid" : "hero-check-circle"
            } ml-auto w-7 h-7 text-[#58BC98]`}
          />
          <Button
            className="mt-auto"
            onClick={(ev) => {
              ev.stopPropagation();
              repayLoan(loan);
            }}
          >
            Repay
          </Button>
        </div>
      </div>
    </div>
  );
};

const SharkyCard = ({
  loan,
  metaplex,
  selectedForRepay,
  setSelectedForRepay,
  sharkyClient,
}) => {
  const { connection } = useConnection();
  const [nft, setNft] = React.useState(null);
  const [isSelected, setIsSelected] = React.useState(false);

  React.useEffect(() => {
    const selected = selectedForRepay.find((l) => l.key == loan.pubkey);

    setIsSelected(selected);
  }, [selectedForRepay]);

  React.useEffect(() => {
    const getNft = async () => {
      const nft = await metaplex
        .nfts()
        .findByMint({ mintAddress: new PublicKey(loan.nftCollateralMint) });

      setNft(nft);
    };

    getNft();
  }, []);

  return (
    <div
      onClick={() => setSelectedForRepay(loan)}
      className="cursor-pointer bg-[#28292B] p-4 my-2 w-full rounded flex border-b-4 border-[#FF1757]"
    >
      <img src={nft?.json?.image} className="w-20 h-20 rounded" />

      <div className="flex w-full ml-2">
        <div>
          <div className="font-bold">
            {(loan.amountSol + loan.earnings + loan.earnings * 0.16).toFixed(2)}{" "}
            <SolIcon />
          </div>

          <div id={"end-date" + loan.pubkey}>
            {splitTimeShort(
              Math.abs(new Date() - new Date(loan.end * 1000)) / 36e5
            )}
            <ReactTooltip
              anchorSelect={"#end-date" + loan.pubkey}
              place="top"
              content={`${new Date(loan.end * 1000).toLocaleString()}`}
            />
          </div>
        </div>

        <div className="ml-auto flex-col flex">
          <div
            className={`${
              isSelected ? "hero-check-circle-solid" : "hero-check-circle"
            } ml-auto w-7 h-7 text-[#58BC98]`}
          />
          <Button
            className="mt-auto"
            onClick={(ev) => {
              repaySharkyLoan(loan, sharkyClient, connection);

              ev.stopPropagation();
            }}
          >
            Repay
          </Button>
        </div>
      </div>
    </div>
  );
};

const CitrusCard = ({
  loan,
  metaplex,
  setSelectedForRepay,
  selectedForRepay,
}) => {
  const [nft, setNft] = React.useState(null);
  const { citrusSdk, repayLoan } = useCitrus();
  const [isSelected, setIsSelected] = React.useState(false);

  React.useEffect(() => {
    const selected = selectedForRepay.find((l) => l.key == loan.loanAccount);

    setIsSelected(selected);
  }, [selectedForRepay]);

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
    <div
      onClick={() => setSelectedForRepay(loan)}
      className="bg-[#28292B] p-4 my-2 w-full rounded flex border-b-4 border-[#F97315] cursor-pointer"
    >
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
          <div
            className={`${
              isSelected ? "hero-check-circle-solid" : "hero-check-circle"
            } ml-auto w-7 h-7 text-[#58BC98]`}
          />
          <Button
            className="mt-auto"
            onClick={(ev) => {
              ev.stopPropagation();
              repayLoan(loan);
            }}
          >
            Repay
          </Button>
        </div>
      </div>
    </div>
  );
};

const RainCard = ({
  loan,
  metaplex,
  setSelectedForRepay,
  selectedForRepay,
}) => {
  const [nft, setNft] = React.useState(null);
  const { rain, repayLoan } = useRain();

  const [isSelected, setIsSelected] = React.useState(false);

  React.useEffect(() => {
    const selected = selectedForRepay.find((l) => l.key == loan.accountAddress);

    setIsSelected(selected);
  }, [selectedForRepay]);

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
    <div
      onClick={() => setSelectedForRepay(loan)}
      className="bg-[#28292B] cursor-pointer p-4 my-2 w-full rounded flex border-b-4 border-[#2FB5FE]"
    >
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
          <div
            className={`${
              isSelected ? "hero-check-circle-solid" : "hero-check-circle"
            } ml-auto w-7 h-7 text-[#58BC98]`}
          />
          <Button
            className="mt-auto"
            onClick={(ev) => {
              ev.stopPropagation();
              repayLoan(loan);
            }}
          >
            Repay
          </Button>
        </div>
      </div>
    </div>
  );
};
