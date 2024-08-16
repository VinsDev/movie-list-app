import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovies, addRecentSearch, removeRecentSearch, setFilteredMovies } from '../redux/movieListSlice';
import { RootState, AppDispatch } from '../../../app/store';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoArrowForward, IoClose, IoSearchOutline, IoTimeOutline } from 'react-icons/io5';

const SearchBar: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const recentSearches = useSelector((state: RootState) => state.movieList.recentSearches);
  const movies = useSelector((state: RootState) => state.movieList.movies);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      setQuery(searchQuery);
      if (location.state && location.state.searchResults) {
        dispatch(setFilteredMovies(location.state.searchResults));
      } else {
        handleSearch(searchQuery, false);
      }
    } else {
      setQuery('');
      dispatch(setFilteredMovies(movies));
    }
  }, [location, dispatch, movies]);

  useEffect(() => {
    if (query.length > 0) {
      const filteredSuggestions = movies
        .filter(movie =>
          movie.title.toLowerCase().includes(query.toLowerCase())
        )
        .map(movie => movie.title);

      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [query, movies]);

  const handleSearch = async (searchQuery: string, shouldNavigate = true) => {
    if (searchQuery.trim() !== '') {
      const results = await dispatch(searchMovies(searchQuery)).unwrap();
      dispatch(addRecentSearch(searchQuery));
      if (shouldNavigate) {
        navigate(`?search=${encodeURIComponent(searchQuery)}`, {
          state: { searchResults: results },
        });
      }
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch(query);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleDeleteRecentSearch = (search: string, event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(removeRecentSearch(search));
  };

  const handleFocus = () => {
    setShowDropdown(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (!inputRef.current?.contains(document.activeElement)) {
        setShowDropdown(false);
      }
    }, 200);
  };

  const handleClick = () => {
    setShowDropdown(true);
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setShowDropdown(false);
  };

  return (
    <div className="relative max-w-2xl mx-auto  p-4">
      <div className="flex items-center gap-2 relative">
        <IoSearchOutline className="absolute left-3 text-gray-400" size={20} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search movies..."
          className="w-full pr-4 pl-10 py-2 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-300 shadow-md"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onClick={handleClick}
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-8 p-1 mr-2 text-gray-400 hover:text-gray-600"
          >
            <IoClose size={20} />
          </button>
        )}
        <button
          onClick={() => handleSearch(query)}
          className="absolute right-2 p-1 text-gray-400 hover:text-gray-600"
        >
          <IoArrowForward size={24} />
        </button>
      </div>
      {showDropdown && (suggestions.length > 0 || recentSearches.length > 0) && (
        <ul className="absolute z-10 bg-white border border-gray-300 rounded-2xl mr-2 md:w-full mt-2 p-2 shadow-lg">
          {suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="p-2 cursor-pointer hover:bg-blue-100 flex items-center"
              >
                <IoSearchOutline className="mr-2 text-gray-500" size={16} />
                <span>{suggestion}</span>
              </li>
            ))
          ) : (
            recentSearches.map((search, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(search)}
                className="p-2 cursor-pointer hover:bg-blue-100 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <IoTimeOutline className="mr-2 text-gray-500" size={16} />
                  <span>{search}</span>
                </div>
                <button
                  onClick={(e) => handleDeleteRecentSearch(search, e)}
                  className="text-gray-400 hover:text-red-500 focus:outline-none"
                  aria-label={`Remove ${search} from recent searches`}
                >
                  Remove
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;