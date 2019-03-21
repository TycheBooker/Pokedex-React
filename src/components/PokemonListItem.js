import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { capitalize } from '../utils/generalUtils';

const PokemonListItem = props => {
  const { toggleMyPokemon, myPokemon } = props;
  const { name, imageSrc, id } = props.pokemon;

  return (
    <div>
      <Link to={`/pokemon/${name}`}>
        <h3>{capitalize(name)}</h3>
        <img src={imageSrc} alt={`${capitalize(name)}`} />
      </Link>
      <button
        className={myPokemon ? 'red' : ''}
        onClick={() => toggleMyPokemon(id)}
      >
        Toggle My Pokemon
      </button>
    </div>
  );
};

PokemonListItem.propTypes = {
  pokemon: PropTypes.object,
  toggleMyPokemon: PropTypes.func,
  myPokemon: PropTypes.bool,
};

export default PokemonListItem;
