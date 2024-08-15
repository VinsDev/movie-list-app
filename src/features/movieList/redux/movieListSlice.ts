import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchGenresFromApi, fetchMoviesFromApi, submitMovieToApi } from '../api/movieListApi';
import { RootState } from '../../../app/store';
import { Movie, MovieListState } from '../../../definitions/definitions';

// Initial state of the movie list feature
const initialState: MovieListState = {
  movies: [],
  filteredMovies: [],
  loading: false,
  error: null,
  recentSearches: [],
  currentPage: 1,
  totalPages: 1,
  moviesPerPage: 10,
  genres: [],
  currentFilter: 'all',
};

// Thunk to asynchronously add a new movie to the list by submitting to an API or mock API
export const addMovieAsync = createAsyncThunk<Movie, { title: string; overview: string; genre: string; releaseDate: string; runtime: string }>(
  'movieList/addMovieAsync',
  async (movieData, { rejectWithValue }) => {
    try {
      // Call the API or mock API to submit the movie data and return the newly created movie
      const newMovie = await submitMovieToApi({
        title: movieData.title,
        overview: movieData.overview,
        genre: movieData.genre,
        releaseDate: movieData.releaseDate,
        runtime: movieData.runtime,
      });
      return newMovie;
    } catch (error) {
      // If there's an error, log it and return a rejected value
      console.error('Failed to submit movie:', error);
      return rejectWithValue('Failed to submit movie');
    }
  }
);

// Thunk to asynchronously fetch genres from the API
export const fetchGenres = createAsyncThunk(
  'movieList/fetchGenres',
  async () => {
    const response = await fetchGenresFromApi();
    return response;
  }
);

// Thunk to search for movies either locally or by querying the API if not found locally
export const searchMovies = createAsyncThunk<
  Movie[],
  string,
  { state: RootState }
>(
  'movies/searchMovies',
  async (query, { getState, rejectWithValue }) => {
    const state = getState();
    const queryLower = query.toLowerCase();

    // First, try to filter the movies locally by title or overview
    const localFilteredMovies = state.movieList.movies.filter(movie =>
      movie.title.toLowerCase().includes(queryLower) || movie.overview.toLowerCase().includes(queryLower)
    );

    if (localFilteredMovies.length > 0) {
      // Return local results if found
      return localFilteredMovies;
    } else {
      // If no local results, fetch from the API
      try {
        const fetchedMovies = await fetchMoviesFromApi(query);
        return fetchedMovies;
      } catch (error) {
        // If there's an error, return a rejected value
        return rejectWithValue('Failed to fetch movies from API');
      }
    }
  }
);

// Thunk to fetch movies from the API
export const fetchMovies = createAsyncThunk<Movie[]>(
  'movies/fetchMovies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchMoviesFromApi();
      return response;
    }
    catch (error) {
      // Handle errors by returning a rejected value
      return rejectWithValue('Failed to fetch movies from API');
    }
  }
);

// Create a slice for the movie list feature with reducers and extra reducers for async thunks
const movieListSlice = createSlice({
  name: 'movieList',
  initialState,
  reducers: {
    // Add a new movie to the list
    addMovie: (state, action: PayloadAction<Movie>) => {
      state.movies.push(action.payload);
      state.filteredMovies = state.movies;
    },
    // Add a recent search term to the list, keeping only the last 10
    addRecentSearch: (state, action: PayloadAction<string>) => {
      const newSearch = action.payload;
      state.recentSearches = [
        newSearch,
        ...state.recentSearches.filter(search => search !== newSearch)
      ].slice(0, 10);
    },
    // Remove a recent search term from the list
    removeRecentSearch: (state, action: PayloadAction<string>) => {
      state.recentSearches = state.recentSearches.filter(search => search !== action.payload);
    },
    // Set the filtered list of movies
    setFilteredMovies: (state, action: PayloadAction<Movie[]>) => {
      state.filteredMovies = action.payload;
    },
    // Set the current page for pagination
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    // Filter movies by genre or reset to show all movies
    filterMovies: (state, action: PayloadAction<string>) => {
      state.currentFilter = action.payload;
      if (action.payload === 'all') {
        state.filteredMovies = state.movies;
      } else {
        state.filteredMovies = state.movies.filter(movie =>
          movie.genre_ids.includes(parseInt(action.payload))
        );
      }
      state.currentPage = 1;  // Reset to the first page after filtering
    },
  },
  extraReducers: (builder) => {
    // Handle the searchMovies thunk states
    builder
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;  // Set loading state to true when fetching
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;  // Set loading state to false when fetching is complete
        state.filteredMovies = action.payload;

        // If movies were fetched from the API, update the main movie list
        if (state.movies.length === 0) {
          state.movies = action.payload;
        }
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;  // Stop loading and set an error message if fetching failed
        state.error = action.payload as string;
      });

    // Handle the fetchMovies thunk states
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;  // Set loading state to true when fetching
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;  // Set loading state to false when fetching is complete
        state.movies = action.payload;
        state.filteredMovies = action.payload;
        state.totalPages = Math.ceil(action.payload.length / state.moviesPerPage);  // Calculate total pages
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;  // Stop loading and set an error message if fetching failed
        state.error = action.error.message || 'Failed to fetch movies';
      });

    // Handle the fetchGenres thunk state
    builder.addCase(fetchGenres.fulfilled, (state, action) => {
      state.genres = [{ id: 'all', name: 'All Genres' }, ...action.payload];  // Prepend 'All Genres' option
    });
  },
});

// Export the reducers as actions and the slice reducer as default
export const { addMovie, addRecentSearch, removeRecentSearch, filterMovies, setFilteredMovies, setCurrentPage } = movieListSlice.actions;
export default movieListSlice.reducer;
