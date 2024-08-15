import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="sticky top-0 z-50 bg-white p-4 w-full">
            <div className='flex items-center'>
                <Link to={'/'}>
                    <button className="flex items-center text-gray-800 hover:text-black">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                    </button>
                </Link>
                <h1 className="text-3xl font-medium">Movie Details Page</h1>
            </div>

        </header>
    );
};

export default Header;
