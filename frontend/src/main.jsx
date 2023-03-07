import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import WalletProvider from "./providers/wallet";
import { ModalProvider } from "react-hooks-use-modal";

import("@solana/wallet-adapter-react-ui/styles.css");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WalletProvider>
      <ModalProvider
        focusTrapOptions={{
          preventScroll: true,
          focusTrapOptions: {
            clickOutsideDeactivates: true,
          },
        }}
        components={{
          Modal: ({ children }) => {
            return <div>{children}</div>;
          },
        }}
      >
        <App />
      </ModalProvider>
    </WalletProvider>
  </React.StrictMode>
);
