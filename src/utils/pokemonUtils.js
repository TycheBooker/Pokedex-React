/**
 * Adapts data from api for easier filtering and lighter storage
 * @param {Array} pokemonList
 * @returns {Array}
 */

export function adaptPokemonData(pokemonList) {
  return pokemonList.map(pokemon => {
    return {
      id: pokemon.id,
      name: pokemon.name,
      base_experience: pokemon.name.base_experience,
      height: pokemon.height,
      weight: pokemon.weight,
      types: pokemon.types.map(type => {
        return type.type.name;
      }),
      abilities: pokemon.abilities.map(ability => {
        return ability.ability.name;
      }),
      imageSrc: pokemon.sprites.front_default
    };
  });
}

/**
 * Filters pokemon by type
 * @param {Array.<Object>} pokemonList
 * @param {Set} filters
 * @returns {Array}
 */

export function filterPokemon(pokemonList, activeFilter) {
  if (!activeFilter) return pokemonList;
  return pokemonList.filter(pokemon =>  {
    return pokemon.types.includes(activeFilter);
  })
}
