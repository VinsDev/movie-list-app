import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieListPage from '../features/movieList/MovieListPage';
import MovieDetailsPage from '../features/movieDetails/MovieDetailsPage';
import ErrorBoundary from '../components/common/ErrorBoundary';

const AppRoutes: React.FC = () => (
  <Router>
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<MovieListPage />} />
        <Route path="/movie/:id" element={<MovieDetailsPage />} />
      </Routes>
    </ErrorBoundary>
  </Router>
);

export default AppRoutes;
