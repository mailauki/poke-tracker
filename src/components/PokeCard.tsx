import React from 'react';
import { CircularProgress, Checkbox, IconButton, Chip, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Pokeball from './icons/Pokeball';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
})

interface Props {
  pokemon: {
    name: string, 
    url: string
  }
  number: number
  onCheck: (arg: boolean) => void
  checked: boolean
  onClickMore: (arg: any) => void
}

export default function PokeCard({ pokemon, number, onCheck, checked, onClickMore }: Props) {
  const [sprites, setSprites] = React.useState({back_default: "", front_default: ""})
  const [types, setTypes] = React.useState({ types: [{ slot: 0, type: { name: "", url: "" } }] })
  const [info, setInfo] = React.useState({ 
    name: "", 
    capture_rate: 0, 
    evolution_chain: { url: "" }, 
    generation: { name: "", url: ""},
    habitat: { name: "", url: "" },
    has_gender_difference: false, 
    is_legendary: false, 
    is_mythical: false, 
    types: [{ slot: 0, type: { name: "", url: "" } }], 
    varieties: [{pokemon: {name: "", url: ""}}]
  })
  const [clicked, setClicked] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setClicked(false)

    if(pokemon && pokemon.name !== "") {
      setLoading(true)
      
      fetch(pokemon.url)
      .then((r) => r.json())
      .then((data) => {
        setInfo({ 
          ...info, 
          name: data.name, 
          capture_rate: data.capture_rate, 
          evolution_chain: data.evolution_chain, 
          generation: data.generation,
          habitat: data.habitat,
          has_gender_difference: data.has_gender_difference, 
          is_legendary: data.is_legendary, 
          is_mythical: data.is_mythical, 
          varieties: data.varieties
        })
        fetch(data.varieties[0].pokemon.url)
        .then((r) => r.json())
        .then((data) => {
          setSprites(data.sprites)
          setTypes(data.types)
          setLoading(false)
        })
      })
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

  function handleClick(e: React.MouseEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement
    if(["DIV", "SPAN", "H3", "IMG"].includes(target.tagName)) setClicked(!clicked)
  }

  return (
    <ThemeProvider theme={lightTheme}>
      <div 
        className="PokeCard" 
        onClick={handleClick}
      >
        {!pokemon ? (
          <p>Loading...</p>
        ) : (
          <>
            <Checkbox 
              size="medium"
              icon={<Pokeball />} 
              checkedIcon={<Pokeball />} 
              checked={checked} 
              onChange={() => {
                onCheck(!checked)
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
              <img 
                src={clicked ? sprites.back_default : sprites.front_default} 
                style={{
                  filter: !checked ? "saturate(0) contrast(0)" : "none"
                }} 
              />
            )}
            <div className="info">
              <Typography
                variant="button"
                sx={{
                  textShadow: "0 0 2px #fff, 0 0 4px #fff",
                  filter: !checked ? "opacity(0)" : "none"
                }}
              >
                {pokemon.name}
              </Typography>
              <Chip 
                label={`#${padZero(number)}`} 
                sx={{ 
                  cursor: "pointer", 
                  fontWeight: "bold"
                }} 
              />
            </div>
            <IconButton
              disabled={loading ? true : false}
              onClick={() => {
                // console.log({...info, types, sprites})
                onClickMore({ pokemon: {...info, types, number: number} })
              }}
              sx={{
                zIndex: 3,
                margin: "6px 2px",
                position: "absolute",
                bottom: 0,
                right: 0,
                '&.MuiButtonBase-root': {
                  zIndex: 4
                }
              }}
            >
              <MoreVertIcon fontSize="inherit" />
            </IconButton>
          </>
        )}
      </div>
    </ThemeProvider>
  )
}