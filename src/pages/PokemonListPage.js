import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { loadData } from '../utils/fetchUtils';
import { adaptPokemonData, filterPokemon } from "../utils/pokemonUtils";
import PokemonListItem from '../components/PokemonListItem';

class PokemonListPage extends Component {
  state = {
    allPokemon: [],
    myPokemon: [],
    filters: {
      type: 'flying'
    }
  };

  componentDidMount() {
    const localPokemon = localStorage.getItem('pokemon');
    if (!localPokemon) {
      this.fetchPokemon().then(allPokemon => {
        console.log(allPokemon);
        this.setState({ allPokemon });
        localStorage.setItem('pokemon', JSON.stringify(allPokemon));
      })
    } else {
      this.setState({ allPokemon: JSON.parse(localPokemon) })
    }
  }

  fetchPokemon() {
    return loadData('pokemon').then(async data => {
      const promisedPokemonList = data.results.map(pokemon => {
        return loadData(`pokemon/${pokemon.name}`)
      })
      const fullPokemonList = await Promise.all(promisedPokemonList)
      return adaptPokemonData(fullPokemonList);
    });
  }

  toggleMyPokemon(pokemonId) {
    if (this.state.myPokemon.includes(pokemonId)) {
      this.setState(prevState => ({
        myPokemon: prevState.myPokemon.filter(id => id === pokemonId)
      }));
    } else {
      this.setState(prevState => ({
        myPokemon: prevState.myPokemon.concat(pokemonId)
      }));
    }
  }

  render() {
    const { allPokemon, filters } = this.state;
    const filteredPokemon = filterPokemon(allPokemon, filters);

    return (
      <div>
        {filteredPokemon.map(pokemon => (
          <PokemonListItem key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    );
  }
}

PokemonListPage.propTypes = {
  activeTab: PropTypes.string
};

PokemonListPage.defaultProps = {
  activeTab: 'allPokemon'
};

export default PokemonListPage;
