import React from 'react';
import PokeCard from './PokeCard';

interface Props {
  pokemon: {
    name: string, 
    url: string
  }
  show: string
  number: number
  onClickMore: (arg: any) => void
}

export default function Pokemon({ pokemon, show, number, onClickMore }: Props) {
  const [checked, setChecked] = React.useState({entry_number: number, pokemon_species: {...pokemon}, checked: false})

  return (
    <>
      {(() => {
        switch(show) {
          case "collected": {
            return (
              checked ? (
                <PokeCard 
                  pokemon={pokemon} 
                  number={number} 
                  onCheck={(check) => setChecked(check)}
                  checked={checked.checked}
                  onClickMore={onClickMore}
                />
              ) : (
                <></>
              )
            )
          }
          case "missing": {
            return (
              !checked ? (
                <PokeCard 
                  pokemon={pokemon} 
                  number={number} 
                  onCheck={(check) => setChecked(check)}
                  checked={checked.checked}
                  onClickMore={onClickMore}
                />
              ) : (
                <></>
              )
            )
          }
          case "all": {
            return (
              <PokeCard 
                pokemon={pokemon} 
                number={number} 
                onCheck={(check) => setChecked(check)}
                checked={checked.checked}
                onClickMore={onClickMore}
              />
            )
          }
        }
      })()}
    </>
  )
}