import { useEffect } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Borrow } from "./pages/Borrow";

const style = { display: "flex", gap: "8px", padding: "8px" };

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

  return (
    <BrowserRouter basename="app">
      <Header />
      <Routes>
        <Route path="/" element={<Borrow />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
