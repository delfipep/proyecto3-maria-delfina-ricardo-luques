import React, { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import Header from "../../components/Header/Header";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import style from "./Home.module.css";

const Home = () => {
  const [pokemon1Name, setPokemon1Name] = useState("");
  const [pokemon2Name, setPokemon2Name] = useState("");

  const [pokemon1Img, setPokemon1Img] = useState(null);
  const [pokemon2Img, setPokemon2Img] = useState(null);

  const [pokemon1Life, setPokemon1Life] = useState(0);
  const [pokemon2Life, setPokemon2Life] = useState(0);

  const [pokemon1Attack, setPokemon1Attack] = useState(0);
  const [pokemon2Attack, setPokemon2Attack] = useState(0);

  const [isCombatting, setIsCombatting] = useState(false);
  const [winnerName, setWinnerName] = useState(null);
  const [winnerImg, setWinnerImg] = useState(null);

  const updatePokemon1Name = (name) => {
    setPokemon1Name(name);
  };
  const updatePokemon1Img = (img) => {
    setPokemon1Img(img);
  };
  const updatePokemon1Life = (life) => {
    setPokemon1Life(life);
  };
  const updatePokemon1Attack = (attack) => {
    setPokemon1Attack(attack);
  };

  const updatePokemon2Name = (name) => {
    setPokemon2Name(name);
  };
  const updatePokemon2Img = (img) => {
    setPokemon2Img(img);
  };
  const updatePokemon2Life = (life) => {
    setPokemon2Life(life);
  };
  const updatePokemon2Attack = (attack) => {
    setPokemon2Attack(attack);
  };

  const handleStartBattle = () => {
    if (!pokemon1Attack || !pokemon2Attack) {
      alert("Selecciona un Pokémon para ambos lados antes de combatir.");
      return;
    }

    setIsCombatting(true);

    setTimeout(() => {
      const damage1 = Math.floor(Math.random() * 20) + pokemon1Attack;
      const damage2 = Math.floor(Math.random() * 20) + pokemon2Attack;

      setPokemon1Life(pokemon1Life - damage2);
      setPokemon2Life(pokemon2Life - damage1);

      let winnerPokeName = "";
      let winnerPokeImg = null;
      if (pokemon1Life > pokemon2Life) {
        winnerPokeName = pokemon1Name;
        winnerPokeImg = pokemon1Img;
      } else if (pokemon2Life > pokemon1Life) {
        winnerPokeName = pokemon2Name;
        winnerPokeImg = pokemon2Img;
      } else {
        winnerPokeName = "Empate";
      }

      setWinnerName(winnerPokeName);
      setWinnerImg(winnerPokeImg);
    }, 1000);

    setIsCombatting(false);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (winnerName) {
      handleClickOpen();
    }
  }, [winnerName]);

  return (
    <div>
      <Header/>
        <div className={style.battleContainer}>
        <Card
          name={pokemon1Name}
          updateName={updatePokemon1Name}
          img={pokemon1Img}
          updateImg={updatePokemon1Img}
          life={pokemon1Life}
          updateLife={updatePokemon1Life}
          attack={pokemon1Attack}
          updateAttack={updatePokemon1Attack}
        />
        <div className={style.centerContainer}>
          <p>VS</p>
          {isCombatting ? (
            <CircularProgress />
          ) : (
            <Button onClick={handleStartBattle}>Comenzar</Button>
          )}
        </div>
        <Card
          name={pokemon2Name}
          updateName={updatePokemon2Name}
          img={pokemon2Img}
          updateImg={updatePokemon2Img}
          life={pokemon2Life}
          updateLife={updatePokemon2Life}
          attack={pokemon2Attack}
          updateAttack={updatePokemon2Attack}
        />
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={style.dialog}
      >
        <DialogTitle id="alert-dialog-title">Resultado del Combate</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            className={style.winnerInfo}
          >
            {winnerName === "Empate"
              ? "Es un empate."
              : `El ganador es ${winnerName}.`}
            <img className={style.winnerImg} src={winnerImg} alt="" />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
          <Button onClick={handleClose} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;
