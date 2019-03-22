import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { loadData, apiRoot } from '../utils/fetchUtils';
import { adaptPokemonData, filterPokemon } from '../utils/pokemonUtils';
import { toggleInSet } from '../utils/generalUtils';
import PokemonListItem from '../components/PokemonListItem';
import Filters from '../components/Filters';

class PokemonListPage extends Component {
  constructor(props) {
    super(props);
    this.endRef = React.createRef();
    this.state = {
      allPokemon: [],
      myPokemonIds: new Set(),
      filter: null,
      pokemonCount: 0,
      nextPageUrl: `${apiRoot}pokemon?limit=50`,
      finishedLoading: false
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
        nextPageUrl: `${apiRoot}pokemon?offset=${
          localAllPokemon.length
        }&limit=50`
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

  onIntersection = entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio <= 0) {
        return;
      }

      this.fetchPokemon().then(allPokemon => {
        this.setState(prevState => ({
          allPokemon: prevState.allPokemon.concat(allPokemon)
        }));

        if (
          this.state.allPokemon.length >= this.state.pokemonCount ||
          !this.state.nextPageUrl
        ) {
          this.observer.disconnect();
          this.setState({ finishedLoading: true });
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
      });
      const promisedPokemonList = data.results.map(pokemon => {
        return loadData(`${apiRoot}pokemon/${pokemon.name}`);
      });
      const fullPokemonList = await Promise.all(promisedPokemonList);
      return adaptPokemonData(fullPokemonList);
    });
  }

  toggleMyPokemon = pokemonId => {
    const myPokemon = toggleInSet(this.state.myPokemonIds, pokemonId);
    this.setState({ myPokemon });
  };

  toggleTypeFilter = filter => {
    if (this.state.filter === filter) {
      this.setState({ filter: null });
    } else {
      this.setState({ filter });
    }
  };

  render() {
    const { activeTab } = this.props;
    const { allPokemon, myPokemonIds, filter, finishedLoading } = this.state;

    let filteredPokemon;
    if (activeTab === 'allPokemon') {
      filteredPokemon = filterPokemon(allPokemon, filter);
    } else if (activeTab === 'myPokemon') {
      const myPokemon = allPokemon.filter(pokemon => {
        return myPokemonIds.has(pokemon.id);
      });
      filteredPokemon = filterPokemon(myPokemon, filter);
    }

    return (
      <div>
        <Filters toggleFilter={this.toggleTypeFilter} activeFilter={filter} />
        <div className="pokemon-list">
          {filteredPokemon.map(pokemon => (
            <PokemonListItem
              key={pokemon.name}
              pokemon={pokemon}
              toggleMyPokemon={this.toggleMyPokemon}
              myPokemon={myPokemonIds.has(pokemon.id)}
            />
          ))}
          {!finishedLoading && (
            <div ref={this.endRef}>Loading more pokemon...</div>
          )}
        </div>
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
