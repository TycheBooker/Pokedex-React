import React, { Component } from 'react';
import { capitalize } from '../utils/generalUtils';
import { loadData, apiRoot } from '../utils/fetchUtils';
import { adaptPokemonObject } from "../utils/pokemonUtils";
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
      imageSrc: ''
    },
    description: ''
  };

  componentDidMount() {
    const { pokemonId } = this.props.match.params;
    const localPokemon = localStorage.getItem('allPokemon');
    if (!localPokemon) {
      loadData(`${apiRoot}pokemon/${pokemonId}`).then(data => {
        const pokemon = adaptPokemonObject(data);
        this.setState({ pokemon });
      });
    } else {
      const pokemon = JSON.parse(localPokemon).find(pokemon => {
        return pokemon.name === pokemonId;
      });
      this.setState({ pokemon });
    }

    loadData(`${apiRoot}pokemon-species/${pokemonId}`).then(data => {
      const enEntry = data.flavor_text_entries.find(entry => {
        return entry.language.name === 'en';
      });
      this.setState({ description: enEntry.flavor_text });
    });
  }

  render() {
    const {
      name,
      imageSrc,
      types,
      abilities,
      base_experience,
      height,
      weight
    } = this.state.pokemon;
    const { description } = this.state;

    return (
      <div className="pokemon-single">
        <h1>{capitalize(name)}</h1>
        <div className="pokemon-single-heading">
          <img src={imageSrc} alt={`${capitalize(name)}`} />
          <p>{description}</p>
        </div>
        <div className="pokemon-single-stats">
          <p>
          <strong>Base experience:</strong> {base_experience}
          </p>
          <p>
          <strong>Height:</strong> {height}
          </p>
          <p>
          <strong>Weight:</strong> {weight}
          </p>
        </div>
        <SimpleList listTitle="Types:" listItems={types} />
        <SimpleList listTitle="Abilities:" listItems={abilities} />
      </div>
    );
  }
}

export default PokemonSinglePage;
