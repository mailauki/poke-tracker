import React from 'react';
import './App.css';
import PokeCard from './components/PokeCard';

function App() {
  const [pokemon, setPokemon] = React.useState([{name: "", url: ""}])

  React.useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((r) => r.json())
    .then((data) => {
      setPokemon(data.results)
      console.log(data.results)
    })
  }, [])
  
  return (
    <div className="App">
        <h1>PokeTracker</h1>
        <h2>Kanto</h2>
        <div className="Pokemon">
          {pokemon.map((mon) => <PokeCard pokemon={mon} />)}
        </div>
    </div>
  );
}

export default App;
