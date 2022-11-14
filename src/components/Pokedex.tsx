import React from 'react';
import Pokemon from './Pokemon';
// import PokeDetail from './PokeDetail';
// import { IconButton, Tooltip } from '@mui/material';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

interface Props {
  url: string
  show: string
  onClickMore: (arg: any) => void
}

export default function Pokedex({ url, show, onClickMore }: Props) {
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
        <>
          {pokemon.map((mon) => (
            <div>
              <Pokemon 
                key={mon.entry_number}
                pokemon={mon.pokemon_species}
                number={mon.entry_number} 
                show={show}
                onClickMore={onClickMore}
              />
            </div>
          ))}
        </>
      )}
    </div>
  )
}