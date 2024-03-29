import { useEffect, useState } from "react";
import axios from "axios";
import './PokemonList.css'
import Pokemon from "../Pokemon/Pokemon";
function PokemonList(){
    
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
   const [pokedexUrl,setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');
    
   const [nextUrl ,setNextUrl] = useState('');
   const [prevUrl ,setPrevUrl] = useState('');


    async function downloadPokemons(){
        setIsLoading(true);
        const responce = await axios.get(pokedexUrl);//print 20 pokemon
       const pokemonResult = responce.data.results; // we get array of pokemon

       setNextUrl(responce.data.next);
       setPrevUrl(responce.data.previous);
     const pokemonResultPromise  = pokemonResult.map( (pokemon )=>axios.get(pokemon.url));
  
    //  console.log(pokemonResultPromise);
     const pokemonData = await axios.all(pokemonResultPromise);//detail data
    //  console.log(pokemonData);

     const res = pokemonData.map((pokeData) => {
        const pokemon = pokeData.data;
        return {
               id: pokemon.id,
               name : pokemon.name,
                image: pokemon.sprites.other.dream_world.front_default , 
                types: pokemon.types
            }
     })

     console.log(res);
     setPokemonList(res);
     setIsLoading(false);
    }
    useEffect(()=>{
        downloadPokemons();
     },[pokedexUrl]);
     
    return(
        <div className="pokemon-list-wrapper">
          <div className="pokemon-wrapper">
          {(isLoading)? 'Loading..........':
           pokemonList.map((p)=> <Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/>)
          }
          </div>
         <div className="controls">
          <button disabled={prevUrl == null} onClick={()=>setPokedexUrl(prevUrl)}>Prev</button>
          <button disabled={nextUrl == null} onClick={()=>setPokedexUrl(nextUrl)}>Next</button>
         </div>
        </div>
    )
}

export default PokemonList;