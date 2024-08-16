import React, { useState } from 'react';
import MovieList from './components/MovieList';
import AddMovieModal from './components/AddMovieForm';
import Header from './components/Header';

const MovieListPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);



  return (
    <div className='bg-white'>
      <Header openModal={openModal} />
      <div className='px-4 py-4 md:px-12 md:py-12 pb-6'>
        <MovieList />
      </div>
      {/* Conditionally  render the Add movie modal . . . */}
      {isModalOpen && <AddMovieModal closeModal={closeModal} />}
    </div>
  );
};

export default MovieListPage;
