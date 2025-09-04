import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Save, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { userAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const fetchUser = useCallback(async () => {
    try {
      setInitialLoading(true);
      const response = await userAPI.getUser(id);
      const user = response.data;
      
      // Reset form with user data
      reset({
        name: user.name,
        email: user.email,
        phone: user.phone,
        company: user.company,
        address: {
          street: user.address.street,
          city: user.address.city,
          zipcode: user.address.zipcode,
          geo: {
            lat: user.address.geo.lat.toString(),
            lng: user.address.geo.lng.toString()
          }
        }
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      if (error.response?.status === 404) {
        toast.error('User not found');
        navigate('/');
      } else {
        toast.error('Failed to fetch user details');
      }
    } finally {
      setInitialLoading(false);
    }
  }, [id, reset, navigate]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      
      // Convert geo coordinates to numbers
      const userData = {
        ...data,
        address: {
          ...data.address,
          geo: {
            lat: parseFloat(data.address.geo.lat),
            lng: parseFloat(data.address.geo.lng)
          }
        }
      };

      await userAPI.updateUser(id, userData);
      toast.success('User updated successfully!');
      navigate(`/users/${id}`);
    } catch (error) {
      console.error('Error updating user:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update user';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(`/users/${id}`);
  };

  if (initialLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" text="Loading user details..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button
            onClick={handleCancel}
            className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to User Details</span>
          </button>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 transition-colors duration-200">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Edit User</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">Update the user information below.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="p-2 bg-primary-100 rounded-lg mr-3">
                <User className="h-5 w-5 text-primary-600" />
              </div>
              Basic Information
            </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                {...register('name', { 
                  required: 'Name is required',
                  minLength: { value: 2, message: 'Name must be at least 2 characters' },
                  maxLength: { value: 50, message: 'Name cannot exceed 50 characters' }
                })}
                className={`input-field ${errors.name ? 'input-error' : ''}`}
                placeholder="Enter full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: 'Please enter a valid email address'
                  }
                })}
                className={`input-field ${errors.email ? 'input-error' : ''}`}
                placeholder="Enter email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                {...register('phone', { 
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[+]?[1-9][\d]{0,15}$/,
                    message: 'Please enter a valid phone number'
                  }
                })}
                className={`input-field ${errors.phone ? 'input-error' : ''}`}
                placeholder="Enter phone number"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company *
              </label>
              <input
                type="text"
                {...register('company', { 
                  required: 'Company is required',
                  minLength: { value: 2, message: 'Company name must be at least 2 characters' },
                  maxLength: { value: 100, message: 'Company name cannot exceed 100 characters' }
                })}
                className={`input-field ${errors.company ? 'input-error' : ''}`}
                placeholder="Enter company name"
              />
              {errors.company && (
                <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>
              )}
            </div>
          </div>
        </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="p-2 bg-primary-100 rounded-lg mr-3">
                <User className="h-5 w-5 text-primary-600" />
              </div>
              Address Information
            </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Street Address *
              </label>
              <input
                type="text"
                {...register('address.street', { 
                  required: 'Street address is required'
                })}
                className={`input-field ${errors.address?.street ? 'input-error' : ''}`}
                placeholder="Enter street address"
              />
              {errors.address?.street && (
                <p className="mt-1 text-sm text-red-600">{errors.address.street.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  {...register('address.city', { 
                    required: 'City is required'
                  })}
                  className={`input-field ${errors.address?.city ? 'input-error' : ''}`}
                  placeholder="Enter city"
                />
                {errors.address?.city && (
                  <p className="mt-1 text-sm text-red-600">{errors.address.city.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zip Code *
                </label>
                <input
                  type="text"
                  {...register('address.zipcode', { 
                    required: 'Zip code is required'
                  })}
                  className={`input-field ${errors.address?.zipcode ? 'input-error' : ''}`}
                  placeholder="Enter zip code"
                />
                {errors.address?.zipcode && (
                  <p className="mt-1 text-sm text-red-600">{errors.address.zipcode.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Latitude *
                </label>
                <input
                  type="number"
                  step="any"
                  {...register('address.geo.lat', { 
                    required: 'Latitude is required',
                    min: { value: -90, message: 'Latitude must be between -90 and 90' },
                    max: { value: 90, message: 'Latitude must be between -90 and 90' }
                  })}
                  className={`input-field ${errors.address?.geo?.lat ? 'input-error' : ''}`}
                  placeholder="Enter latitude"
                />
                {errors.address?.geo?.lat && (
                  <p className="mt-1 text-sm text-red-600">{errors.address.geo.lat.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Longitude *
                </label>
                <input
                  type="number"
                  step="any"
                  {...register('address.geo.lng', { 
                    required: 'Longitude is required',
                    min: { value: -180, message: 'Longitude must be between -180 and 180' },
                    max: { value: 180, message: 'Longitude must be between -180 and 180' }
                  })}
                  className={`input-field ${errors.address?.geo?.lng ? 'input-error' : ''}`}
                  placeholder="Enter longitude"
                />
                {errors.address?.geo?.lng && (
                  <p className="mt-1 text-sm text-red-600">{errors.address.geo.lng.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleCancel}
                className="btn-secondary px-6 py-3"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary flex items-center space-x-2 px-6 py-3"
                disabled={loading}
              >
                {loading ? (
                  <LoadingSpinner size="sm" text="" />
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    <span>Update User</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
