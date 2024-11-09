import React from "react";
import "./SideBar.css";

interface SideBarProps {
  setGenre: (genre: string) => void; 
}

const SideBar: React.FC<SideBarProps> = ({ setGenre }) => {
  return (
    <div className="sidecss">
      <aside
        id="default-sidebar"
        className="hidden sm:block sm:mt-[120px] md:mt-16 z-0 w-64 h-full transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800">
          <h1 className="text-center text-3xl pb-2 border-b font-bold text-white">
            Genres
          </h1>
          <ul className="space-y-2 font-medium">
            {[
              "Action",
              "Adventure",
              "Comedy",
              "Horror",
              "Thriller",
              "Science fiction",
              "Fantasy",
              "Historical film",
              "Crime",
              "Romantic comedy",
              "Animation",
            ].map((genre) => (
              <li key={genre}>
                <button
                  onClick={() => setGenre(genre)}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full text-left"
                >
                  <span className="flex-1 ms-3 whitespace-nowrap">{genre}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
