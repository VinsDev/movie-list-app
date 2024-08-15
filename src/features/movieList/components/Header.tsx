import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import FilterOptions from './FilterOptions';

interface HeaderProps {
    openModal: () => void;
    showButton: boolean;
}

const Header: React.FC<HeaderProps> = ({ openModal, showButton }) => {
    return (
        <header className="sticky top-0 z-50 bg-white p-4 w-full">
            <div className="flex flex-col md:flex-row justify-between items-center w-full md:pl-4">
                <Link to='/'>
                    <h1 className="text-3xl font-medium">Movie List</h1>
                </Link>
                <div className="w-full md:w-1/2 mt-3 md:mt-0">
                    <SearchBar />
                </div>
                {showButton && (
                    <button
                        onClick={openModal}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-2 md:mt-0"
                    >
                        Add New Movie
                    </button>
                )}
            </div>
            <div className='pt-4'>
                <FilterOptions />
            </div>
        </header>
    );
};

export default Header;
