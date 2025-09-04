import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Mail, Phone, Building, MapPin, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import { userAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const response = await userAPI.getUser(id);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      if (error.response?.status === 404) {
        toast.error('User not found');
        navigate('/');
      } else {
        toast.error('Failed to fetch user details');
      }
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        await userAPI.deleteUser(id);
        toast.success('User deleted successfully');
        navigate('/');
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Failed to delete user');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" text="Loading user details..." />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">User Not Found</h2>
        <p className="text-gray-600 mb-6">The user you're looking for doesn't exist.</p>
        <Link to="/" className="btn-primary">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 overflow-hidden">
      <div className="h-full flex flex-col">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        <div className="flex-1 px-4 sm:px-6 lg:px-8 pb-4">
          <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* User Info Card */}
            <div className="lg:col-span-2">
              <div className="h-full bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 transition-colors duration-200 overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">{user.company}</p>
                  </div>
                  <div className="flex space-x-3">
                    <Link
                      to={`/users/${user._id}/edit`}
                      className="btn-secondary flex items-center space-x-2"
                    >
                      <Edit className="h-4 w-4" />
                      <span>Edit</span>
                    </Link>
                    <button
                      onClick={handleDelete}
                      className="btn-danger flex items-center space-x-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>

              <div className="space-y-6">
                {/* Contact Information */}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h2>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Email</p>
                          <p className="text-gray-900 dark:text-white">{user.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Phone</p>
                          <p className="text-gray-900 dark:text-white">{user.phone}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Building className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Company</p>
                          <p className="text-gray-900 dark:text-white">{user.company}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Address</h2>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-5 w-5 text-gray-400 dark:text-gray-500 mt-1" />
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Full Address</p>
                          <p className="text-gray-900 dark:text-white">
                            {user.address.street}<br />
                            {user.address.city}, {user.address.zipcode}
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Coordinates</p>
                          <p className="text-gray-900 dark:text-white">
                            Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="h-full flex flex-col space-y-6">
              {/* Account Information */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-colors duration-200">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Created</p>
                      <p className="text-gray-900 dark:text-white">
                        {new Date(user.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Last Updated</p>
                      <p className="text-gray-900 dark:text-white">
                        {new Date(user.updatedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-colors duration-200">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Link
                    to={`/users/${user._id}/edit`}
                    className="w-full btn-secondary flex items-center justify-center space-x-2"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit User</span>
                  </Link>
                  
                  <button
                    onClick={handleDelete}
                    className="w-full btn-danger flex items-center justify-center space-x-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete User</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
