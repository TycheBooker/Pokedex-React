/**
 * Adapts data from api for easier filtering
 * @param {Array} pokemonList
 * @returns {Array}
 */

export function adaptPokemonData(pokemonList) {
  return pokemonList.map(pokemon => {
    pokemon.type = pokemon.types.map(type => {
      return type.type.name;
    });
    return pokemon;
  });
}

/**
 * Filters a list of objects to match all the given filters
 * @param {Array.<Object>} pokemonList
 * @param {Object} filters
 * @returns {Array}
 */

export function filterPokemon(pokemonList, filters) {
  return pokemonList.filter(pokemon => {
    if (Object.keys(filters).length === 0) {
      return true;
    }
    for (const filter in filters) {
      if (!pokemon[filter]) return false;
      if (pokemon[filter] === filters[filter]) {
        return true;
      }
      if (
        Array.isArray(pokemon[filter]) &&
        pokemon[filter].includes(filters[filter])
      ) {
        return true;
      }
    }
    return false;
  });
}
