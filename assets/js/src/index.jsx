import React from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Borrow } from "./pages/Borrow";

function App() {
  return (
    <BrowserRouter basename="/">
      <Header />
      <Routes>
        <Route path="/" element={<Borrow />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
