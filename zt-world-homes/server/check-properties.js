require('dotenv').config();
const mongoose = require('mongoose');
const Property = require('./src/models/Property');
const Room = require('./src/models/Room');

const checkProperties = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/zt-world-homes');
    console.log('Connected to MongoDB');
    
    const properties = await Property.find({}).populate('rooms');
    console.log('Found', properties.length, 'properties:');
    
    properties.forEach(prop => {
      console.log('- Property:', prop.name, '| Rooms:', prop.rooms.length, '| Active:', prop.isActive);
      console.log('  Location:', prop.location.city, ',', prop.location.state);
      console.log('  Created:', prop.createdAt);
    });
    
    if (properties.length === 0) {
      console.log('No properties found in database!');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkProperties();
