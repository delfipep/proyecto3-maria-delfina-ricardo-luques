import React, { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import Header from "../../components/Header/Header";
import { useHistorial } from "../../Context/HistorialContext";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import style from "./Home.module.css";

const Home = () => {
  const { dispatch } = useHistorial();

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

      const updatedPokemon1 = {
        ...pokemon1,
        life: pokemon1.life - damage2,
        damageReceived: damage2,
        damageInflicted: damage1,
      };

      const updatedPokemon2 = {
        ...pokemon2,
        life: pokemon2.life - damage1,
        damageReceived: damage1,
        damageInflicted: damage2,
      };

      setPokemon1(updatedPokemon1);
      setPokemon2(updatedPokemon2);

      let winnerName = "";
      let winnerImg = null;

      if (updatedPokemon1.life > updatedPokemon2.life) {
        winnerName = updatedPokemon1.name;
        winnerImg = updatedPokemon1.img;
      } else if (updatedPokemon2.life > updatedPokemon1.life) {
        winnerName = updatedPokemon2.name;
        winnerImg = updatedPokemon2.img;
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

  const handleSaveToHistorial = () => {
    const newItem = {
      combatants: [
        {
          name: pokemon1.name,
          image: pokemon1.img,
          life: pokemon1.life,
          attack: pokemon1.attack,
          damageReceived: pokemon1.damageReceived,
          damageInflicted: pokemon1.damageInflicted,
        },
        {
          name: pokemon2.name,
          image: pokemon2.img,
          life: pokemon2.life,
          attack: pokemon2.attack,
          damageReceived: pokemon2.damageReceived,
          damageInflicted: pokemon2.damageInflicted,
        },
      ],
      winnerName,
      winnerImage: winnerImg,
    };

    dispatch({ type: "AGREGAR_AL_HISTORIAL", payload: newItem });
    handleClose();
  };

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
            {winnerName === "Empate"
              ? `Es un empate.`
              : `El ganador es ${winnerName}`}
            <img className={style.winnerImg} src={winnerImg} alt="" />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
          <Button onClick={handleSaveToHistorial} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;
