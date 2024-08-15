import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMovieDetailsFromApi } from '../api/movieDetailsApi';

interface Movie {
  id: string;
  title: string;
  overview: string;
  release_date: string;
  genres: { id: number; name: string }[];
  vote_average: number;
  poster_path: string;
  runtime: number;
  production_companies: { name: string }[];
  budget: number;
  revenue: number;
}

interface MovieDetailsState {
  movie: Movie | null;
  loading: boolean;
  error: string | null;
}

const initialState: MovieDetailsState = {
  movie: null,
  loading: false,
  error: null,
};

export const fetchMovieDetails = createAsyncThunk<Movie, string>(
  'movieDetails/fetchMovieDetails',
  async (id) => {
    const response = await fetchMovieDetailsFromApi(id);
    return response.data;
  }
);

const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMovieDetails.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.movie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch movie details';
      });
  },
});

export default movieDetailsSlice.reducer;