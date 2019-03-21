import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { capitalize } from '../utils/generalUtils';

const PokemonListItem = props => {
  const { toggleMyPokemon } = props;
  const { name, sprites, id } = props.pokemon;

  return (
    <div>
      <Link to={`/pokemon/${name}`}>
        <h3>{capitalize(name)}</h3>
        <img src={sprites.front_default} alt={`${capitalize(name)}`} />
      </Link>
      <button onClick={() => toggleMyPokemon(id)}>Toggle My Pokemon</button>
    </div>
  );
};

PokemonListItem.propTypes = {
  pokemon: PropTypes.object,
  toggleMyPokemon: PropTypes.func
};

export default PokemonListItem;
