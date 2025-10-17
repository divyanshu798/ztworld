const mongoose = require('mongoose');
const path = require('path');

// Add the server src path to require User model
const User = require('../server/src/models/User');

const seedAdmin = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@ztworldhomes.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Create admin user
    const adminUser = new User({
      name: 'Z&T Admin',
      email: 'admin@ztworldhomes.com',
      password: 'admin123', // This will be hashed by the pre-save middleware
      role: 'admin'
    });

    await adminUser.save();
    console.log('Admin user created successfully');
    console.log('Email: admin@ztworldhomes.com');
    console.log('Password: admin123');
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

const seedSampleData = async () => {
  try {
    // Add sample properties and rooms here if needed
    console.log('Sample data seeding completed');
  } catch (error) {
    console.error('Error seeding sample data:', error);
  }
};

module.exports = {
  seedAdmin,
  seedSampleData
};
