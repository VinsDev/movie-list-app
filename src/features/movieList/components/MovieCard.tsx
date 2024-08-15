import React from 'react';
import { Link } from 'react-router-dom';
import { MovieCardProps } from '../../../definitions/definitions';

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="movie-card p-2 mb-4">
      <Link to={`/movie/${movie.id}`} className="block">
        <img
          src={imageUrl}
          alt={movie.title}
          className="w-full rounded-xl"
        />
        <div className="mt-2">
          <h2 className="text-lg font-semibold text-gray-900">
            {movie.title}
          </h2>
          <div className='flex items-center gap-2'>
            <p className="text-sm text-gray-600">
              {new Date(movie.release_date).toLocaleDateString()}
            </p>
            {movie.vote_average && <p>
              {movie.vote_average} / 10
            </p>}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
