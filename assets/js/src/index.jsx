import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Borrow } from "./pages/Borrow";
import { Toaster } from "react-hot-toast";
import { Loans } from "./pages/Loans";

function App() {
  return (
    <BrowserRouter basename="/">
      <Header />
      <Routes>
        <Route path="/" element={<Borrow />} />
        <Route path="/loans" element={<Loans />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
