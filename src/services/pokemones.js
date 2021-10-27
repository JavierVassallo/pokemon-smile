const Pokedex = require("pokeapi-js-wrapper")
const P = new Pokedex.Pokedex()
const obtenerPokemones = async () => {
    
    P.getPokemonsList().then(function(response) {
        console.log(response)
      })
}
export {
    obtenerPokemones
}