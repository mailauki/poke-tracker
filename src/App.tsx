import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [pokemon, setPokemon] = React.useState([{name: "", url: ""}])
  const [bulbasaur, setBulbasaur] = React.useState({id: 0, name: "", sprites: {back_default: "", front_default: ""}})
  const [clicked, setClicked] = React.useState(false)

  React.useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
    .then((r) => r.json())
    .then((data) => {
      setPokemon(data.results)
    })
  }, [])

  React.useEffect(() => {
    if(pokemon) {
      fetch(pokemon[0].url)
      .then((r) => r.json())
      .then((data) => {
        console.log(data)
        setBulbasaur({id: data.id, name: data.name, sprites: data.sprites})
      })
    }
  }, [pokemon])

  function padZero(id: number) {
    if(id < 9) {
      return "00" + id
    }
    else if(id > 9 && id < 99) {
      return "0" + id
    }
    else return id
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>PokeTracker</h1>
        <div className="bulbasaur" onClick={() => setClicked(!clicked)}>
          <img src={clicked ? bulbasaur.sprites.back_default : bulbasaur.sprites.front_default} alt={bulbasaur.name} />
          <p>#{padZero(bulbasaur.id)}</p>
          <h3>{bulbasaur.name}</h3>
        </div>
      </header>
    </div>
  );
}

export default App;
