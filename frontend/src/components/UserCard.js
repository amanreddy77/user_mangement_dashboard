import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Building, MapPin, Edit, Trash2, Eye } from 'lucide-react';

const UserCard = ({ user, onDelete }) => {
  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this user?')) {
      onDelete(user._id);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200 group w-full">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 min-w-0 pr-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 truncate">
            {user.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{user.company}</p>
        </div>
        <div className="flex space-x-1 ml-2 flex-shrink-0">
          <Link
            to={`/users/${user._id}`}
            className="p-2 text-gray-400 dark:text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/30"
            title="View Details"
          >
            <Eye className="h-4 w-4" />
          </Link>
          <Link
            to={`/users/${user._id}/edit`}
            className="p-2 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30"
            title="Edit User"
          >
            <Edit className="h-4 w-4" />
          </Link>
          <button
            onClick={handleDelete}
            className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30"
            title="Delete User"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
          <Mail className="h-4 w-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
          <span className="truncate text-sm">{user.email}</span>
        </div>
        
        <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
          <Phone className="h-4 w-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
          <span className="truncate text-sm">{user.phone}</span>
        </div>
        
        <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
          <MapPin className="h-4 w-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
          <span className="truncate text-sm">
            {user.address.city}, {user.address.zipcode}
          </span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
          <span>Created: {new Date(user.createdAt).toLocaleDateString()}</span>
          <span>Updated: {new Date(user.updatedAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
