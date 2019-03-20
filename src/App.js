import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './components/Header';
import Homepage from "./pages/Homepage";
import PokemonListPage from "./pages/PokemonListPage";
import PokemonSinglePage from './pages/PokemonSinglePage';

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/pokemon" exact component={PokemonListPage} />
          <Route path="/my-pokemon" render={(routeProps) => (
            <PokemonListPage {...routeProps} activeTab={"myPokemon"} />
          )} />
          <Route path="/pokemon/:pokemonId" component={PokemonSinglePage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
