import React from 'react';
// import PokeCard from './PokeCard';
import { CircularProgress } from '@mui/material';

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
      
      // fetch(pokemon.url)
      // .then((r) => r.json())
      // .then((data) => {
      //   fetch(data.varieties[0].pokemon.url)
      //   .then((r) => r.json())
      //   .then((data) => {
      //     setSprites(data.sprites)
      //     setLoading(false)
      //   })
      // })

      // fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      // .then((r) => r.json())
      // .then((data) => {
      //   setSprites(data.sprites)
      //   setLoading(false)
      // })
      // .catch((err) => console.log("error"))

      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      .then((r) => {
        if(r.ok) {
          r.json().then((data) => {
            setSprites(data.sprites)
            setLoading(false)
          })
        } else {
          r.json().then((err) => console.log(err))
        }
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
            <input 
              type="checkbox" 
              checked={checked} 
              onChange={() => {
                setChecked(!checked)
              }} 
              style={{ zIndex: 3, width: "20px", height: "20px" }} 
            />
            {loading ? (
              <CircularProgress 
                sx={{ 
                  width: "fit-content", 
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto"
                }} 
              />
            ) : (
              <img 
                src={clicked ? sprites.back_default : sprites.front_default} 
                style={{
                  filter: !checked ? "saturate(0) contrast(0)" : "none"
                }} 
                // loading="lazy"
              />
            )}
            <div className="info">
              <p>#{padZero(number)}</p>
              <h3
                style={{
                  filter: !checked ? "opacity(0)" : "none"
                }}
              >
                {pokemon.name}
              </h3>
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