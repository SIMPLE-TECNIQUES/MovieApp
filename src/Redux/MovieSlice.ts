import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

const initialState: MovieState = {
  searchResults: [],
  favorites: [],
  error: '',
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearchResults: (state, action: PayloadAction<Movie[]>) => {
      state.searchResults = action.payload;
      state.error = '';
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    addToFavorites: (state, action: PayloadAction<Movie>) => {
      const movieExists = state.favorites.find(movie => movie.imdbID === action.payload.imdbID);
      if (!movieExists) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(movie => movie.imdbID !== action.payload);
    },
  },
});

export const { setSearchResults, setError, addToFavorites, removeFromFavorites } = movieSlice.actions;
export default movieSlice.reducer;
