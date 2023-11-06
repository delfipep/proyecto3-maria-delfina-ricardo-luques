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
  const initialPokemonState = {
    name: "",
    img: null,
    life: 0,
    attack: 0,
  };

  const [pokemon1, setPokemon1] = useState({ ...initialPokemonState });
  const [pokemon2, setPokemon2] = useState({ ...initialPokemonState });

  const [isCombatting, setIsCombatting] = useState(false);
  const [winnerName, setWinnerName] = useState(null);
  const [winnerImg, setWinnerImg] = useState(null);

  const updatePokemon = (pokemon, name, img, life, attack) => {
    pokemon.name = name;
    pokemon.img = img;
    pokemon.life = life;
    pokemon.attack = attack;
  };

  const handleStartBattle = () => {
    if (!pokemon1.attack || !pokemon2.attack) {
      alert("Selecciona un Pokémon para ambos lados antes de combatir.");
      return;
    }

    setIsCombatting(true);

    setTimeout(() => {
      const damage1 = Math.floor(Math.random() * 20) + pokemon1.attack;
      const damage2 = Math.floor(Math.random() * 20) + pokemon2.attack;

      updatePokemon(
        pokemon1,
        pokemon1.name,
        pokemon1.img,
        pokemon1.life - damage2,
        pokemon1.attack
      );
      updatePokemon(
        pokemon2,
        pokemon2.name,
        pokemon2.img,
        pokemon2.life - damage1,
        pokemon2.attack
      );

      let winnerName = "";
      let winnerImg = null;

      if (pokemon1.life > pokemon2.life) {
        winnerName = pokemon1.name;
        winnerImg = pokemon1.img;
      } else if (pokemon2.life > pokemon1.life) {
        winnerName = pokemon2.name;
        winnerImg = pokemon2.img;
      } else {
        winnerName = "Empate";
      }

      setWinnerName(winnerName);
      setWinnerImg(winnerImg);
      setIsCombatting(false);
    }, 1000);
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
      <Header />
      <div className={style.battleContainer}>
        <Card
          pokemon={pokemon1}
          updatePokemon={(name, img, life, attack) =>
            updatePokemon(pokemon1, name, img, life, attack)
          }
        />
        <div className={style.centerContainer}>
          <p>VS</p>
          {isCombatting ? (
            <CircularProgress className={style.circularProgress} />
          ) : (
            <Button onClick={handleStartBattle}>Comenzar</Button>
          )}
        </div>
        <Card
          pokemon={pokemon2}
          updatePokemon={(name, img, life, attack) =>
            updatePokemon(pokemon2, name, img, life, attack)
          }
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
            {winnerName === "Empate" ? (
              <p>Es un empate.</p>
            ) : (
              <p>El ganador es {winnerName}</p>
            )}
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
