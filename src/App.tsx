import React from 'react';
import './App.css';
import PokeCard from './components/PokeCard';
import Pokemon from './components/Pokemon';

function App() {
  // const [pokemon, setPokemon] = React.useState([{name: "", url: ""}])
  const [games, setGames] = React.useState([{name: "", url: ""}])
  const [show, setShow] = React.useState("all")
  const [selectGame, setSelectGame] = React.useState("national")
  const [showGame, setShowGame] = React.useState({name: "", pokemon_entries: [{entry_number: 0, pokemon_species: {name: "", url: ""}}]})
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    // fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    // .then((r) => r.json())
    // .then((data) => {
    //   setPokemon(data.results)
    // })

    fetch("https://pokeapi.co/api/v2/version-group")
    .then((r) => r.json())
    .then((data) => {
      setGames(data.results)
    })
  }, [])

  React.useEffect(() => {
    setLoading(true)
      
    if(selectGame !== "national") {
      fetch(`https://pokeapi.co/api/v2/version-group/${selectGame}`)
      .then((r) => r.json())
      .then((data) => {
        fetch(data.pokedexes[0].url)
        .then((r) => r.json())
        .then((pokedex) => {
          setShowGame(pokedex)
          setLoading(false)
        })
      })
    } else {
      fetch("https://pokeapi.co/api/v2/pokedex/1")
      .then((r) => r.json())
      .then((pokedex) => {
        setShowGame(pokedex)
        setLoading(false)
      })
    }
  }, [selectGame])

  function ShowFilterInput({name}: {name: string}) {
    const capName = name.charAt(0).toUpperCase() + name.slice(1)

    return (
      <div 
        style={{ 
          display: "flex",
          flexDirection: "row", 
          alignItems: "center" 
        }}
      >
        <label>{capName}</label>
        <input 
          type="radio" 
          value={name}
          checked={show === name ? true : false}
          onChange={(e) => setShow(e.target.value)}
          style={{
            width: "20px",
            height: "20px"
          }}
        />
      </div>
    )
  }

  function handleChangeGame(e: React.ChangeEvent<HTMLSelectElement>) {
    const target = e.target as HTMLSelectElement
    setSelectGame(target.value)
  }

  const regionName = (
    showGame.name.includes("-") ? (
      showGame.name.split("-").map((word) => (
        word.charAt(0).toUpperCase() + word.slice(1)
      )).join(" ")
    ) : (
      showGame.name.charAt(0).toUpperCase() + showGame.name.slice(1)
    )
  ) 
  
  return (
    <div className="App">
      <div className="Header">
        <h1>PokeTracker</h1>
        <select 
          name="games" 
          onChange={handleChangeGame}
          style={{ padding: "6px", margin: "10px", width: "70%" }}
        >
          <option value="national" selected={selectGame === "national" ? true : false}>National</option>
          {games.map((game) => {
            const nameSplit = game.name.split("-")
            const nameInsertAt = Math.round(nameSplit.length / 2)
            if(nameSplit.length >= 2) nameSplit.splice(nameInsertAt, 0, "&")
            const capName = nameSplit.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
            return (
              <option 
                key={game.name}
                value={game.name} 
                selected={selectGame === capName ? true : false}
              >
                {capName}
              </option>
            )
          })}
        </select>
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
          <ShowFilterInput name="missing" />
          <ShowFilterInput name="collected" />
          <ShowFilterInput name="all" />
        </div>
        <h2>{loading ? "Loading..." : regionName}</h2> 
      </div>

      {loading ? (
        <></>
      ) : (
        <>
          <div className="Pokemon">
            {showGame.name !== "" ? (
              showGame.pokemon_entries.map((mon) => (
                <Pokemon 
                  key={mon.entry_number}
                  pokemon={mon.pokemon_species}
                  number={mon.entry_number} 
                  show={show}
                />
              ))
            ) : (
              <></>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
