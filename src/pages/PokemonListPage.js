import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { loadData } from '../utils/fetchUtils';
import { adaptPokemonData, filterPokemon } from '../utils/pokemonUtils';
import PokemonListItem from '../components/PokemonListItem';
import Filters from '../components/Filters';

class PokemonListPage extends Component {
  state = {
    allPokemon: [],
    myPokemonIds: [],
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
      this.setState({ myPokemonIds: JSON.parse(localMyPokemon) });
    }

    window.addEventListener('beforeunload', this.saveDataToStorage);
  }

  componentWillUnmount() {
    this.saveDataToStorage();
    window.removeEventListener('beforeunload', this.saveDataToStorage);
  }

  saveDataToStorage = () => {
    localStorage.setItem('allPokemon', JSON.stringify(this.state.allPokemon));
    localStorage.setItem('myPokemon', JSON.stringify(this.state.myPokemonIds));
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

  toggleMyPokemon = pokemonId => {
    if (this.state.myPokemonIds.includes(pokemonId)) {
      this.setState(prevState => ({
        myPokemonIds: prevState.myPokemonIds.filter(id => id !== pokemonId)
      }));
    } else {
      this.setState(prevState => ({
        myPokemonIds: prevState.myPokemonIds.concat([pokemonId])
      }));
    }
  };

  render() {
    const { activeTab } = this.props;
    const { allPokemon, myPokemonIds, filters } = this.state;
    let filteredPokemon;
    if (activeTab === 'allPokemon') {
      filteredPokemon = filterPokemon(allPokemon, filters);
    } else if (activeTab === 'myPokemon') {
      const myPokemon = allPokemon.filter(pokemon => {
        return myPokemonIds.includes(pokemon.id);
      });
      filteredPokemon = filterPokemon(myPokemon, filters);
    }

    return (
      <div>
        <Filters />
        {filteredPokemon.map(pokemon => (
          <PokemonListItem
            key={pokemon.name}
            pokemon={pokemon}
            toggleMyPokemon={this.toggleMyPokemon}
            myPokemon={myPokemonIds.includes(pokemon.id)}
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
