import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterMovies, fetchGenres } from '../redux/movieListSlice';
import { RootState, AppDispatch } from '../../../app/store';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../../../styles/global.css';

const FilterOptions: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { genres, currentFilter } = useSelector((state: RootState) => state.movieList);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
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

    checkScrollPosition();

    if (scrollRef.current) {
      scrollRef.current.addEventListener('scroll', checkScrollPosition);
    }

    window.addEventListener('resize', checkScrollPosition);

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener('scroll', checkScrollPosition);
      }
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, [genres]);

  const handleFilterChange = (genreId: string) => {
    dispatch(filterMovies(genreId));
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {canScrollLeft && (
        <div className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 rounded-full p-2 hover:bg-white/[0.2] z-10 cursor-pointer">
          <FaChevronLeft color="white" size={20} onClick={scrollLeft} />
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
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
              currentFilter === genre.id.toString()
                ? 'bg-white text-indigo-600'
                : 'bg-indigo-500 text-white hover:bg-indigo-400'
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>
      {canScrollRight && (
        <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full p-2 hover:bg-white/[0.2] z-10 cursor-pointer">
          <FaChevronRight color="white" size={20} onClick={scrollRight} />
        </div>
      )}
    </div>
  );
};

export default FilterOptions;