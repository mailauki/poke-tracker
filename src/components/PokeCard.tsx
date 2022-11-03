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
  const [checked, setChecked] = React.useState(false)

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
      // style={{backgroundImage: `url(${clicked ? bulbasaur.sprites.back_default : bulbasaur.sprites.front_default})`}}
      // style={{backgroundImage: `url(${bulbasaur.sprites.front_default})`, filter: "saturate(0) contrast(0)"}}
      // style={{
      //   maskImage: `url(${bulbasaur.sprites.front_default})`, 
      //   WebkitMaskImage: `url(${bulbasaur.sprites.front_default})`, 
      //   maskSize: "70%", 
      //   WebkitMaskSize: "70%", 
      //   maskRepeat: "no-repeat",
      //   WebkitMaskRepeat: "no-repeat",
      //   maskType: "alpha"
      // }}
    >
      {/* <div
        style={{
          width: "100%",
          backgroundColor: "#ccc",
          maskImage: `url(${bulbasaur.sprites.front_default})`, 
          WebkitMaskImage: `url(${bulbasaur.sprites.front_default})`, 
          maskSize: "70%", 
          WebkitMaskSize: "70%", 
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskType: "alpha"
        }}
      > */}
        <input type="checkbox" style={{zIndex: 2}} checked={checked} onChange={() => setChecked(!checked)} />
        <img 
          src={clicked ? bulbasaur.sprites.back_default : bulbasaur.sprites.front_default} 
          style={{
            filter: !checked ? "saturate(0) contrast(0)" : "none"
          }} 
        />
        <div className="info">
          <p>#{padZero(bulbasaur.id)}</p>
          <h3
            style={{
              filter: !checked ? "opacity(0)" : "none"
            }}
          >{pokemon.name}</h3>
        </div>
      {/* </div> */}
    </div>
  )
}