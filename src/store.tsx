import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './features/pokemon/pokemonSlice';
// import searchReducer from './features/search/searchSlice';

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    // results: searchReducer
  }
})

export default store;