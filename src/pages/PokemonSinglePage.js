import React, { Component } from 'react';
import { capitalize } from '../utils/generalUtils';
import { loadData } from '../utils/fetchUtils';

class PokemonSinglePage extends Component {
  state = {
    pokemon: {
      name: '',
      height: 0,
      weight: 0,
      abilities: [],
      sprites: {
        front_default: ''
      }
    }
  };

  componentDidMount() {
    const { pokemonId } = this.props.match.params;
    const localPokemon = localStorage.getItem('pokemon');
    if (!localPokemon) {
      loadData(`pokemon/${pokemonId}`).then(data => {
        this.setState({ pokemon: data });
      });
    } else {
      const pokemon = JSON.parse(localPokemon).find(pokemon => {
        return pokemon.name === pokemonId
      });
      this.setState({ pokemon });
    }
  }

  render() {
    const { name, sprites } = this.state.pokemon;

    return (
      <div>
        <h1>{capitalize(name)}</h1>
        <img src={sprites.front_default} alt={`${capitalize(name)}`} />
      </div>
    );
  }
}

export default PokemonSinglePage;
