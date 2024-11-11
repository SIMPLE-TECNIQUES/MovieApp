import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import MoviePage from './Pages/MoviePage';
import Favorites from './Pages/Favourites'; 
// import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

const App: React.FC = () => {
  return (
    <BrowserRouter>
        {/* <Navbar />        */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/favorites" element={<Favorites />} /> 
        </Routes>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
