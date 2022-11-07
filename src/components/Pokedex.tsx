import React from 'react';
import Pokemon from './Pokemon';

interface Props {
  url: string
  show: string
}

export default function Pokedex({url, show}: Props) {
  const [pokemon, setPokemon] = React.useState([{ entry_number: 0, pokemon_species: { name: "", url: "" } }])
  // const [info, setInfo] = React.useState({name: ""})
  const [showDetail, setShowDetail] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if(url) {
      setLoading(true)

      fetch(url)
      .then((r) => r.json())
      .then((data) => {
        setPokemon(data.pokemon_entries)
        setLoading(false)
      })
    }
  }, [url])

  return (
    <div className="Pokemon">
      {loading ? (
        <p>Loading...</p>
      ) : (
        showDetail ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1>Show Details</h1>
            <button onClick={() => setShowDetail(false)}>Back</button>
          </div>
        ) : (
          pokemon.map((mon) => (
            <Pokemon 
              key={mon.entry_number}
              pokemon={mon.pokemon_species}
              number={mon.entry_number} 
              show={show}
              onClickMore={(clicked) => setShowDetail(clicked)}
            />
          ))
        )
      )}
    </div>
  )
}