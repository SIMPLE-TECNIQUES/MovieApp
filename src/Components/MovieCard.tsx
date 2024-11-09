import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../Redux/MovieSlice';
import { Link } from 'react-router-dom';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: any) => state.movies.favorites);
  const isFavorite = favorites.some((fav: Movie) => fav.imdbID === movie.imdbID);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(movie.imdbID)); 
    } else {
      dispatch(addToFavorites(movie));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md min-w-72 max-w-72 transition-transform transform z-10 hover:scale-105">
      <Link to={`/movie/${movie.imdbID}`}> 
        <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover object-top" />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{movie.Title}</h3>
          <p className="text-gray-600">{movie.Year}</p>
          <p>{movie.Type}</p>
        </div>
      </Link>
      <button
        onClick={handleFavoriteToggle}
        className={`mb-2 mx-4 px-3 py-1 rounded-md text-white ${isFavorite ? 'bg-red-500' : 'bg-blue-500'} transition duration-200`} 
      >
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export default MovieCard;
