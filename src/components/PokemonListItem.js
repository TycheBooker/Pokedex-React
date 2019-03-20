import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { capitalize } from '../utils/generalUtils';

const PokemonListItem = props => {
  const {name, sprites} = props.pokemon;

  return (
    <div>
      <Link to={`/pokemon/${name}`}>
        <h3>{capitalize(name)}</h3>
        <img src={sprites.front_default} alt={`${capitalize(name)}`} />
      </Link>
    </div>
  );
};

PokemonListItem.propTypes = {
  pokemon: PropTypes.object,
};

export default PokemonListItem;