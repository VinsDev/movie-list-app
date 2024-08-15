import axios from 'axios';
import { Movie } from '../../../definitions/definitions';

const apiKey = import.meta.env.VITE_API_KEY;  // API key for accessing The Movie Database (TMDb)
const baseUrl = import.meta.env.VITE_BASE_URL;  // Base URL for TMDb API

// Function to fetch movie details from the TMDb API
export const fetchMovieDetailsFromApi = async (id: string): Promise<{ data: Movie }> => {
  // Make an API request to fetch movie details by ID
  return await axios.get(`${baseUrl}/movie/${id}?api_key=${apiKey}&language=en-US`);
};
