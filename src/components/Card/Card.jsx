import React, { useState } from "react";
import pokemonData from "../../pokemon_data.json";
import pokeball from "../../assets/pokeball.svg";

import style from "./Card.module.css";

const Card = (props) => {
  const [selectedType, setSelectedType] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState("");

  const types = Array.from(
    new Set(pokemonData.pokemons.flatMap((pokemon) => pokemon.type))
  );

  const handleTypeChange = (event) => {
    const type = event.target.value;
    setSelectedType(type);
    setSelectedPokemon("");
  };

  const handlePokemonChange = (event) => {
    const pokemonId = event.target.value;
    const selectedPokemonData = filteredPokemons.find(
      (pokemon) => pokemon.id === parseInt(pokemonId)
    );

    setSelectedPokemon(selectedPokemonData ? selectedPokemonData.id : null);

    // Actualiza el ataque utilizando la función de actualización
    if (selectedPokemonData) {
      props.updatePokemon(
        selectedPokemonData.name.english,
        selectedPokemonData.image.hires,
        selectedPokemonData.base.HP,
        selectedPokemonData.base.Attack
      );
    } else {
      props.updatePokemon("", null, 0, 0); // Establece el ataque y la vida en 0 si no se selecciona ningún Pokémon
    }
  };

  const filteredPokemons = selectedType
    ? pokemonData.pokemons.filter((pokemon) =>
        pokemon.type.includes(selectedType)
      )
    : [];

  return (
    <div>
      <h3>{selectedPokemon ? props.pokemon.name : "Selecciona un Pokémon"}</h3>

      <div className={style.imgContainer}>
        <img
          className={style.pokeImg}
          src={selectedPokemon ? props.pokemon.img : pokeball}
          alt="Pokemon"
        />

        <div className={style.pokeInfo}>
          <div className={style.pokeStats}>
            <div>
              <h3>{selectedPokemon ? props.pokemon.attack : "-"}</h3>
              <p>Atk</p>
            </div>

            <div>
              <h3>
                {selectedPokemon
                  ? filteredPokemons.find(
                      (pokemon) => pokemon.id === parseInt(selectedPokemon)
                    ).base.Defense
                  : "-"}
              </h3>
              <p>Def</p>
            </div>

            <div>
              <h3>
                {selectedPokemon
                  ? filteredPokemons.find(
                      (pokemon) => pokemon.id === parseInt(selectedPokemon)
                    ).base.Speed
                  : "-"}
              </h3>
              <p>Spd</p>
            </div>
          </div>

          <div className={style.lifeContainer}>HP: {props.pokemon.life}</div>
        </div>
      </div>

      <div className={style.selectContainer}>
        <select
          placeholder="Selecciona un tipo"
          name="tipo"
          id="tipo"
          onChange={handleTypeChange}
          value={selectedType}
        >
          <option value="">Selecciona un tipo</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          placeholder="Selecciona el Pokémon"
          name="pokemon"
          id="pokemon"
          onChange={handlePokemonChange}
          value={selectedPokemon}
        >
          <option value="">Selecciona el Pokémon</option>
          {filteredPokemons.map((pokemon) => (
            <option key={pokemon.id} value={pokemon.id}>
              {pokemon.name.english}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Card;
