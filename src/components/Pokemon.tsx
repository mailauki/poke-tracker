import React from 'react';
// import PokeCard from './PokeCard';

interface Props {
  pokemon: {
    name: string, 
    url: string
  }
  show: string
  number: number
}

export default function Pokemon({ pokemon, show, number }: Props) {
  const [bulbasaur, setBulbasaur] = React.useState({name: "", sprites: {back_default: "", front_default: ""}})
  const [clicked, setClicked] = React.useState(false)
  const [checked, setChecked] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setChecked(false)
    setClicked(false)

    if(pokemon) {
      setLoading(true)

      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      .then((r) => r.json())
      .then((data) => {
        setBulbasaur(data)
        setLoading(false)
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
        {loading ? (
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
            <img 
              src={clicked ? bulbasaur.sprites.back_default : bulbasaur.sprites.front_default} 
              style={{
                filter: !checked ? "saturate(0) contrast(0)" : "none"
              }} 
              loading="lazy"
            />
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