import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieSlice';

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

interface MovieState {
  searchResults: Movie[];
  favorites: Movie[];
  error: string;
}

const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
