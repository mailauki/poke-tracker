import React from 'react';

interface Props {
  // number: number,
  pokemon: {
    name: string, 
    url: string
  }
}

export default function PokeCard({pokemon}: Props) {
  const [bulbasaur, setBulbasaur] = React.useState({id: 0, name: "", sprites: {back_default: "", front_default: ""}})
  const [clicked, setClicked] = React.useState(false)

  React.useEffect(() => {
    if(pokemon) {
      fetch(pokemon.url)
      .then((r) => r.json())
      .then((data) => {
        // console.log(data)
        setBulbasaur(data)
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

  return (
    <div 
      className="PokeCard" 
      onClick={handleClick}
      style={{backgroundImage: `url(${clicked ? bulbasaur.sprites.back_default : bulbasaur.sprites.front_default})`}}
    >
      <input type="checkbox" style={{zIndex: 2}} />
      <div className="info">
        <p>#{padZero(bulbasaur.id)}</p>
        <h3>{pokemon.name}</h3>
      </div>
    </div>
  )
}