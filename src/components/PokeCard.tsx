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
        console.log(data)
        // setBulbasaur({number: data.order, name: data.name, sprites: data.sprites})
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

  return (
    <div 
      className="PokeCard" 
      onClick={() => setClicked(!clicked)}
      style={{backgroundImage: `url(${clicked ? bulbasaur.sprites.back_default : bulbasaur.sprites.front_default})`}}
    >
      {/* <img src={clicked ? bulbasaur.sprites.back_default : bulbasaur.sprites.front_default} alt={bulbasaur.name} /> */}
      {/* <img src={bulbasaur.sprites.front_default ? bulbasaur.sprites.front_default: ""} alt={bulbasaur.name} /> */}
      <p>#{padZero(bulbasaur.id)}</p>
      <h3>{pokemon.name}</h3>
    </div>
  )
}