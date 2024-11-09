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
  Type: string;//new change
}

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const favorites = useSelector((state: any) => state.movies.favorites);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [error, setError] = useState<string>('');
  const [isSticky, setIsSticky] = useState<boolean>(false);

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

  useEffect(() => {
    const handleScroll = () => {
      const stickyPoint = 200;
      setIsSticky(window.scrollY > stickyPoint);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
    <div className="bg-black py-2 md:pb-40 pt-1">
      <div className="movie-detail relative lg:flex lg:justify-center gap-4 text-white container mx-auto p-4 mt-48 sm:mt-32 md:mt-20 mb-14">
        <img 
          src={movie.Poster}
          alt={movie.Title}
          className={`object-contain sticky top-48 md:sticky md:top-20 lg:w-full xl:w-[55%] w-full sm:w-[80%] z-10 rounded-lg shadow-md transition-opacity duration-500 ${isSticky ? 'opacity-20' : 'opacity-100'}`} 
        />
        <div className="relative z-40 mt-4 pb-16 md:pb-32">
          <h1 className="text-3xl font-bold">{movie.Title}</h1>
          <p className="">{movie.Year} | {movie.Genre}</p>
          <p className="mt-2">{movie.Plot}</p>

          <button
            onClick={handleFavoriteToggle}
            className={`mt-4 px-4 py-2 rounded-md text-white 
                       ${favorites.find((m: Movie) => m.imdbID === movie.imdbID) ? 'bg-red-500' : 'bg-blue-500'} 
                       hover:bg-opacity-80 transition duration-200`}
          >
            {favorites.find((m: Movie) => m.imdbID === movie.imdbID) ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>

          <div className="mt-4">
            <h3 className="text-xl font-semibold">Ratings:</h3>
            <ul className="list-disc list-inside">
              {movie.Ratings.map((rating) => (
                <li key={rating.Source}>{rating.Source}: {rating.Value}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-semibold">Cast:</h3>
            <p>{movie.Actors}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
