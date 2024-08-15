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

// Async thunk to fetch movie details by ID
export const fetchMovieDetails = createAsyncThunk<Movie, string>(
  'movieDetails/fetchMovieDetails',
  async (id, thunkAPI) => {
    try {
      // Fetching movie details from the API
      const response = await fetchMovieDetailsFromApi(id);
      return response.data;  // Return the movie data on success
    } catch (error) {
      // Return a rejected action with the error message on failure
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
      // Handle the pending state of fetchMovieDetails (e.g., when the request is made)
      .addCase(fetchMovieDetails.pending, state => {
        state.loading = true;
        state.error = null;  // Clear any previous errors
      })
      // Handle the fulfilled state of fetchMovieDetails (e.g., when the request succeeds)
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.movie = action.payload;  // Update state with the fetched movie details
      })
      // Handle the rejected state of fetchMovieDetails (e.g., when the request fails)
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch movie details';  // Set the error message
      });
  },
});

// Exporting the reducer to be included in the store
export default movieDetailsSlice.reducer;
