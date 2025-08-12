import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Link } from "react-router-dom";
import { useOutsideClick } from "../hooks/useOutsideClick";
import Button from "./Button";

export const Header = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="w-screen text-white relative">
      <nav
        className="mx-auto flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Lender Labs</span>
            <img className="h-8 w-auto" src={"/images/logo-green.png"} alt="" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <Button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setOpen(!open)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </Button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link to="/" className="text-sm font-semibold leading-6 text-white">
            Borrow
          </Link>
          <Link
            to="/loans"
            className="text-sm font-semibold leading-6 text-white"
          >
            Loans
          </Link>
          {/* <Link
            to="/overview"
            className="text-sm font-semibold leading-6 text-white"
          >
            Overview
          </Link> */}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <WalletMultiButton />
        </div>

        {open && <MobileDropdown setOpen={setOpen} />}
      </nav>
    </header>
  );
};

const MobileDropdown = ({ setOpen }) => {
  let ref = useOutsideClick(() => setOpen(false));

  return (
    <div ref={ref} className="absolute bg-[#242424] right-0 top-10 p-4">
      <div className="lg:flex-1 lg:justify-end">
        <WalletMultiButton />
      </div>
      <div>
        <Link to="/" className="text-sm font-semibold leading-6 text-white">
          Borrow
        </Link>
      </div>
      <div>
        <Link
          to="/loans"
          className="text-sm font-semibold leading-6 text-white"
        >
          Loans
        </Link>
      </div>
    </div>
  );
};
