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

const initSharkyClient = (connection, wallet) => {
  let provider = sharky.createProvider(connection, wallet);
  const sharkyClient = sharky.createSharkyClient(provider);
  return sharkyClient;
};

export function Loans() {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const metaplex = new Metaplex(connection);

  const { loans: fraktLoans } = useFrakt();
  const { citrus, loans: citrusLoans } = useCitrus();
  const { rainLoans } = useRain();

  const { loans: sharkyLoans } = useBorrower();

  if (!sharkyLoans) return null;

  const allLoans = [
    ...rainLoans,
    ...citrusLoans,
    ...fraktLoans,
    ...sharkyLoans,
  ].sort((a, b) => a.end - b.end);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 w-full px-2 xl:px-0 xl:w-5/6 mx-auto justify-items-center">
      {allLoans.length > 0 &&
        allLoans.map((loan, index) => (
          <LoanCard metaplex={metaplex} key={index} loan={loan} />
        ))}
    </div>
  );
}

const LoanCard = ({ loan, metaplex }) => {
  const CardMap = {
    Rain: <RainCard loan={loan} metaplex={metaplex} />,
    Citrus: <CitrusCard loan={loan} metaplex={metaplex} />,
    FRAKT: <FraktCard loan={loan} metaplex={metaplex} />,
    undefined: <SharkyCard loan={loan} metaplex={metaplex} />,
  };

  return CardMap[loan.platform];
};

const FraktCard = ({ loan }) => {
  return (
    <div className="bg-[#28292B] p-4 my-2 w-full rounded flex">
      <img src={loan?.nft.imageUrl} className="w-20 h-20 rounded" />

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

        <div className="ml-auto mt-auto">
          <button onClick={() => repayLoan(loan)}>Repay</button>
        </div>
      </div>
    </div>
  );
};

const SharkyCard = ({ loan, metaplex }) => {
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

  return (
    <div className="bg-[#28292B] p-4 my-2 w-full rounded flex">
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

        <div className="ml-auto mt-auto">
          <button onClick={() => repayLoan(loan)}>Repay</button>
        </div>
      </div>
    </div>
  );
};

const CitrusCard = ({ loan, metaplex }) => {
  const [nft, setNft] = React.useState(null);

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
    <div className="bg-[#28292B] p-4 my-2 w-full rounded flex">
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

        <div className="ml-auto mt-auto">
          <button onClick={() => repayLoan(loan)}>Repay</button>
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
    <div className="bg-[#28292B] p-4 my-2 w-full rounded flex">
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

        <div className="ml-auto mt-auto">
          <button onClick={() => repayLoan(loan)}>Repay</button>
        </div>
      </div>
    </div>
  );
};
