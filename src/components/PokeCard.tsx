import React from 'react';
import { CircularProgress, Checkbox, IconButton, Chip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Pokeball from './icons/Pokeball';

interface Props {
  pokemon: {
    name: string, 
    url: string
  }
  number: number
  onCheck: (arg: boolean) => void
}

export default function PokeCard({ pokemon, number, onCheck }: Props) {
  const [sprites, setSprites] = React.useState({back_default: "", front_default: ""})
  const [clicked, setClicked] = React.useState(false)
  const [checked, setChecked] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setChecked(false)
    setClicked(false)

    if(pokemon && pokemon.name !== "") {
      setLoading(true)
      
      fetch(pokemon.url)
      .then((r) => r.json())
      .then((data) => {
        fetch(data.varieties[0].pokemon.url)
        .then((r) => r.json())
        .then((data) => {
          setSprites(data.sprites)
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
              setChecked(!checked)
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
            <h3
              style={{
                filter: !checked ? "opacity(0)" : "none"
              }}
            >
              {pokemon.name}
            </h3>
            <Chip label={`#${padZero(number)}`} sx={{ cursor: "pointer" }} />
          </div>
          <IconButton
            onClick={() => console.log("clicked")}
            sx={{
              zIndex: 3,
              margin: "6px",
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
  )
}