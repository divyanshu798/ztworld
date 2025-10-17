require('dotenv').config();
const mongoose = require('mongoose');
const Property = require('./src/models/Property');
const Room = require('./src/models/Room');
const User = require('./src/models/User');

const addDemoProperty = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/zt-world-homes', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Find admin user to set as property creator
    const adminUser = await User.findOne({ role: 'admin' });
    if (!adminUser) {
      console.log('Admin user not found. Please run seed script first.');
      process.exit(1);
    }

    // Check if demo property already exists
    const existingProperty = await Property.findOne({ name: 'Paradise Guest House' });
    if (existingProperty) {
      console.log('Demo property already exists');
      process.exit(0);
    }

    // Create demo property
    const demoProperty = new Property({
      name: 'Paradise Guest House',
      description: 'A beautiful guest house located in the heart of the city with modern amenities and comfortable accommodations. Perfect for business travelers and tourists alike.',
      location: {
        address: '123 Paradise Street, Central District',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        pincode: '400001',
        coordinates: {
          lat: 19.0760,
          lng: 72.8777
        }
      },
      photos: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'
      ],
      amenities: [
        'Free WiFi',
        'Air Conditioning',
        'Parking',
        'Restaurant',
        '24/7 Reception',
        'Room Service',
        'Laundry Service',
        'Airport Shuttle'
      ],
      createdBy: adminUser._id,
      isActive: true
    });

    await demoProperty.save();
    console.log('Demo property created:', demoProperty.name);

    // Create demo rooms for the property
    const demoRooms = [
      {
        property: demoProperty._id,
        name: 'Deluxe Room 101',
        type: 'Deluxe',
        capacity: 2,
        pricePerNight: 3500,
        amenities: ['King Bed', 'City View', 'Mini Bar', 'Safe', 'Work Desk'],
        photos: [
          'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
          'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800'
        ],
        description: 'Spacious deluxe room with city view and modern amenities',
        availability: [
          {
            startDate: new Date('2025-09-05'),
            endDate: new Date('2025-12-31'),
            status: 'available'
          }
        ],
        isActive: true
      },
      {
        property: demoProperty._id,
        name: 'Suite Room 201',
        type: 'Suite',
        capacity: 4,
        pricePerNight: 5500,
        amenities: ['King Bed', 'Sofa Bed', 'Balcony', 'Mini Bar', 'Safe', 'Work Desk', 'Kitchenette'],
        photos: [
          'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'
        ],
        description: 'Luxurious suite with separate living area and balcony',
        availability: [
          {
            startDate: new Date('2025-09-05'),
            endDate: new Date('2025-12-31'),
            status: 'available'
          }
        ],
        isActive: true
      },
      {
        property: demoProperty._id,
        name: 'Standard Room 102',
        type: 'Standard',
        capacity: 2,
        pricePerNight: 2500,
        amenities: ['Queen Bed', 'Window View', 'Safe', 'Work Desk'],
        photos: [
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800'
        ],
        description: 'Comfortable standard room with essential amenities',
        availability: [
          {
            startDate: new Date('2025-09-05'),
            endDate: new Date('2025-12-31'),
            status: 'available'
          }
        ],
        isActive: true
      }
    ];

    // Save rooms and update property with room references
    const savedRooms = [];
    for (const roomData of demoRooms) {
      const room = new Room(roomData);
      await room.save();
      savedRooms.push(room._id);
      console.log('Demo room created:', room.name);
    }

    // Update property with room references
    demoProperty.rooms = savedRooms;
    await demoProperty.save();

    console.log('Demo property and rooms created successfully!');
    console.log('Property:', demoProperty.name);
    console.log('Rooms:', savedRooms.length);

    process.exit(0);
  } catch (error) {
    console.error('Error creating demo property:', error);
    process.exit(1);
  }
};

addDemoProperty();
