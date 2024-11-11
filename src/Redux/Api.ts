import axios from 'axios';
import { Movie } from './MovieSlice'; 


const API_KEY = 'a4da9bb3';

interface MovieSearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string; 
}

interface MovieDetailsResponse {
  imdbID: string;
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Array<{ Source: string; Value: string }>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export const searchMovies = async (query: string, type: string): Promise<MovieSearchResponse> => {
  try {
    const response = await axios.get(`https://www.omdbapi.com/?s=${query}&type=${type}&apikey=${API_KEY}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch movies");
  }
};

export const getMovieDetails = async (id: string): Promise<MovieDetailsResponse> => {
  try {
    const response = await axios.get(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch movie details");
  }
};
