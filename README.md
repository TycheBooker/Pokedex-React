A simple Pokedex created in React.
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To start the Pokedex, clone the project, install the dependencies with
`npm install` or `yarn install`
and then start the project with

`npm start` of `yarn start`.

This runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The app uses [PokeApi](https://pokeapi.co/) a free REST api for pokemon data.

Basic functionality:
* view a list of all pokemon - loads 50 by 50 pokemon
* add a pokemon to the "My Pokemon" list by clicking on the Pokeball icon
* view the "My Pokemon" list by switching tabs
* filter pokemon lists by type opening filters and selecting a filter
* view a detailed view of a single pokemon by clicking on every pokemon item
* keeps all pokemon data that the app uses, including a list of flagged pokemon ("My Pokemon") cached in local storage - both to enabled offline functionality and take the pressure off the free api
