import React, { useEffect } from 'react';
import './App.css';
import Pokedex from './components/Pokedex';
// import PokeCard from './components/PokeCard';
import PokeDetail from './components/PokeDetail';
import { TextField, MenuItem, CssBaseline, Typography, Tabs, Tab, Accordion, AccordionSummary, AccordionDetails, IconButton, Tooltip, Divider } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  const [games, setGames] = React.useState([{ name: "", url: "" }])
  const filteredGames = games.filter((game) => game.name !== "xd" && game.name !== "colosseum")
  const [show, setShow] = React.useState("all")
  const [selectGame, setSelectGame] = React.useState("red-blue")
  const [pokedexes, setPokedexes] = React.useState([{ name: "", url: "" }])
  const [loading, setLoading] = React.useState(false)
  const [expanded, setExpanded] = React.useState<string | false>(false)
  const [showDetail, setShowDetail] = React.useState<any | false>(false)

  const handleChange = (
    (panel: string) => (e: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }
  )

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

  function gameTitle(name: string) {
    const nameSplit = name.split("-")
    const insertIndex = Math.round(nameSplit.length / 2)
    if(nameSplit.length >= 2) nameSplit.splice(insertIndex, 0, "&")
    return titleCase(nameSplit.join("-"))
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
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
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
              {filteredGames.map((game) => {
                return (
                  <MenuItem key={game.name} value={game.name} >
                    {gameTitle(game.name)}
                  </MenuItem>
                )
              })}
              <MenuItem key="national" value="national">
                National
              </MenuItem>
            </TextField>
          </div>
          {!showDetail ? (
            <Tabs 
              value={show} 
              onChange={(e: React.SyntheticEvent, newValue: string) => setShow(newValue)}
              centered
              sx={{ 
                borderBottom: 1, 
                borderColor: "divider"
              }}
            >
              <Tab value="all" label="All" />
              <Tab value="collected" label="Collected" />
              <Tab value="missing" label="Missing" />
            </Tabs>
          ) : (
            <Divider sx={{ mt: 1 }} />
          )}
        </div>
        
        <div style={{ display: showDetail ? "flex" : "none", flexDirection: "column" }}>
          <div 
            style={{ 
              height: "fit-content", 
              // marginRight: "10px",
              margin: "10px" 
            }}
          >
            <Tooltip title="Back" arrow>
              <IconButton 
                onClick={() => setShowDetail(false)} 
                size="large"
              >
                <ChevronLeftIcon />
              </IconButton>
            </Tooltip>
          </div>
          {showDetail ? <PokeDetail pokemon={showDetail.pokemon} /> : <></>}
        </div>

        <>
          {!loading ? (
            pokedexes.map((dex) => (
              <div 
                key={dex.name}
                style={{ 
                  width: "calc(100% - 2rem)", 
                  margin: "1rem",
                  display: showDetail ? "none" : ""
                }}
              >
                <Accordion 
                  sx={{ width: "100%" }}
                  expanded={expanded === `pokedex-${dex.name}`} 
                  onChange={handleChange(`pokedex-${dex.name}`)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`pokedex-${dex.name}-content`}
                    id={`pokedex-${dex.name}-header`}
                  >
                    <Typography variant="h5">
                      {titleCase(dex.name)}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {dex.name !== "" ? (
                      <Pokedex url={dex.url} show={show} onClickMore={(clicked) => setShowDetail(clicked)} />
                    ) : (
                      <Typography>Nothing Here</Typography>
                    )}
                  </AccordionDetails>
                </Accordion>
              </div>
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
      </div>
    </ThemeProvider>
  )
}

export default App;
