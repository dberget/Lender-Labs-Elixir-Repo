import * as React from "react";
import ReactDOM from "react-dom/client";

import WalletProvider from "./src/providers/wallet";
import { ModalProvider } from "react-hooks-use-modal";

import { FraktProvider } from "./src/hooks/useFrakt";
import { CitrusProvider } from "./src/hooks/useCitrus";
import App from "./src";

ReactDOM.createRoot(document.getElementById("app")).render(
  <WalletProvider>
    <FraktProvider>
      <CitrusProvider>
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
      </CitrusProvider>
    </FraktProvider>
  </WalletProvider>
);
