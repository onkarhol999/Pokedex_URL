
import { Routes ,Route} from "react-router-dom";
import Pokedex from "../components/Pokedex/Pokedex";
import PokemonDeatails from "../components/PokemonDeatails/PokemonDeatails";

function CustomRoutes(){

    return(
       <Routes>
         <Route path="/" element={<Pokedex />}/>
         <Route path="/pokemon/:id" element={<PokemonDeatails />}/>
       </Routes>
    );
}
export default CustomRoutes;