import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../Redux/MovieSlice';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

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
    <div className="relative bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 overflow-hidden max-w-xs w-72 m-4 border border-gray-300">
      <Link to={`/movie/${movie.imdbID}`} className="block">
        <div className="flex justify-center bg-gray-200 p-4 rounded-t-lg">
          <img 
            src={movie.Poster} 
            alt={movie.Title} 
            className="object-contain w-60 h-60 rounded-lg transition-transform hover:scale-110"
          />
        </div>
        <div className="p-4 min-h-[5rem] bg-white"> {/* Text container with a consistent background */}
          <h3 className="text-xl font-semibold text-gray-800 text-center">{movie.Title}</h3>
        </div>
      </Link>
      <button
        onClick={handleFavoriteToggle}
        className={`flex items-center justify-center w-full py-2 text-sm font-medium transition-all ${
          isFavorite ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
        } text-white rounded-b-lg`}
      >
        {isFavorite ? <FaHeart className="mr-2" /> : <FaRegHeart className="mr-2" />}
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export default MovieCard;
