import React from 'react';

interface Props {
  pokemon: {
    name: string, 
    url: string
  }
  onCheck: Function
}

export default function PokeCard({ pokemon, onCheck }: Props) {
  const [bulbasaur, setBulbasaur] = React.useState({id: 0, name: "", sprites: {back_default: "", front_default: ""}})
  const [clicked, setClicked] = React.useState(false)
  const [checked, setChecked] = React.useState(false)

  React.useEffect(() => {
    if(pokemon) {
      fetch(pokemon.url)
      .then((r) => r.json())
      .then((data) => {
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
    >
      <input 
        type="checkbox" 
        checked={checked} 
        onChange={() => {
          setChecked(!checked)
          onCheck(!checked)
        }} 
        style={{ zIndex: 3, width: "20px", height: "20px" }} 
      />
      <div className="info">
        <p>#{padZero(bulbasaur.id)}</p>
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
      />
    </div>
  )
}