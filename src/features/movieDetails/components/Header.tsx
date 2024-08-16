import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
            <div className='flex items-center px-4 py-3'>
                <Link to={'/'}>
                    <button className="flex items-center text-white hover:text-gray-200">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                    </button>
                </Link>
                <h1 className="text-2xl font-bold tracking-tight text-white">Movie Details</h1>
            </div>

        </header>
    );
};

export default Header;
