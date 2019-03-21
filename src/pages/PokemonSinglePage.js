import React, { Component } from 'react';
import { capitalize } from '../utils/generalUtils';
import { loadData, apiRoot } from '../utils/fetchUtils';
import SimpleList from '../components/SimpleList';

class PokemonSinglePage extends Component {
  state = {
    pokemon: {
      id: '',
      name: '',
      base_experience: 0,
      height: 0,
      weight: 0,
      types: [],
      abilities: [],
      moves: [],
      imageSrc: ''
    }
  };

  componentDidMount() {
    const { pokemonId } = this.props.match.params;
    const localPokemon = localStorage.getItem('allPokemon');
    if (!localPokemon) {
      loadData(`${apiRoot}pokemon/${pokemonId}`).then(data => {
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
    const { name, imageSrc, types } = this.state.pokemon;

    return (
      <div>
        <h1>{capitalize(name)}</h1>
        <img src={imageSrc} alt={`${capitalize(name)}`} />
        <SimpleList listTitle="Types:" listItems= {types}/>
      </div>
    );
  }
}

export default PokemonSinglePage;
