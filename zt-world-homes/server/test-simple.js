const mongoose = require('mongoose');
const Property = require('./src/models/Property');
require('dotenv').config();

const testProperty = {
  name: "Test Airbnb Image Property",
  description: "Testing property with Airbnb image URL",
  location: {
    address: "123 Test Street",
    city: "Mumbai",
    state: "Maharashtra", 
    country: "India",
    pincode: "400001"
  },
  photos: [
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTQ5NDg4NzI5NDg2NTkwNDU3MQ==/original/4d9c7628-54cb-40f3-87a7-5890bfbcd152.jpeg?im_w=1200"
  ],
  amenities: ["WiFi", "AC", "TV"]
};

async function testAirbnbUrl() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const property = new Property(testProperty);
    const savedProperty = await property.save();
    
    console.log('✅ Successfully saved property with Airbnb URL!');
    console.log('Property ID:', savedProperty._id);
    console.log('Photo URL:', savedProperty.photos[0]);
    
    mongoose.connection.close();
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.errors) {
      console.error('Validation errors:', error.errors);
    }
    mongoose.connection.close();
    process.exit(1);
  }
}

testAirbnbUrl();
