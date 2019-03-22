import { adaptPokemonObject } from "./pokemonUtils";

export const apiRoot = 'https://pokeapi.co/api/v2/'

/**
* Data loader with error handler
* @param {String} url
* @returns {Promise}
*/

export function loadData(path) {
  return fetch(path)
    .then(response => {
      if (response.status !== 200) {
        console.error(
          'Error response from server. Status Code: ' + response.status
        );
        return;
      }

      return response.json()
    })
    .catch(err => {
      console.error('Fetch Error:', err);
    });
}

/**
* Fetch detail view of pokemon from a list
* @param {Array} pokemonIdsList
* @returns {Array}
*/

export async function fetchPokemon(pokemonIdsList) {
  const promisedPokemonList = pokemonIdsList.map(pokemonId => {
    return loadData(`${apiRoot}pokemon/${pokemonId}`);
  });
  const fullPokemonList = await Promise.all(promisedPokemonList);
  const adaptedPokemonList = fullPokemonList.map(pokemon => {
    return adaptPokemonObject(pokemon);
  });
  return adaptedPokemonList;
}
