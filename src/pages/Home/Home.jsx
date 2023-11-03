import React from "react";
import Card from "../../components/Card/Card"

import style from "./Home.module.css"

const Home = () => {
  return (
    <div>
      <h1>Duelo Pokemon</h1>

      <div className={style.battleContainer}>
        <Card/>
        <div className={style.centerContainer}>
          <p>VS</p>
        </div>
        <Card/>
      </div>
          <button>Comenzar</button>
    </div>
  );
};

export default Home;
