import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchPokemon = createAsyncThunk("pokemon/fetchPokemon", (url) => {
  return fetch(url)
    .then((r) => r.json())
    .then((data) => data.pokemon_entries.map((pokemon) => (
      {...pokemon, checked: false}
    )))
})

export interface Props {
  entities: [
    {
      entry_number: number,
      pokemon_species: {
        name: string,
        url: string
      },
      checked: boolean
    }
  ],
  status: string
}

const initialState: Props = {
  entities: [{ entry_number: 0, pokemon_species: { name: "", url: "" }, checked: false }],
  status: "idle"
}

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    checkAdded(state, action) {
      const pokemon = state.entities
      const index = pokemon.findIndex((mon) => mon.entry_number === action.payload.entry_number)
      pokemon.splice(index, 1, {...action.payload, checked: true})
    },
    checkRemoved(state, action) {
      const pokemon = state.entities
      const index = pokemon.findIndex((mon) => mon.entry_number === action.payload.entry_number)
      pokemon.splice(index, 1, {...action.payload, checked: false})
    },
  },
  extraReducers: {
    [fetchPokemon.pending](state) {
      state.status = "loading"
    },
    [fetchPokemon.fulfilled](state, action) {
      // const pokemon = action.payload
      // pokemon.map((mon) => {...mon, checked: false})
      // state.entities = pokemon
      state.entities = action.payload
      // state.entities = action.payload.map((pokemon) => ({...pokemon, checked: false}))
      state.status = "idle"
    }
  }
})

export const { checkAdded, checkRemoved } = pokemonSlice.actions
export default pokemonSlice.reducer