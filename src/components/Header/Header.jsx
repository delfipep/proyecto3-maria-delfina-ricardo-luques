import React from "react";
import { Link, useLocation } from "react-router-dom";
import style from "./Header.module.css";

const Header = () => {
  const location = useLocation();

  return (
    <div className={style.headerContainer}>
      <Link to="/">
        <h2>PokeArena</h2>
      </Link>

      {location.pathname === "/" ? (
        <Link to="/historial">Historial</Link>
      ) : (
        <Link to="/">Inicio</Link>
      )}
    </div>
  );
};

export default Header;
