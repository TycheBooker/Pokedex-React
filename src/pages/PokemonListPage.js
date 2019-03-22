import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { loadData, fetchPokemon, apiRoot } from '../utils/fetchUtils';
import { filterLoaded, filterPokemon } from '../utils/pokemonUtils';
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
    this.loadMorePokemon();
    // window.addEventListener('beforeunload', this.saveDataToStorage);
  }

  componentWillUnmount() {
    this.saveDataToStorage();
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
      const myPokemonIds = new Set(localMyPokemon);
      this.setState({ myPokemonIds });
    }
  }

  saveDataToStorage = () => {
    localStorage.setItem('allPokemon', JSON.stringify(this.state.allPokemon));
    localStorage.setItem(
      'myPokemon',
      JSON.stringify(Array.from(this.state.myPokemonIds))
    );
  };

  loadMorePokemon = () => {
    loadData(this.state.nextPageUrl).then(data => {
      this.setState({
        nextPageUrl: data.next,
        pokemonCount: data.count
      });
      const pokemonIds = data.results.map(result => {
        return result.name;
      });
      this.addPokemon(pokemonIds);
    });
  };

  addPokemon(pokemonIds) {
    const newPokemon = filterLoaded(pokemonIds, this.state.allPokemon);
    fetchPokemon(newPokemon).then(allPokemon => {
      this.setState(prevState => ({
        allPokemon: prevState.allPokemon.concat(allPokemon)
      }));
      if (
        this.state.allPokemon.length >= this.state.pokemonCount ||
        !this.state.nextPageUrl
      ) {
        this.setState({ finishedLoading: true });
      }
    });
  }

  toggleMyPokemon = pokemonId => {
    const myPokemon = toggleInSet(this.state.myPokemonIds, pokemonId);
    this.setState({ myPokemon });
  };

  toggleTypeFilter = filter => {
    if (this.state.filter === filter.name) {
      this.setState({ filter: null });
    } else {
      loadData(filter.url).then(data => {
        const pokemonIds = data.pokemon.map(pokemon => {
          return pokemon.pokemon.name;
        });
        this.addPokemon(pokemonIds);
      });

      this.setState({ filter: filter.name });
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

    const showLoadButton = !finishedLoading && activeTab !== 'myPokemon' && !filter;

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
          {showLoadButton && (
            <button className="load-more-button" onClick={this.loadMorePokemon}>
              Load more pokemon
            </button>
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
