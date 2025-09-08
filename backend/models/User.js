const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: [true, 'Street is required']
  },
  city: {
    type: String,
    required: [true, 'City is required']
  },
  zipcode: {
    type: String,
    required: [true, 'Zipcode is required']
  },
  geo: {
    lat: {
      type: Number,
      required: [true, 'Latitude is required']
    },
    lng: {
      type: Number,
      required: [true, 'Longitude is required']
    }
  }
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  company: {
    type: String,
    required: [true, 'Company is required'],
    trim: true,
    minlength: [2, 'Company name must be at least 2 characters long'],
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  address: {
    type: addressSchema,
    required: [true, 'Address is required']
  },
  confirmation: {
    type: String,
    required: [true, 'Confirmation is required'],
    trim: true,
    minlength: [2, 'Confirmation must be at least 2 characters long'],
    maxlength: [100, 'Confirmation cannot exceed 100 characters']
  }
}, {
  timestamps: true
});

// Index for better query performance
userSchema.index({ name: 1 });

module.exports = mongoose.model('User', userSchema);
