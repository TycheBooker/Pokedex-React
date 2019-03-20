import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const PokemonListItem = props => {
  const {pokemon} = props;
  return (
    <div>
      <Link to={`/pokemon/${pokemon.name}`}>
        <h3>{pokemon.name}</h3>
      </Link>
    </div>
  );
};

PokemonListItem.propTypes = {
  pokemon: PropTypes.object,
};

export default PokemonListItem;