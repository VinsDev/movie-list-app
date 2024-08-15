import axios from 'axios';
import { Movie } from '../../../definitions/definitions';

const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = import.meta.env.VITE_BASE_URL;


export const fetchMovieDetailsFromApi = async (id: string): Promise<{ data: Movie }> => {
  return await axios.get(`${baseUrl}/movie/${id}?api_key=${apiKey}&language=en-US`);
};