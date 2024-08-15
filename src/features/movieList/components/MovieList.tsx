import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies } from '../redux/movieListSlice';
import { RootState, AppDispatch } from '../../../app/store';
import MovieCard from './MovieCard';
import MovieCardSkeleton from './MovieCardSkeleton';
import PaginationControls from './PaginationControls';

const MovieList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { filteredMovies, loading, error, currentPage, moviesPerPage } = useSelector((state: RootState) => state.movieList);

  useEffect(() => {
    // Fetch movies when the component mounts
    dispatch(fetchMovies());
  }, [dispatch]);

  // Calculate pagination indices
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  // Function to render content based on loading, error, and available movies
  const renderContent = () => {
    if (loading) {
      // Render skeletons while loading
      return Array.from({ length: moviesPerPage }).map((_, index) => (
        <MovieCardSkeleton key={index} />
      ));
    }

    if (error) {
      // Display an error message if there's an error
      return <div className="col-span-full text-center text-red-500">{error}</div>;
    }

    if (currentMovies.length === 0) {
      // Display a message if no movies are found
      return <div className="col-span-full text-center">No movies found.</div>;
    }

    // Render the list of movie cards
    return currentMovies.map((movie) => (
      <MovieCard
        key={movie.id}
        movie={{
          id: movie.id,
          title: movie.title,
          release_date: movie.release_date,
          poster_path: movie.poster_path,
          vote_average: movie.vote_average
        }}
      />
    ));
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {renderContent()}
      </div>
      {/* Render pagination controls if there are movies and no loading or error */}
      {!loading && !error && currentMovies.length > 0 && <PaginationControls />}
    </>
  );
};

export default MovieList;
