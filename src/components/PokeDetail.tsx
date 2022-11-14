import React from 'react';
import { CircularProgress, Chip, Typography, Checkbox } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Shiny from './icons/Shiny';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
})

interface Props {
  pokemon?: {
    name: string, 
    capture_rate: number, 
    evolution_chain: { url: string }, 
    generation: { name: string, url: string },
    habitat: { name: string, url: string },
    has_gender_difference: false, 
    is_legendary: false, 
    is_mythical: false, 
    types: [{ slot: number, type: { name: string, url: string } }], 
    varieties: [{ pokemon: { name: string, url: string } }],
    number: number
  }
}

export default function PokeCard({ pokemon }: Props) {
  const [sprites, setSprites] = React.useState({back_default: "", front_default: "", back_shiny: "", front_shiny: ""})
  const [evolution, setEvolution] = React.useState({ 
    chain: { 
      species: { name: "" },
      evolves_to: [{ 
        species: { name: "" }, 
        evolves_to: [{ 
          species: { name: "" },
          evolution_details: [{ 
            trigger: { name: "" } 
          }]  
        }],
        evolution_details: [{ 
          trigger: { name: "" } 
        }] 
      }] 
    } 
  })
  const [clicked, setClicked] = React.useState([""])
  const [checked, setChecked] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if(pokemon && pokemon.varieties[0].pokemon.url !== "") {
      setLoading(true)
      
      fetch(pokemon.varieties[0].pokemon.url)
      .then((r) => r.json())
      .then((data) => {
        setSprites(data.sprites)
        setLoading(false)
      })

      fetch(pokemon.evolution_chain.url)
      .then((r) => r.json())
      .then((data) => setEvolution(data))
    }
  }, [pokemon])

  function padZero(id: number) {
    if(id <= 9) {
      return "00" + id
    }
    else if(id >= 9 && id <= 99) {
      return "0" + id
    }
    else return id
  }

  function evolutionTrigger(evolution_details: object) {
    const filteredEvolutionDetails = Object.entries(evolution_details).filter(([key, value]) => value)
    const trigger = filteredEvolutionDetails.map(([key, value]) => key === "trigger" ? value.name : value).reverse().join(" at ")
    return trigger
  }

  const handleClick = (value: string) => () => {
    const currentIndex = clicked.indexOf(value)
    const newValue = [...clicked]

    if(currentIndex === -1) {
      newValue.push(value)
    } else {
      newValue.splice(currentIndex, 1);
    }

    setClicked(newValue)
  }

  return (
    <ThemeProvider theme={lightTheme}>
      <div 
        className="PokeDetail" 
      >
        {!pokemon ? (
          <p>Loading...</p>
        ) : (
          <>
            <Checkbox 
              size="medium"
              icon={<Shiny />} 
              checkedIcon={<Shiny />} 
              checked={checked} 
              onChange={() => {
                setChecked(!checked)
              }} 
              sx={{ 
                zIndex: 3, 
                color: "#ccc", 
                '&.Mui-checked': { color: "#f44336" },
                margin: "2px",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
            {loading ? (
              <CircularProgress 
                sx={{ 
                  width: "fit-content", 
                  height: "fit-content",
                  margin: "18% auto"
                }} 
              />
            ) : (
              !checked ? (
                <img 
                  src={clicked.indexOf(pokemon.name) !== -1 ? sprites.back_default : sprites.front_default}
                  alt={pokemon.name}
                  onClick={handleClick(pokemon.name)}
                />
              ) : (
                <img 
                  src={clicked.indexOf(`shiny-${pokemon.name}`) !== -1 ? sprites.back_shiny : sprites.front_shiny} 
                  alt={`shiny-${pokemon.name}`}
                  onClick={handleClick(`shiny-${pokemon.name}`)}
                />
              )
            )}
            <div className="info">
              <Chip 
                label={`#${padZero(pokemon.number)}`} 
                sx={{ 
                  cursor: "pointer", 
                  fontWeight: "bold"
                }} 
              />
              <Typography variant="button">
                {pokemon.name}
              </Typography>
              <div 
                style={{ 
                  display: "flex", 
                  gap: "10px", 
                  flexWrap: "wrap" 
                }}
              >
                {pokemon.types.map((type: {type: {name: string}}) => <Chip key={type.type.name} variant="outlined" label={type.type.name} />)}
              </div>
              <div 
                style={{ 
                  display: loading ? "none" : "flex", 
                  alignItems: "center",
                  margin: "5px",
                }}
              >
                <Typography>
                  {evolution.chain.species.name}
                </Typography>
                {evolution.chain.evolves_to.map((evo) => (
                  <>
                    <ArrowRightIcon />
                    <div>
                      <Typography>
                        {evo.species.name}
                      </Typography>
                      <Typography variant="caption">{evolutionTrigger(evo.evolution_details[0])}</Typography>
                    </div>
                    {evo.evolves_to ? (
                      evo.evolves_to.map((evo2) => (
                        <>
                          <ArrowRightIcon />
                          <div>
                            <Typography>
                              {evo2.species.name}
                            </Typography>
                            <Typography variant="caption">
                              {evolutionTrigger(evo2.evolution_details[0])}
                            </Typography>
                          </div>
                        </>
                      )) 
                    ) : (
                    <></>
                    )
                    }
                  </>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  )
}