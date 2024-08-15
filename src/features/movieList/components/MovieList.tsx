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
    dispatch(fetchMovies());
  }, [dispatch]);

  // Calculate pagination
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  const renderContent = () => {
    if (loading) {
      return Array.from({ length: moviesPerPage }).map((_, index) => (
        <MovieCardSkeleton key={index} />
      ));
    }

    if (error) {
      return <div className="col-span-full text-center text-red-500">{error}</div>;
    }

    if (currentMovies.length === 0) {
      return <div className="col-span-full text-center">No movies found.</div>;
    }

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
      {!loading && !error && currentMovies.length > 0 && <PaginationControls />}
    </>
  );
};

export default MovieList;