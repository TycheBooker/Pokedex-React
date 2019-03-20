import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { loadData } from '../utils/fetchUtils';
import PokemonListItem from '../components/PokemonListItem';

class PokemonListPage extends Component {
  state = {
    allPokemon: [],
    myPokemon: []
  };

  componentDidMount() {
    loadData('pokemon').then(data => {
      this.setState({ allPokemon: data.results });
    });
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
