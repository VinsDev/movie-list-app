import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMovieAsync } from '../redux/movieListSlice';
import '../../../styles/global.css'
import { AppDispatch } from '../../../app/store';

interface AddMovieModalProps {
  closeModal: () => void;
}

const AddMovieModal: React.FC<AddMovieModalProps> = ({ closeModal }) => {
  const dispatch = useDispatch<AppDispatch>();
  
  // State to manage the movie form data
  const [movieData, setMovieData] = useState({
    title: '',
    overview: '',
    releaseDate: '',
    genre: '',
    runtime: '',
    posterImage: null as File | null,
  });

  // State for managing loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle changes in form inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMovieData(prev => ({ ...prev, [name]: value }));
  };

  // Handle changes for the image input
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMovieData(prev => ({ ...prev, posterImage: e.target.files![0] }));
    }
  };

  // Handle form submission to add a new movie
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await dispatch(addMovieAsync(movieData));
      closeModal();  // Close modal on successful submission
    } catch (error) {
      setError('Failed to add movie. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full m-4 overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-medium text-gray-900">Add New Movie</h3>
          <button onClick={closeModal} className="text-gray-400 hover:text-gray-500 focus:outline-none">
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={movieData.title}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="overview" className="block text-sm font-medium text-gray-700">Overview</label>
              <textarea
                id="overview"
                name="overview"
                value={movieData.overview}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              ></textarea>
            </div>
            <div>
              <label htmlFor="releaseDate" className="block text-sm font-medium text-gray-700">Release Date</label>
              <input
                type="date"
                id="releaseDate"
                name="releaseDate"
                value={movieData.releaseDate}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Genre</label>
              <select
                id="genre"
                name="genre"
                value={movieData.genre}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="">Select a genre</option>
                <option value="action">Action</option>
                <option value="comedy">Comedy</option>
                <option value="drama">Drama</option>
                <option value="sci-fi">Sci-Fi</option>
              </select>
            </div>
            <div>
              <label htmlFor="runtime" className="block text-sm font-medium text-gray-700">Runtime (minutes)</label>
              <input
                type="number"
                id="runtime"
                name="runtime"
                value={movieData.runtime}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="posterImage" className="block text-sm font-medium text-gray-700">Poster Image</label>
              <input
                type="file"
                id="posterImage"
                name="posterImage"
                onChange={handleImageChange}
                accept="image/*"
                className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100"
                required
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={closeModal}
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? 'Adding...' : 'Add Movie'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMovieModal;
