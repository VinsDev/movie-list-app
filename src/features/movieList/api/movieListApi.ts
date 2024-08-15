import axios from 'axios';
import { Movie } from '../../../definitions/definitions';

const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = import.meta.env.VITE_BASE_URL;

export const fetchMoviesFromApi = async (query?: string): Promise<Movie[]> => {
  const url = query
    ? `${baseUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`
    : `${baseUrl}/movie/popular?api_key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const movies = response.data.results.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      genre_ids: movie.genre_ids,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
      release_date: movie.release_date,
    }));
    return movies;
  } catch (error) {
    console.error("Error fetching data from TMDb API:", error);
    throw error;
  }
};

export const fetchGenresFromApi = async () => {
  try {
    const response = await fetch(`${baseUrl}/genre/movie/list?api_key=${apiKey}`);
    if (!response.ok) {
      throw new Error('Failed to fetch genres');
    }
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error("Error fetching genres from TMDb API:", error);
    throw error;
  }
};

export const submitMovieToApi = async (movieData: Record<string, any>): Promise<Movie> => {
  // const url = `${baseUrl}/movies`;

  const formData = new FormData();
  Object.entries(movieData).forEach(([key, value]) => {
    if (value !== null) formData.append(key, value);
  });

  try {
    // const response = await axios.post(url, formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     'Authorization': `Bearer ${apiKey}`
    //   }
    // });
    // return response.data;

    return {
      id: Date.now(),
      title: movieData.title,
      overview: movieData.overview,
      genre_ids: [parseInt(movieData.genre)],
      poster_path: '',
      backdrop_path: '',
      release_date: movieData.releaseDate,
      genres: [],
      vote_average: 0,  // Default value
      runtime: parseInt(movieData.runtime) || 0,
      production_companies: [],
      budget: 0,
      revenue: 0,
    } as Movie;
    
  } catch (error) {
    console.error("Error submitting movie to API:", error);
    throw error;
  }
};