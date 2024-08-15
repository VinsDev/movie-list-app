import axios from 'axios';
import { Movie } from '../../../definitions/definitions';

// Fetching API key and base URL from environment variables
const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = import.meta.env.VITE_BASE_URL;

// Function to fetch movies from the API
export const fetchMoviesFromApi = async (query?: string): Promise<Movie[]> => {
  // Constructing the URL based on whether a search query is provided
  const url = query
    ? `${baseUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`
    : `${baseUrl}/movie/popular?api_key=${apiKey}`;

  try {
    // Making the API call using axios
    const response = await axios.get(url);
    
    // Mapping the response data to an array of Movie objects
    const movies = response.data.results.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      genre_ids: movie.genre_ids,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
      release_date: movie.release_date,
    }));
    
    // Returning the array of Movie objects
    return movies;
  } catch (error) {
    // Logging and re-throwing the error if the API call fails
    console.error("Error fetching data from TMDb API:", error);
    throw error;
  }
};

// Function to fetch genres from the API
export const fetchGenresFromApi = async () => {
  try {
    // Fetching genre data from the API
    const response = await fetch(`${baseUrl}/genre/movie/list?api_key=${apiKey}`);
    
    // Checking if the response is successful
    if (!response.ok) {
      throw new Error('Failed to fetch genres');
    }
    
    // Parsing and returning the genre data
    const data = await response.json();
    return data.genres;
  } catch (error) {
    // Logging and re-throwing the error if the API call fails
    console.error("Error fetching genres from TMDb API:", error);
    throw error;
  }
};

// Function to submit a new movie to the API (currently mocked)
export const submitMovieToApi = async (movieData: Record<string, any>): Promise<Movie> => {
  // Preparing the form data for submission
  const formData = new FormData();
  Object.entries(movieData).forEach(([key, value]) => {
    if (value !== null) formData.append(key, value);
  });

  try {
    // This part is commented out because there's no actual endpoint to submit movies
    // const response = await axios.post(url, formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     'Authorization': `Bearer ${apiKey}`
    //   }
    // });
    // return response.data;

    // Returning a mock Movie object with the provided data
    return {
      id: Date.now(),  // Mocked ID
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
    // Logging and re-throwing the error if the submission fails
    console.error("Error submitting movie to API:", error);
    throw error;
  }
};
