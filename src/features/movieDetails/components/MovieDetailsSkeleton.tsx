import React from 'react';

const MovieDetailsSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-pulse">
      <div className="lg:w-1/3">
        <div className="w-full h-80 bg-gray-300 rounded-xl"></div>
      </div>
      <div className="lg:w-2/3">
        <div className="h-10 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-6 bg-gray-300 rounded w-full mb-6"></div>
        <div className="h-6 bg-gray-300 rounded w-5/6 mb-6"></div>
        <div className="h-6 bg-gray-300 rounded w-4/5 mb-6"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
            <ul className="space-y-2">
              <li className="h-4 bg-gray-300 rounded w-2/3"></li>
              <li className="h-4 bg-gray-300 rounded w-1/2"></li>
              <li className="h-4 bg-gray-300 rounded w-1/3"></li>
              <li className="h-4 bg-gray-300 rounded w-3/4"></li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
            <ul className="space-y-2">
              <li className="h-4 bg-gray-300 rounded w-2/3"></li>
              <li className="h-4 bg-gray-300 rounded w-1/2"></li>
              <li className="h-4 bg-gray-300 rounded w-3/4"></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsSkeleton;
