import React from 'react';
import './App.css';
import Pokedex from './components/Pokedex';
import { TextField, MenuItem, CssBaseline, Typography, Tabs, Tab } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [games, setGames] = React.useState([{name: "", url: ""}])
  const filteredGames = games.filter((game) => game.name !== "xd" && game.name !== "colosseum")
  const [show, setShow] = React.useState("all")
  const [selectGame, setSelectGame] = React.useState("national")
  const [pokedexes, setPokedexes] = React.useState([{name: "", url: ""}])
  const [loading, setLoading] = React.useState(false)

  function titleCase(title: string) {
    if(title.includes("-")) {
      return title.split("-").map((word) => (
        word === "of" ? (
          word
        ) : (
          word.charAt(0).toUpperCase() + word.slice(1)
        )
      )).join(" ")
    } else {
      return title.charAt(0).toUpperCase() + title.slice(1)
    }
  }

  React.useEffect(() => {
    fetch("https://pokeapi.co/api/v2/version-group")
    .then((r) => r.json())
    .then((data) => {
      setGames(data.results)
    })
  }, [])

  React.useEffect(() => {
    if(selectGame !== "national") {
      setLoading(true)

      fetch(`https://pokeapi.co/api/v2/version-group/${selectGame}`)
      .then((r) => r.json())
      .then((data) => {
        setPokedexes(data.pokedexes)
        setLoading(false)
      })
    } else {
      setPokedexes([{ name: "national", url: "https://pokeapi.co/api/v2/pokedex/1" }])
    }
  }, [selectGame])

  function handleChangeGame(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectGame(e.target.value)
  }
  
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
        </div>
      </ThemeProvider>

      <>
        {!loading ? (
          pokedexes.map((dex) => (
            <>
              <Typography 
                variant="h5"
                component="div"
                sx={{ margin: 1 }}
              >
                {titleCase(dex.name)}
              </Typography>
              <Pokedex url={dex.url} show={show} />
            </>
          ))
        ) : (
          <Typography 
            variant="h5"
            component="div"
            sx={{ margin: 1 }}
          >
            Loading...
          </Typography>
        )}
      </>

      {loading ? (
        <></>
      ) : (
        <>
          {/* <div className="Pokemon">
            {showPokedex.name !== "" ? (
              showPokedex.pokemon_entries.map((mon) => (
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
          </div> */}
        </>
      )}
    </div>
  );
}

export default App;
