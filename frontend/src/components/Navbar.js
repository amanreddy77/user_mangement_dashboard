import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, Plus, Home } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-200">
      <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <div className="p-1.5 bg-primary-50 dark:bg-primary-900/30 rounded-lg">
                <Users className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              </div>
              <span>User Management</span>
            </Link>
            
            <div className="hidden md:flex space-x-1">
              <Link
                to="/"
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive('/') 
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              
              <Link
                to="/users/new"
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive('/users/new') 
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Plus className="h-4 w-4" />
                <span>Add User</span>
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block text-sm text-gray-500 dark:text-gray-400">
              User Management Dashboard
            </div>
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
