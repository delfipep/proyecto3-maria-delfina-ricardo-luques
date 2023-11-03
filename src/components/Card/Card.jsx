import React, { useState } from "react";
import pokemonData from "../../pokemon_data.json";
import pokeball from "../../assets/pokeball.svg";

import style from "./Card.module.css"

const Card = () => {
  const [selectedType, setSelectedType] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState("");

  const types = Array.from(
    new Set(pokemonData.pokemons.flatMap((pokemon) => pokemon.type))
  );

  const handleTypeChange = (event) => {
    const type = event.target.value;
    setSelectedType(type);
    setSelectedPokemon(""); // Reinicia el Pokémon seleccionado cuando cambia el tipo
  };

  const handlePokemonChange = (event) => {
    const pokemonId = event.target.value;
    setSelectedPokemon(pokemonId);
  };

  const filteredPokemons = selectedType
    ? pokemonData.pokemons.filter((pokemon) =>
        pokemon.type.includes(selectedType)
      )
    : [];

  return (
    <div>
      <h3>Selecciona un Pokémon</h3>

      <img
        className={style.pokeImg}
        src={
          selectedPokemon
            ? filteredPokemons.find((pokemon) => pokemon.id === parseInt(selectedPokemon)).image.hires
            : pokeball
        }
        alt="Pokemon"
      />

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
