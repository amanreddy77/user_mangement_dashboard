const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const sampleUsers = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    company: 'Acme Corporation',
    address: {
      street: '123 Main Street',
      city: 'New York',
      zipcode: '10001',
      geo: {
        lat: 40.7128,
        lng: -74.0060
      }
    }
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@techcorp.com',
    phone: '+1987654321',
    company: 'TechCorp Solutions',
    address: {
      street: '456 Oak Avenue',
      city: 'San Francisco',
      zipcode: '94102',
      geo: {
        lat: 37.7749,
        lng: -122.4194
      }
    }
  },
  {
    name: 'Mike Johnson',
    email: 'mike.johnson@startup.io',
    phone: '+1555123456',
    company: 'Startup Inc',
    address: {
      street: '789 Pine Street',
      city: 'Seattle',
      zipcode: '98101',
      geo: {
        lat: 47.6062,
        lng: -122.3321
      }
    }
  },
  {
    name: 'Sarah Wilson',
    email: 'sarah.wilson@designco.com',
    phone: '+1444333222',
    company: 'Design Co',
    address: {
      street: '321 Elm Drive',
      city: 'Austin',
      zipcode: '73301',
      geo: {
        lat: 30.2672,
        lng: -97.7431
      }
    }
  },
  {
    name: 'David Brown',
    email: 'david.brown@consulting.com',
    phone: '+1777888999',
    company: 'Brown Consulting',
    address: {
      street: '654 Maple Lane',
      city: 'Chicago',
      zipcode: '60601',
      geo: {
        lat: 41.8781,
        lng: -87.6298
      }
    }
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/user-management');

    console.log('Connected to MongoDB');

    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Insert sample users
    const users = await User.insertMany(sampleUsers);
    console.log(`Inserted ${users.length} sample users`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeder if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
