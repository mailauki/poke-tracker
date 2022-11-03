import React from 'react';
import './App.css';
import PokeCard from './components/PokeCard';
import Pokemon from './components/Pokemon';

function App() {
  const [pokemon, setPokemon] = React.useState([{name: "", url: ""}])
  const [showCollected, setShowCollected] = React.useState(false)
  const [showMissing, setShowMissing] = React.useState(false)
  const [show, setShow] = React.useState("all")

  React.useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((r) => r.json())
    .then((data) => {
      setPokemon(data.results)
    })
  }, [])
  
  return (
    <div className="App">
        <h1>PokeTracker</h1>
          <h2>Kanto</h2>
        <div 
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            alignItems: "center"
          }}
        >
          {/* <div 
            style={{ 
              display: "flex",
              flexDirection: "row", 
              alignItems: "center" 
            }}
          >
            <label>Show Collecked: </label>
            <input 
              type="checkbox" 
              checked={showCollected} 
              onChange={() => setShowCollected(!showCollected)} 
              style={{
                width: "20px",
                height: "20px"
              }}
            />
          </div> */}
          <div 
            style={{ 
              display: "flex",
              flexDirection: "row", 
              alignItems: "center" 
            }}
          >
            <label>Missing </label>
            <input 
              type="radio" 
              value="missing"
              checked={show === "missing" ? true : false}
              onChange={(e) => setShow(e.target.value)}
              style={{
                width: "20px",
                height: "20px"
              }}
            />
          </div>
          <div 
            style={{ 
              display: "flex",
              flexDirection: "row", 
              alignItems: "center" 
            }}
          >
            <label>Collected </label>
            <input 
              type="radio" 
              value="collected"
              checked={show === "collected" ? true : false}
              onChange={(e) => setShow(e.target.value)}
              style={{
                width: "20px",
                height: "20px"
              }}
            />
          </div>
          <div 
            style={{ 
              display: "flex",
              flexDirection: "row", 
              alignItems: "center" 
            }}
          >
            <label>All </label>
            <input 
              type="radio" 
              value="all"
              checked={show === "all" ? true : false}
              onChange={(e) => setShow(e.target.value)}
              style={{
                width: "20px",
                height: "20px"
              }}
            />
          </div>
        </div>
        <div className="Pokemon">
          {pokemon.map((mon) => <Pokemon key={mon.name} pokemon={mon} show={show} />)}
        </div>
    </div>
  );
}

export default App;
