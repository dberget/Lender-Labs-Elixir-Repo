import React from "react";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { splitTimeShort } from "../utils/time";
import { PublicKey, LAMPORTS_PER_SOL, Transaction } from "@solana/web3.js";

import sharky from "@sharkyfi/client";
import { Metaplex } from "@metaplex-foundation/js";

import { useBorrower } from "../providers/useBorrower";
import { useFrakt } from "../hooks/useFrakt";
import { useCitrus } from "../hooks/useCitrus";
import { useRain } from "../hooks/useRain";
import { SolIcon } from "../components/SolIcon";
import { notify } from "../utils/discord";
import {
  renewLoan,
  repayAll,
  repayLoan as repaySharkyLoan,
} from "../utils/sharky";
import { Tooltip as ReactTooltip } from "react-tooltip";
import toast from "react-hot-toast";

import Button from "../components/Button";
import { useCollection } from "../hooks/useCollection";

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
  const [repayAmount, setRepayAmount] = React.useState(0);

  const [selectedForRenew, setSelectedForRenew] = React.useState([]);
  const [sortBy, setSortBy] = React.useState("amountSol");

  const [sortDirection, setSortDirection] = React.useState("DESC");

  const { loans: fraktLoans, repayLoan: repayFraktLoan } = useFrakt();
  const { citrus, loans: citrusLoans, repayLoan } = useCitrus();
  const { rainLoans, repayAll: repayAllRain } = useRain();

  const sharkyClient = initSharkyClient(connection, wallet);

  const { loanData, isLoading } = useBorrower();

  React.useEffect(() => {
    const repayAmount = selectedForRepay.reduce(
      (acc, curr) => acc + (curr.loan.amountSol + (curr?.loan?.earnings || 0)),
      0
    );

    setRepayAmount(repayAmount);
  }, [selectedForRepay]);

  if (!loanData) return <div></div>;

  const { loans: sharkyLoans, summary } = loanData;

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

  const handleRenewSelected = async () => {
    notify(`Renewing Selected loans ${wallet?.publicKey?.toBase58()}`);

    const selectedSharkyLoans = selectedForRenew.filter(
      (l) => l.loan.platform === "Sharky"
    );
    toast("Building bulk Sharky.fi transactions...");

    const blockhash = await connection.getLatestBlockhash();
    const txs = [];
    if (selectedSharkyLoans.length > 0) {
      for (let i = 0; i < selectedSharkyLoans.length; i++) {
        let ix = await renewLoan(
          selectedSharkyLoans[i].loan,
          sharkyClient,
          selectedSharkyLoans[i].offer
        );

        ix.programId = new PublicKey(
          "SHARKobtfF1bHhxD2eqftjHBdVSCbKo9JtgK71FhELP"
        );

        let transaction = new Transaction().add(ix[0]);

        transaction.recentBlockhash = blockhash.blockhash;
        transaction.feePayer = wallet.publicKey;

        txs.push(transaction);
      }
    }

    const signedTxs = await signAllTransactions(txs);

    signedTxs.map(async (tx) => {
      let res = connection.sendRawTransaction(tx.serialize(), {
        commitment: "confirmed",
      });

      await toast.promise(res, {
        loading: "Renewing...",
        success: (data) => (
          <a target="_blank" href={`https://solscan.io/tx/${data}`}>
            https://solscan.io/tx/...
          </a>
        ),
        error: (err) => console.log(err.message),
      });
    });
  };

  const handleRepaySelected = async () => {
    notify(`Repaying Selected loans ${wallet?.publicKey?.toBase58()}`);

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

  const handleSelection = (loan, offers) => {
    handleSetSelectedForRepay(loan);
    handleSetSelectedForRenew(loan, offers);
  };

  const handleSetSelectedForRenew = (loan, offers) => {
    const pk = loan.pubkey ?? loan.loanAccount ?? loan.accountAddress;

    const found = selectedForRenew.find((l) => l.key == pk);

    const selectedFromSameCollection = selectedForRenew.filter(
      (s) => s.loan.orderBook === loan.orderBook
    ).length;

    if (found) {
      setSelectedForRenew(selectedForRenew.filter((l) => l.key !== pk));
    } else {
      const loanOwed = loan.amountSol + loan.earnings + loan.earnings * 0.16;

      setSelectedForRenew([
        ...selectedForRenew,
        {
          key: pk,
          loan,
          offer: offers[selectedFromSameCollection],
          renewDiff: offers[selectedFromSameCollection].amountSol - loanOwed,
        },
      ]);
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
      <div>
        <div className="flex justify-around items-center w-full md:w-1/2 mx-auto">
          <StatCard
            title={"Loaned"}
            value={
              summary && (
                <>
                  {summary?.totalSolLoaned.toFixed(2)} <SolIcon />
                </>
              )
            }
          />

          <StatCard
            title={"Interest Owed"}
            value={
              summary && (
                <>
                  {summary?.totalInterest.toFixed(2)} <SolIcon />
                </>
              )
            }
          />
        </div>
      </div>

      <div className="mt-3 flex justify-evenly items-center mx-auto w-full md:w-2/3">
        <Button
          disabled={selectedForRepay.length == 0}
          className="py-3"
          onClick={() => handleRenewSelected()}
        >
          Renew Selected{" "}
          {selectedForRenew
            .reduce((acc, loan) => loan?.renewDiff + acc, 0)
            .toFixed(2)}{" "}
          <SolIcon />
        </Button>
        <Button
          disabled={selectedForRepay.length == 0}
          className="py-3"
          onClick={() => handleRepaySelected()}
        >
          Repay Selected {repayAmount.toFixed(2)} <SolIcon />
        </Button>

        <div className="flex">
          {/* <select
            className="text-black"
            onChange={(e) => setSortBy(e.currentTarget.value)}
          >
            <option value="amountSol">Amount</option>
            <option value="start">Start</option>
          </select>

          <select
            className="text-black"
            onChange={(e) => setSortDirection(e.currentTarget.value)}
          >
            <option value="ASC">ASC</option>
            <option value="DESC">DESC</option>
          </select> */}
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
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full px-2 xl:px-0 xl:w-5/6 mx-auto justify-items-center">
        {allLoans.length > 0 && (
          <LoanCards
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortDirection={sortDirection}
            sharkyClient={sharkyClient}
            setSelected={handleSelection}
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

const StatCard = ({ title, value }) => {
  return (
    <div className="bg-[#28292B] rounded w-full md:w-1/4">
      <div className="p-4">
        <div className="text-sm font-light">{title}</div>
        <div className="text-2xl"> {value}</div>
      </div>
    </div>
  );
};

const LoanCards = ({
  loans,
  metaplex,
  sharkyClient,
  filter,
  sortBy,
  sortDirection,
  setSelected,
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

  // if (sortBy) {
  //   filteredLoans = filteredLoans.sort((a, b) => {
  //     if (sortDirection === "ASC") {
  //       if (a[sortBy] > b[sortBy]) return 1;
  //       if (a[sortBy] < b[sortBy]) return -1;
  //     }

  //     if (sortDirection === "DESC") {
  //       if (a[sortBy] > b[sortBy]) return -1;
  //       if (a[sortBy] < b[sortBy]) return 1;
  //     }

  //     return 0;
  //   });
  // }

  filteredLoans = filteredLoans.map((loan, index) =>
    CardMap[loan.platform]({
      loan,
      index,
      setSelected,
      selectedForRepay,
    })
  );

  return filteredLoans;
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
              render={() => (
                <span style={{ fontSize: ".8rem", fontWeight: "400" }}>
                  {new Date(loan.end * 1000).toLocaleString()}
                </span>
              )}
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
  setSelected,
  sharkyClient,
}) => {
  const { connection } = useConnection();
  const { sendTransaction, publicKey } = useWallet();
  const [nft, setNft] = React.useState(null);
  const [isSelected, setIsSelected] = React.useState(false);

  const { collection } = useCollection(loan.orderBook);

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

  const loanOwed = loan.amountSol + loan.earnings + loan.earnings * 0.16;

  const renewDiff =
    collection?.offers?.length > 0
      ? (collection?.offers[0]?.amountSol - loanOwed).toFixed(2)
      : 0;

  const handleSetSelected = () => {
    setSelected(loan, collection?.offers);
  };

  return (
    <div
      onClick={() => handleSetSelected()}
      className="cursor-pointer bg-[#28292B] p-3 my-2 w-full rounded border-b-4 border-[#FF1757]"
    >
      <div className="w-full">
        <div className="flex items-center w-full mb-1">
          <div
            className={`${
              isSelected ? "hero-check-circle-solid" : "hero-check-circle"
            } mr-1 w-7 h-7 text-[#58BC98]`}
          />
          <span className="font-bold">{collection?.name}</span>

          <span
            className={
              "ml-auto " + (loanOwed > collection?.fp ? "text-red-500" : "")
            }
          >
            {collection?.fp?.toFixed(2)} <SolIcon />
          </span>
        </div>
      </div>

      <div className="flex w-full">
        <img
          key={nft?.json?.image}
          src={nft?.json?.image}
          className="w-20 h-20 rounded"
        />
        <div className="ml-2">
          <div className="font-bold">
            {loanOwed.toFixed(2)} <SolIcon />
          </div>

          <div className="font-bold"></div>

          <div id={"end-date" + loan.pubkey}>
            {splitTimeShort(
              Math.abs(new Date() - new Date(loan.end * 1000)) / 36e5
            )}
            <ReactTooltip
              anchorSelect={"#end-date" + loan.pubkey}
              place="bottom"
              render={() => (
                <span style={{ fontSize: ".8rem", fontWeight: "400" }}>
                  {new Date(loan.end * 1000).toLocaleString()}
                </span>
              )}
            />
          </div>
        </div>

        <div className="flex flex-col items-end ml-auto">
          <Button
            className="ml-auto mt-auto p-2"
            onClick={(ev) => {
              repaySharkyLoan(loan, sharkyClient, connection);

              ev.stopPropagation();
            }}
          >
            Repay
          </Button>

          <Button
            className="p-2 mt-1"
            onClick={(ev) => {
              renewLoan(
                loan,
                sharkyClient,
                collection.offers[0],
                publicKey,
                sendTransaction,
                connection
              );

              ev.stopPropagation();
            }}
          >
            Renew{" "}
            <span
              className={renewDiff > 0 ? "text-green-500" : "text-amber-400"}
            >
              {Math.abs(renewDiff)}
            </span>{" "}
            <SolIcon />
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
      <img
        key={nft?.json?.image}
        src={nft?.json?.image}
        className="w-20 h-20 rounded"
      />

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
      <img
        key={loan.pubkey}
        src={nft?.json?.image}
        className="w-20 h-20 rounded"
      />

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
