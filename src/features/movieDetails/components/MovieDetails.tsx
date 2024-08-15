import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovieDetails } from '../redux/movieDetailsSlice';
import { RootState, AppDispatch } from '../../../app/store';
import MovieDetailsSkeleton from './MovieDetailsSkeleton';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();  // Extract movie ID from the route parameters
  const dispatch: AppDispatch = useDispatch();
  const { movie, loading, error } = useSelector((state: RootState) => state.movieDetails);  // Access the movie details state

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetails(id));  // Fetch movie details when component mounts or ID changes
    }
  }, [dispatch, id]);

  // Display a loading skeleton while fetching data
  if (loading) return <MovieDetailsSkeleton />;

  // Display an error message if there was a problem fetching the data
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  // If no movie is found, return null (nothing rendered)
  if (!movie) return null;

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}  // Display the movie poster
            alt={movie.title}
            className="w-full h-auto rounded-xl shadow-2xl"
          />
        </div>
        <div className="lg:w-2/3">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="text-gray-600 mb-6 text-lg leading-relaxed">{movie.overview}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Details</h2>
              <ul className="space-y-2">
                <li><span className="font-medium">Release Date:</span> {new Date(movie.release_date).toLocaleDateString()}</li>
                <li><span className="font-medium">Runtime:</span> {movie.runtime} minutes</li>
                <li><span className="font-medium">Rating:</span> {movie.vote_average.toFixed(1)} / 10</li>
                <li><span className="font-medium">Genres:</span> {movie.genres.map(g => g.name).join(', ')}</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Production</h2>
              <ul className="space-y-2">
                <li><span className="font-medium">Budget:</span> ${movie.budget.toLocaleString()}</li>
                <li><span className="font-medium">Revenue:</span> ${movie.revenue.toLocaleString()}</li>
                <li><span className="font-medium">Companies:</span> {movie.production_companies.map(c => c.name).join(', ')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
