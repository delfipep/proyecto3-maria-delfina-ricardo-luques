import React, { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
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
  
  const [pokemon1Life, setPokemon1Life] = useState(0);
  const [pokemon2Life, setPokemon2Life] = useState(0);

  const [pokemon1Attack, setPokemon1Attack] = useState(0);
  const [pokemon2Attack, setPokemon2Attack] = useState(0);

  const [isCombatting, setIsCombatting] = useState(false);
  const [winner, setWinner] = useState(null);

  const updatePokemon1Name = (name) => {
    setPokemon1Name(name);
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

      let winnerName = "";
      if (pokemon1Life > pokemon2Life) {
        winnerName = pokemon1Name;
      } else if (pokemon2Life > pokemon1Life) {
        winnerName = pokemon2Name;
      } else {
        winnerName = "Empate";
      }

      setWinner(winnerName);
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
    if (winner) {
      handleClickOpen();
    }
  }, [winner]);

  return (
    <div>
      <h1>Duelo Pokemon</h1>

      <div className={style.battleContainer}>
        <Card
          name={pokemon1Name}
          updateName={updatePokemon1Name}
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
      >
        <DialogTitle id="alert-dialog-title">Resultado del Combate</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {winner === "Empate" ? "Es un empate." : `El ganador es ${winner}.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;
