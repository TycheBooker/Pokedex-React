import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { loadData } from '../utils/fetchUtils';
import PokemonListItem from '../components/PokemonListItem';

class PokemonListPage extends Component {
  state = {
    allPokemon: [],
    myPokemon: [],
    filters: {}
  };

  componentDidMount() {
    const localPokemon = localStorage.getItem('pokemon');
    if (!localPokemon) {
      this.fetchPokemon().then(allPokemon => {
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
      return fullPokemonList;
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
    const { allPokemon } = this.state;

    return (
      <div>
        {allPokemon.map(pokemon => (
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
