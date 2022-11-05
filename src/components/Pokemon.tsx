import React from 'react';
// import PokeCard from './PokeCard';
import { CircularProgress, Checkbox } from '@mui/material';
import Pokeball from './icons/Pokeball';

interface Props {
  pokemon: {
    name: string, 
    url: string
  }
  show: string
  number: number
}

export default function Pokemon({ pokemon, show, number }: Props) {
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
    if(target.tagName !== "INPUT") setClicked(!clicked) 
  }

  function PokeCard() {
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
              icon={<Pokeball />} 
              checkedIcon={<Pokeball />} 
              checked={checked} 
              onChange={() => {
                setChecked(!checked)
              }} 
              sx={{ 
                zIndex: 3, 
                color: "#ccc", 
                '&.Mui-checked': {
                  color: "#f44336"
                },
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
              <p>#{padZero(number)}</p>
            </div>
          </>
        )}
      </div>
    )
  }

  return (
    <>
      {(() => {
        switch(show) {
          case "collected": {
            return (
              checked ? (
                <PokeCard />
              ) : (
                <></>
              )
            )
          }
          case "missing": {
            return (
              !checked ? (
                <PokeCard />
              ) : (
                <></>
              )
            )
          }
          case "all": {
            return (
              <PokeCard />
            )
          }
        }
      })()}
    </>
  )
}