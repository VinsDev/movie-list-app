import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import FilterOptions from './FilterOptions';

interface HeaderProps {
    openModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ openModal }) => {
    return (
        <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
            <div className="container mx-auto px-4 py-3">
                <div className="flex flex-col space-y-3">
                    <div className="flex justify-between items-center">
                        <Link to='/'>
                            <h1 className="text-2xl font-bold tracking-tight text-white">MoviesList</h1>
                        </Link>
                            <button
                                onClick={openModal}
                                className="px-4 py-2 bg-white text-indigo-600 font-semibold rounded-full text-sm shadow-md hover:bg-opacity-90 transition duration-300 ease-in-out"
                            >
                                + Add Movie
                            </button>
                    </div>
                    <div className="w-full">
                        <SearchBar />
                    </div>
                </div>
                <div className=''>
                    <FilterOptions />
                </div>
            </div>
        </header>
    );
};

export default Header;