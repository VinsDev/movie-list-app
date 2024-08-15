// Type definitions . . .

export interface Movie {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    genres: { id: number; name: string }[];
    genre_ids: number[];
    vote_average: number;
    poster_path: string;
    runtime: number;
    production_companies: { name: string }[];
    budget: number;
    revenue: number;
}


export interface Genre {
    id: number;
    name: string;
}

export interface MovieListState {
    movies: Movie[];
    loading: boolean;
    error: string | null;
    recentSearches: string[];
    filteredMovies: Movie[];
    currentPage: number;
    totalPages: number;
    moviesPerPage: number;
    genres: Genre[];
    currentFilter: string;
}

export interface MovieCardProps {
    movie: {
      id: number;
      title: string;
      release_date: string;
      poster_path: string;
      vote_average: number;
    };
  }