import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { loadData } from '../utils/fetchUtils';
import { adaptPokemonData, filterPokemon } from '../utils/pokemonUtils';
import PokemonListItem from '../components/PokemonListItem';
import Filters from '../components/Filters';

class PokemonListPage extends Component {
  constructor(props) {
    super(props);
    this.endRef = React.createRef();
    this.apiRoot = 'https://pokeapi.co/api/v2/'
    this.state = {
      allPokemon: [],
      myPokemonIds: [],
      filters: {},
      pokemonCount: 0,
      nextPageUrl: `${this.apiRoot}pokemon`
    };
  }

  componentDidMount() {
    this.getLocalData();
    this.initObserver();
    window.addEventListener('beforeunload', this.saveDataToStorage);
  }

  componentWillUnmount() {
    this.saveDataToStorage();
    this.observer.disconnect();
    window.removeEventListener('beforeunload', this.saveDataToStorage);
  }

  getLocalData() {
    const localAllPokemon = JSON.parse(localStorage.getItem('allPokemon'));
    const localMyPokemon = JSON.parse(localStorage.getItem('myPokemon'));

    if (localAllPokemon && localAllPokemon.length > 0) {
      this.setState({
        allPokemon: localAllPokemon,
        nextPageUrl: `${this.apiRoot}pokemon?offset=${localAllPokemon.length}`
      });
    }

    if (localMyPokemon && localMyPokemon.length > 0) {
      this.setState({ myPokemonIds: localMyPokemon });
    }
  }

  initObserver() {
    this.observer = new IntersectionObserver(this.onIntersection, {
      threshold: [0.1]
    });
    this.observer.observe(this.endRef.current);
  }

  onIntersection = (entries) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio <= 0) {
        return;
      }

      this.fetchPokemon().then(allPokemon => {
        this.setState(prevState => ({
          allPokemon: prevState.allPokemon.concat(allPokemon)
        }));

        if (this.state.allPokemon.length >= this.state.pokemonCount || !this.state.nextPageUrl) {
          this.observer.disconnect();
        }
      });

    });
  };

  saveDataToStorage = () => {
    localStorage.setItem('allPokemon', JSON.stringify(this.state.allPokemon));
    localStorage.setItem('myPokemon', JSON.stringify(this.state.myPokemonIds));
  };

  fetchPokemon() {
    return loadData(this.state.nextPageUrl).then(async data => {
      this.setState({
        nextPageUrl: data.next,
        pokemonCount: data.count
      })
      const promisedPokemonList = data.results.map(pokemon => {
        return loadData(`${this.apiRoot}pokemon/${pokemon.name}`);
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
        <div ref={this.endRef}>Loading</div>
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
