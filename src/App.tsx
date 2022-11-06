import React from 'react';
import './App.css';
import PokeCard from './components/PokeCard';
import Pokemon from './components/Pokemon';
import { TextField, MenuItem, FormControl, FormControlLabel, RadioGroup, Radio, CssBaseline, Typography, Divider, Tabs, Tab, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  // const [pokemon, setPokemon] = React.useState([{name: "", url: ""}])
  const [games, setGames] = React.useState([{name: "", url: ""}])
  const filteredGames = games.filter((game) => game.name !== "xd" && game.name !== "colosseum")
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

  function handleChangeGame(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectGame(e.target.value)
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
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="Header">
          <Typography 
            variant="h4"
            component="div"
            sx={{ margin: 2 }}
          >
            PokeTracker
          </Typography>
          <div style={{ width: "70%", margin: "0 auto" }}>
            <TextField 
              id="select-game"
              select
              label="Pokedex"
              value={selectGame}
              onChange={handleChangeGame}
              helperText="Select a game to view it's pokedex"
              fullWidth
              size="small"
            >
              <MenuItem key="national" value="national">
                National
              </MenuItem>
              {filteredGames.map((game) => {
                const nameSplit = game.name.split("-")
                const nameInsertAt = Math.round(nameSplit.length / 2)
                if(nameSplit.length >= 2) nameSplit.splice(nameInsertAt, 0, "&")
                const capName = nameSplit.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")

                return (
                  <MenuItem key={game.name} value={game.name} >
                    {capName}
                  </MenuItem>
                )
              })}
            </TextField>
          </div>
          {/* <FormControl>
            <RadioGroup
              row
              aria-labelledby="collection-filter"
              name="collection-filter"
              value={show}
              onChange={(e) => setShow(e.target.value)}
            >
              <FormControlLabel value="missing" control={<Radio />} label="Missing" />
              <FormControlLabel value="collected" control={<Radio />} label="Collected" />
              <FormControlLabel value="all" control={<Radio />} label="All" />
            </RadioGroup>
          </FormControl> */}
          <Tabs 
            value={show} 
            onChange={(e: React.SyntheticEvent, newValue: string) => setShow(newValue)}
            centered
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Tab value="all" label="All" />
            <Tab value="collected" label="Collected" />
            <Tab value="missing" label="Missing" />
          </Tabs>
          <Typography 
            variant="h5"
            component="div"
            sx={{ margin: 1 }}
          >
            {loading ? "Loading..." : regionName}
          </Typography> 
        </div>
      </ThemeProvider>

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
