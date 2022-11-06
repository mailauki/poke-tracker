import React from 'react';
import Pokemon from './Pokemon';

interface Props {
  url: string
  show: string
}

export default function Pokedex({url, show}: Props) {
  const [pokemon, setPokemon] = React.useState([{ entry_number: 0, pokemon_species: { name: "", url: "" } }])
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
        pokemon.map((mon) => (
          <Pokemon 
            key={mon.entry_number}
            pokemon={mon.pokemon_species}
            number={mon.entry_number} 
            show={show}
          />
        ))
      )}
    </div>
  )
}