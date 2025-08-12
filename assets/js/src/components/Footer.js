import React from "react";

export default function Footer() {
  return (
    <>
      <footer className={"footer"}>
        <div className="footer-container flex items-center">
          <div>
            <img
              src="/images/logo-green.png"
              alt="Lender Labs Logo"
              className={"logo"}
            />{" "}
            <div>
              Lending tools, analytics, and insights for the Solana ecosystem.
            </div>
          </div>
        </div>
        <div className="tracking-wide flex flex-col items-center w-1/3">
          <div className="mb-2 font-bold text-[#4DBC8A]">SOCIAL</div>
          <a
            className="font-light"
            href="https://discord.gg/2kwFGMNndR"
            target="_blank"
          >
            Discord
          </a>
          <a
            className="font-light"
            href="https://twitter.com/labslender"
            target="_blank"
          >
            Twitter
          </a>
        </div>
      </footer>
    </>
  );
}
