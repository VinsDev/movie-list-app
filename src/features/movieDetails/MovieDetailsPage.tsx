import React, { useEffect } from 'react';
import MovieDetails from './components/MovieDetails';
import Header from './components/Header';

const MovieDetailsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <MovieDetails />
      </div>
    </div>
  );
};

export default MovieDetailsPage;