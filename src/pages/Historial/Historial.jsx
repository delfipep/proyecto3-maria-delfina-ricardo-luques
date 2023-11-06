import React from "react";
import Header from "../../components/Header/Header";
import style from "./Historial.module.css"

const Historial = () => {
  return (
    <div>
        <Header />
      <h1>Historial de combates</h1>

      <div className={style.historyContainer}></div>
    </div>
  );
};

export default Historial;
