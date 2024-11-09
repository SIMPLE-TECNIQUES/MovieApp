import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar: React.FC<NavbarProps> = ({ query, setQuery, handleSearch, type, setType }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-lg z-50">
      <div className="container mx-auto flex flex-col items-center sm:flex sm:flex-row sm:items-center sm:justify-between p-4">
        <div className="flex gap-2 text-lg font-bold">
          <img src="/MW.png" alt="Movie-World" className="w-10 h-10 scale-125" />
          <Link to="/" className="text-2xl hover:text-gray-300">Movie World</Link>
        </div>
        <div className="flex flex-col justify-center items-center mt-1 md:mt-0 md:flex md:flex-row md:items-center space-x-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for a movie..."
            required
            className="p-2 rounded-md border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-3 space-x-3 sm:space-x-2 -translate-x-2 md:mt-0">
            <select 
              value={type} 
              onChange={(e) => setType(e.target.value)} 
              className="p-2 rounded-md border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All</option>
              <option value="movie">Movies</option>
              <option value="series">Series</option>
            </select>
            <button 
              onClick={handleSearch} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200"
            >
              Search
            </button>
          </div>
        </div>
        <div className="mt-2">
          <Link to="/favorites" className="ml-4 text-blue-500 hover:underline">Favorites</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
