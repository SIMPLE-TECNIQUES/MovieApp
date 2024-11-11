import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../Redux/Api';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../Redux/MovieSlice';

interface Rating {
  Source: string;
  Value: string;
}

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Genre: string;
  Plot: string;
  Actors: string;
  Poster: string;
  Ratings: Rating[];
  Type: string;
}

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const favorites = useSelector((state: any) => state.movies.favorites);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        if (id) {
          const data = await getMovieDetails(id);
          setMovie(data);
        }
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleFavoriteToggle = () => {
    if (movie && favorites.find((m: Movie) => m.imdbID === movie.imdbID)) {
      dispatch(removeFromFavorites(movie.imdbID));
    } else if (movie) {
      dispatch(addToFavorites(movie));
    }
  };

  if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;
  if (!movie) return <div className="text-center mt-4">Loading...</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 py-8">
      <div className="bg-gray-800 text-white rounded-2xl shadow-lg p-8 w-full max-w-5xl mx-4 lg:mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="flex justify-center">
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-72 h-auto rounded-lg shadow-md object-cover"
            />
          </div>
          <div className="col-span-2">
            <h1 className="text-4xl font-bold mb-2">{movie.Title}</h1>
            <p className="text-lg text-gray-400 mb-4">{movie.Year} | {movie.Genre}</p>
            <p className="text-base mb-6">{movie.Plot}</p>

            <button
              onClick={handleFavoriteToggle}
              className={`px-4 py-2 mb-6 rounded-md text-white font-semibold transition-all duration-200 ${
                favorites.find((m: Movie) => m.imdbID === movie.imdbID)
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {favorites.find((m: Movie) => m.imdbID === movie.imdbID)
                ? 'Remove from Favorites'
                : 'Add to Favorites'}
            </button>

            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Ratings:</h3>
              <ul className="list-disc list-inside text-gray-300">
                {movie.Ratings.map((rating) => (
                  <li key={rating.Source}>{rating.Source}: {rating.Value}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Cast:</h3>
              <p className="text-gray-300 break-words">{movie.Actors}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
