import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchResults, setError } from '../Redux/MovieSlice';
import Navbar from '../Components/Navbar';
import MovieCard from '../Components/MovieCard';
import { searchMovies } from '../Redux/Api';
import SideBar from '../Components/SideBar';
import { RootState } from '../Redux/store'; 

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

const Home: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [type, setType] = useState<string>(''); 
  const [currentPage, setCurrentPage] = useState<number>(1); 
  const resultsPerPage = 6;
  const dispatch = useDispatch();
  
 
  const { searchResults, error } = useSelector((state: RootState) => state.movies); 

  const [genre, setGenre] = useState<string>('');

  useEffect(() => {
    const initialSearch = async () => {
      try {
        const data = await searchMovies('Spider', type);
        if (data.Response === 'True') {
          dispatch(setSearchResults(data.Search));
        } else {
          dispatch(setError(data.Error));
        }
      } catch (err) {
        dispatch(setError((err as Error).message)); 
      }
    };

    initialSearch();
  }, [type, dispatch]);

  const handleGenreClick = async (genre: string) => { 
    setGenre(genre);
    setCurrentPage(1);
    try {
      const data = await searchMovies(genre, type);
      if (data.Response === 'True') {
        dispatch(setSearchResults(data.Search));
      } else {
        dispatch(setError(data.Error));
      }
    } catch (err) {
      dispatch(setError((err as Error).message)); 
    }
  };

  const handleSearch = async () => {
    if (!query) {
      return alert('Please Enter The Movie Name');
    }
    setCurrentPage(1);
    try {
      const data = await searchMovies(query, type);
      if (data.Response === 'True') {
        dispatch(setSearchResults(data.Search));
      } else {
        dispatch(setError(data.Error));
      }
    } catch (err) {
      dispatch(setError((err as Error).message)); 
    }
  };

  useEffect(() => {
    if (query) {
      handleSearch();
    }
  }, [type, query]); 

  const totalResults = searchResults.length;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const currentResults = searchResults.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage);

  return (
    <div className="bg-black min-h-screen pt-16">
      <SideBar setGenre={handleGenreClick} />
      <div className="flex flex-col items-center justify-center sm:flex-1 p-4 mt-32 sm:mt-20 md:mt-0 sm:ml-64">
        <Navbar query={query} setQuery={setQuery} handleSearch={handleSearch} type={type} setType={setType} />
        
        {error && <div className="text-blue-500 text-2xl">Movies Not Found!</div>}
  
        <div className="relative flex flex-wrap sm:justify-around sm:items-center gap-4 mt-6 sm:-mt-5 md:-mt-10">
          {currentResults.map((movie: Movie) => ( // Specify the Movie type for mapping
            <div key={movie.imdbID} className="flex flex-col items-center justify-center sm:flex-shrink-0 sm:mt-14 mx-auto w-full sm:w-1/2 lg:w-4/12 xl:w-3/12">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
        
        {totalResults > resultsPerPage && (
          <div className="flex justify-between gap-4 mt-4 mb-14">
            <button onClick={handlePrevPage} disabled={currentPage === 1} className="bg-blue-500 text-white p-2 rounded">
              Previous
            </button>
  
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className="bg-blue-500 text-white p-2 rounded">
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
