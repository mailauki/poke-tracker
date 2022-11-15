import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPokemon } from '../features/pokemon/pokemonSlice';
import PokeCard from './PokeCard';

interface Props {
  url: string
  show: string
  onClickMore: (arg: any) => void
}

export default function Pokedex({ url, show, onClickMore }: Props) {
  const pokemon = useSelector((state) => state.pokemon.entities)
  const loading = useSelector((state) => state.pokemon.status)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchPokemon(url))
  }, [dispatch])

  const filteredPokemon = (() => {
    switch(show) {
      case "collected": {
        pokemon.filter((mon) => mon.checked)
      }
      case "missing": {
        pokemon.filter((mon) => !mon.checked)
      }
      default: {
        pokemon
      }
    }
  })()

  return (
    <div className="Pokemon">
      {loading === "loading" ? (
        <p>Loading...</p>
      ) : (
        <>
          {filteredPokemon.map((mon) => (
            <div>
              <PokeCard 
                pokemon={mon}
                onClickMore={onClickMore}
              />
            </div>
          ))}
        </>
      )}
    </div>
  )
}