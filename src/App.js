import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './components/Header';
import Homepage from "./pages/Homepage";
import PokemonListPage from "./pages/PokemonListPage";
import PokemonSinglePage from './pages/PokemonSinglePage';

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Route path="/" exact component={Homepage} />
        <Route path="/pokemon/" component={PokemonListPage} />
        <Route path="/my-pokemon/" render={(routeProps) => (
          <PokemonListPage {...routeProps} activeTab={"myPokemon"} />
        )} />
        <Route path="/pokemon/:pokemonId" component={PokemonSinglePage} />
      </Router>
    );
  }
}

export default App;
