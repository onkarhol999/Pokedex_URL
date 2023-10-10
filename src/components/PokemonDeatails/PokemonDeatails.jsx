import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './PokemonDeatails.css'


function PokemonDeatails() {
  const { id } = useParams();
  const [Pokemon, setPokemon] = useState({}); // Initialize Pokemon state as an empty object

  async function downloadPokemon() {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    setPokemon({
      name: response.data.name,
      image: response.data.sprites.other.dream_world.front_default,
      weight: response.data.weight,
      height: response.data.height,
      types: response.data.types.map((t) => t.type.name),
    });
  }

  useEffect(() => {
    downloadPokemon();
  }, [id]); // Include 'id' as a dependency so that the effect re-runs when 'id' changes

  return (
    <div className="pokemon-details-wrapper">
        <img className="pokemon-image" src={Pokemon.image} alt={Pokemon.name} />
      <div className="pokemon-name"> <span> {Pokemon.name}</span></div>
    
      <div className="pokemon-name">Height: {Pokemon.height}</div>
      <div className="pokemon-name">Weight: {Pokemon.weight}</div>
      <div className="pokemon-types">Type : {Pokemon.types && Pokemon.types.map((t) => <div key={t}> {t} </div>)}
      </div>
    </div>
  );
}

export default PokemonDeatails;
