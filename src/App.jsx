import React from "react";
import { Routes, Route } from "react-router-dom";
import Historial from "./pages/Historial/Historial";
import Home from "./pages/Home/Home";
import { HistorialProvider } from "./Context/HistorialContext";

function App() {
  return (
    <HistorialProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/historial" element={<Historial />} />
      </Routes>
    </HistorialProvider>
  );
}

export default App;
