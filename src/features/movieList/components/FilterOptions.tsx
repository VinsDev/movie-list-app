import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterMovies, fetchGenres } from '../redux/movieListSlice';
import { RootState, AppDispatch } from '../../../app/store';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../../../styles/global.css';

const FilterOptions: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { genres, currentFilter } = useSelector((state: RootState) => state.movieList);
  const scrollRef = useRef<HTMLDivElement>(null);  // Reference to the scrollable genre list container
  const [canScrollLeft, setCanScrollLeft] = useState(false);  // State to track if scrolling left is possible
  const [canScrollRight, setCanScrollRight] = useState(false); // State to track if scrolling right is possible

  useEffect(() => {
    // Fetch genres if not already fetched
    if (genres.length <= 1) {
      dispatch(fetchGenres());
    }
  }, [dispatch, genres.length]);

  useEffect(() => {
    const checkScrollPosition = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
      }
    };

    checkScrollPosition();  // Initial check for scroll position

    // Check scroll position when user scrolls
    if (scrollRef.current) {
      scrollRef.current.addEventListener('scroll', checkScrollPosition);
    }

    // Recheck scroll position when window is resized
    window.addEventListener('resize', checkScrollPosition);

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener('scroll', checkScrollPosition);
      }
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, [genres]);

  const handleFilterChange = (genreId: string) => {
    // Dispatch an action to filter movies by selected genre
    dispatch(filterMovies(genreId));
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      // Scroll the genre list to the left
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      // Scroll the genre list to the right
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {canScrollLeft && (
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 rounded-full p-2 hover:bg-black/[0.2] z-10 cursor-pointer">
          <FaChevronLeft color="black" size={20} onClick={scrollLeft} />
        </div>
      )}
      <div
        ref={scrollRef}
        className="flex space-x-2 overflow-x-auto whitespace-nowrap scrollbar-hide px-8"
      >
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleFilterChange(genre.id.toString())}
            className={`px-4 py-2 rounded-lg text-sm ${currentFilter === genre.id.toString()
              ? 'bg-blue-600 text-white'
              : 'bg-gray-300 text-gray-900'
              }`}
          >
            {genre.name}
          </button>
        ))}
      </div>
      {canScrollRight && (
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full p-2 hover:bg-black/[0.2] z-10 cursor-pointer">
          <FaChevronRight color="black" size={20} onClick={scrollRight} />
        </div>
      )}
    </div>
  );
};

export default FilterOptions;
