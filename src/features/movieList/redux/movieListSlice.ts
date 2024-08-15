import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchGenresFromApi, fetchMoviesFromApi, submitMovieToApi } from '../api/movieListApi';
import { RootState } from '../../../app/store';
import { Movie, MovieListState } from '../../../definitions/definitions';


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

export const addMovieAsync = createAsyncThunk<Movie, { title: string; overview: string; genre: string; releaseDate: string; runtime: string }>(
  'movieList/addMovieAsync',
  async (movieData, { rejectWithValue }) => {
    try {
      // Call the API or mock API to submit the movie data
      const newMovie = await submitMovieToApi({
        title: movieData.title,
        overview: movieData.overview,
        genre: movieData.genre,
        releaseDate: movieData.releaseDate,
        runtime: movieData.runtime,
      });
      return newMovie;
    } catch (error) {
      console.error('Failed to submit movie:', error);
      return rejectWithValue('Failed to submit movie');
    }
  }
);

export const fetchGenres = createAsyncThunk(
  'movieList/fetchGenres',
  async () => {
    const response = await fetchGenresFromApi();
    return response;
  }
);

export const searchMovies = createAsyncThunk<
  Movie[],
  string,
  { state: RootState }
>(
  'movies/searchMovies',
  async (query, { getState, rejectWithValue }) => {
    const state = getState();
    const queryLower = query.toLowerCase();

    // Filter locally first
    const localFilteredMovies = state.movieList.movies.filter(movie =>
      movie.title.toLowerCase().includes(queryLower) || movie.overview.toLowerCase().includes(queryLower)
    );

    if (localFilteredMovies.length > 0) {
      return localFilteredMovies;
    } else {
      // If no local results, fetch from API
      try {
        const fetchedMovies = await fetchMoviesFromApi(query);
        return fetchedMovies;
      } catch (error) {
        return rejectWithValue('Failed to fetch movies from API');
      }
    }
  }
);

export const fetchMovies = createAsyncThunk<Movie[]>(
  'movies/fetchMovies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchMoviesFromApi();
      return response;
    }
    catch (error) {
      return rejectWithValue('Failed to fetch movies from API');
    }
  }
);

const movieListSlice = createSlice({
  name: 'movieList',
  initialState,
  reducers: {
    addMovie: (state, action: PayloadAction<Movie>) => {
      state.movies.push(action.payload);
      state.filteredMovies = state.movies;
    },
    addRecentSearch: (state, action: PayloadAction<string>) => {
      const newSearch = action.payload;
      state.recentSearches = [
        newSearch,
        ...state.recentSearches.filter(search => search !== newSearch)
      ].slice(0, 10);
    },
    removeRecentSearch: (state, action: PayloadAction<string>) => {
      state.recentSearches = state.recentSearches.filter(search => search !== action.payload);
    },
    setFilteredMovies: (state, action: PayloadAction<Movie[]>) => {
      state.filteredMovies = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    filterMovies: (state, action: PayloadAction<string>) => {
      state.currentFilter = action.payload;
      if (action.payload === 'all') {
        state.filteredMovies = state.movies;
      } else {
        state.filteredMovies = state.movies.filter(movie =>
          movie.genre_ids.includes(parseInt(action.payload))
        );
      }
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredMovies = action.payload;

        // If fetched from API, update the main movies list
        if (state.movies.length === 0) {
          state.movies = action.payload;
        }
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // .addCase(addMovieAsync.fulfilled, (state, action) => {
      //   state.movies.push(action.payload);
      //   state.filteredMovies = state.movies;
      // });

    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
        state.filteredMovies = action.payload;
        state.totalPages = Math.ceil(action.payload.length / state.moviesPerPage);
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch movies';
      });
    builder.addCase(fetchGenres.fulfilled, (state, action) => {
      state.genres = [{ id: 'all', name: 'All Genres' }, ...action.payload];
    });
  },
});

export const { addMovie, addRecentSearch, removeRecentSearch, filterMovies, setFilteredMovies, setCurrentPage } = movieListSlice.actions;
export default movieListSlice.reducer;
