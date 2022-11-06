import React from 'react';
import PokeCard from './PokeCard';

interface Props {
  pokemon: {
    name: string, 
    url: string
  }
  show: string
  number: number
}

export default function Pokemon({ pokemon, show, number }: Props) {
  const [checked, setChecked] = React.useState(false)

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
              />
            )
          }
        }
      })()}
    </>
  )
}