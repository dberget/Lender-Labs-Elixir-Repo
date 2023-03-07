import React from "react";
import ReactDOM from "react-dom/client";
import App from "./src";
import WalletProvider from "./src/providers/wallet";
import { ModalProvider } from "react-hooks-use-modal";

ReactDOM.createRoot(document.getElementById("app")).render(
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
);
