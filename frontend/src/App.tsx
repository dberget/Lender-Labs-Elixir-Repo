import { useEffect } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import WalletContext from "./providers/walletContext";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css"
import axios from "axios";


const style = { display: "flex", gap: "8px", padding: "8px 15px" };

function App() {
  /**
   * During development we can still access the base path at `/`
   * And this hook will make sure that we land on the base `/app`
   * path which will mount our App as usual.
   * In production, Phoenix makes sure that the `/app` route is
   * always mounted within the first request.
   * */
  useEffect(() => {
    if (window.location.pathname === "/") {
      window.location.replace("/app");
    }
  }, []);

  useEffect(() => {
    axios.get("/api").then(async (res) => console.log(res))
  }, []);


  return (
    <WalletContext>
      <BrowserRouter basename="app">
        <nav style={style}>
          <Link to="/">Home</Link>
          <Link to="/settings">Settings Page</Link>
          <div style={{ marginLeft: "auto" }}>
            <WalletMultiButton />
          </div>
          <br />
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Routes>
      </BrowserRouter>
    </WalletContext>
  );
}

function SettingsPage() {
  return (
    <div>
      <h1>Settings Page</h1>
      <ul>
        <li>My profile</li>
        <li>Music</li>
        <li>About</li>
      </ul>
    </div>
  );
}

function HomePage() {
  const style = { padding: "8px" };
  return (
    <div style={style}>
      <h1>Shark Attack</h1>
    </div>
  );
}

export default App;