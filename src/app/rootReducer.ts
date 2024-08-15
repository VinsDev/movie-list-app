import { combineReducers } from '@reduxjs/toolkit';
import movieListReducer from '../features/movieList/redux/movieListSlice';
import movieDetailsReducer from '../features/movieDetails/redux/movieDetailsSlice';

const rootReducer = combineReducers({
  movieList: movieListReducer,
  movieDetails: movieDetailsReducer,
});

export default rootReducer;
