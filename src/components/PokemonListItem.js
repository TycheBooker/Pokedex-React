import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { capitalize } from '../utils/generalUtils';
import { ReactComponent as Pokeball } from '../img/pokeball.svg';

const PokemonListItem = props => {
  const { toggleMyPokemon, myPokemon } = props;
  const { name, imageSrc, id, types } = props.pokemon;

  return (
    <div className="pokemon-list-item">
      <Link to={`/pokemon/${name}`}>
        <h3>
          #{id} {capitalize(name)}
        </h3>
        <img src={imageSrc} alt={`${capitalize(name)}`} />
      </Link>
      <div>
        <button
          className={`pokeball-button ${myPokemon ? 'active' : ''}`}
          onClick={() => toggleMyPokemon(id)}
        >
          <Pokeball width="20px" height="20px" />
        </button>
        <div className="pokemon-types">
          {types.map(type => (
            <span key={type}>{type}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

PokemonListItem.propTypes = {
  pokemon: PropTypes.object,
  toggleMyPokemon: PropTypes.func,
  myPokemon: PropTypes.bool
};

export default PokemonListItem;
