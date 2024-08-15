import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMovieDetailsFromApi } from '../api/movieDetailsApi';
import { Movie } from '../../../definitions/definitions';

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
  async (id, thunkAPI) => {
    try {
      const response = await fetchMovieDetailsFromApi(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
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