
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { APP_TITLE, HeartIcon, PlusCircleIcon, UserIcon } from '../constants';

const Navbar: React.FC = () => {
  const location = useLocation();

  const navLinkClasses = (path: string) => 
    `flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out hover:bg-rose-100 hover:text-brand-primary ${
      location.pathname === path ? 'bg-rose-100 text-brand-primary' : 'text-brand-text-light'
    }`;

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/browse" className="flex items-center space-x-2 text-2xl font-bold text-brand-primary hover:opacity-80 transition-opacity">
            <HeartIcon className="w-8 h-8" />
            <span>{APP_TITLE}</span>
          </Link>
          <div className="flex items-center space-x-3">
            <Link to="/browse" className={navLinkClasses('/browse')}>
              <UserIcon className="w-5 h-5 mr-2" />
              Browse Profiles
            </Link>
            <Link to="/create" className={navLinkClasses('/create')}>
              <PlusCircleIcon className="w-5 h-5 mr-2" />
              Create Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
