import React from "react";
import style from "./HistorialItem.module.css";

const HistorialItem = ({ item }) => {
  if (!item) {
    return null; // Maneja el caso donde `item` es nulo
  }

  const { combatants, winnerName } = item;

  return (
    <div className={style.itemContainer}>
      <div className={style.itemHeight}>
        <p className={style.versus}>VS</p>
        <div className={style.battleInfo}>
          {combatants &&
            combatants.map((combatant, index) => (
              <div key={index} className={style.combatantInfo}>
                <div>
                  {index === 1 ? (
                    <div>
                      <p className={style.combatantNames}>Perdedor:</p>
                      <h4 className={style.pokeName}>{combatant.name}</h4>
                    </div>
                  ) : (
                    <div>
                      <p className={style.combatantNames}>Ganador:</p>
                      <h4 className={style.pokeName}>{combatant.name}</h4>
                    </div>
                  )}
                  <img src={combatant.image} alt={combatant.name} />
                </div>
                <div className={style.battleStats}>
                  <span>Vida: {combatant.life}</span>
                  <span>Ataque: {combatant.attack}</span>
                  <span>Daño Recibido: {combatant.damageReceived}</span>
                  <span>Daño Infligido: {combatant.damageInflicted}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HistorialItem;
