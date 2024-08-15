import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import Header from './components/Header';
import AddMovieModal from './components/AddMovieForm';

const MovieListPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    // Hide add movie button on scroll for mobile . . .
    const handleScroll = () => {
      const isMobileView = window.innerWidth <= 768;
      if (isMobileView) {
        if (window.scrollY > lastScrollY && window.scrollY > 0) {
          setShowButton(false);
        } else if (window.scrollY === 0) {
          setShowButton(true);
        }
      } else {
        setShowButton(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='bg-white'>
      <Header openModal={openModal} showButton={showButton} />
      <div className='px-4 py-2 md:px-12 pb-6'>
        <MovieList />
      </div>
      {isModalOpen && <AddMovieModal closeModal={closeModal} />}
    </div>
  );
};

export default MovieListPage;
