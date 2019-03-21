import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { loadData } from '../utils/fetchUtils';
import { adaptPokemonData, filterPokemon } from '../utils/pokemonUtils';
import PokemonListItem from '../components/PokemonListItem';
import Filters from '../components/Filters';

class PokemonListPage extends Component {
  state = {
    allPokemon: [],
    myPokemon: [],
    filters: {}
  };

  componentDidMount() {
    const localAllPokemon = localStorage.getItem('allPokemon');
    const localMyPokemon = localStorage.getItem('myPokemon');

    if (!localAllPokemon) {
      this.fetchPokemon().then(allPokemon => {
        this.setState({ allPokemon });
      });
    } else {
      this.setState({ allPokemon: JSON.parse(localAllPokemon) });
    }

    if (localMyPokemon) {
      this.setState({ myPokemon: JSON.parse(localMyPokemon) });
    }
  }

  componentWillUnmount() {
    localStorage.setItem('allPokemon', JSON.stringify(this.state.allPokemon));
    localStorage.setItem('myPokemon', JSON.stringify(this.state.myPokemon));
  }

  fetchPokemon() {
    return loadData('pokemon').then(async data => {
      const promisedPokemonList = data.results.map(pokemon => {
        return loadData(`pokemon/${pokemon.name}`);
      });
      const fullPokemonList = await Promise.all(promisedPokemonList);
      return adaptPokemonData(fullPokemonList);
    });
  }

  toggleMyPokemon = (pokemonId) => {
    if (this.state.myPokemon.includes(pokemonId)) {
      this.setState(prevState => ({
        myPokemon: prevState.myPokemon.filter(id => id !== pokemonId)
      }));
    } else {
      this.setState(prevState => ({
        myPokemon: prevState.myPokemon.concat([pokemonId])
      }));
    }
  }

  render() {
    const { allPokemon, filters } = this.state;
    const filteredPokemon = filterPokemon(allPokemon, filters);

    return (
      <div>
        <Filters />
        {filteredPokemon.map(pokemon => (
          <PokemonListItem
            key={pokemon.name}
            pokemon={pokemon}
            toggleMyPokemon={this.toggleMyPokemon}
          />
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
