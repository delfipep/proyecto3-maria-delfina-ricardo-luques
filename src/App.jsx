import "./App.css";
import { Routes, Route } from "react-router-dom";
import Historial from "./pages/Historial/Historial";
import Home from "./pages/Home/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/historial" element={<Historial />} />
      </Routes>
    </>
  );
}

export default App;
