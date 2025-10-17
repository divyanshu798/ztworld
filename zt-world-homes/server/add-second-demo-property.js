require('dotenv').config();
const mongoose = require('mongoose');
const Property = require('./src/models/Property');
const Room = require('./src/models/Room');
const User = require('./src/models/User');

const addSecondDemoProperty = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/zt-world-homes', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Find admin user
    const adminUser = await User.findOne({ role: 'admin' });
    if (!adminUser) {
      console.log('Admin user not found. Please run seed script first.');
      process.exit(1);
    }

    // Check if this demo property already exists
    const existingProperty = await Property.findOne({ name: 'Ocean View Retreat' });
    if (existingProperty) {
      console.log('Second demo property already exists');
      process.exit(0);
    }

    // Create second demo property
    const demoProperty2 = new Property({
      name: 'Ocean View Retreat',
      description: 'A serene beachside guest house offering stunning ocean views and tranquil accommodations. Perfect for relaxation and rejuvenation with direct beach access.',
      location: {
        address: '456 Coastal Highway, Beach Road',
        city: 'Goa',
        state: 'Goa',
        country: 'India',
        pincode: '403001',
        coordinates: {
          lat: 15.2993,
          lng: 74.1240
        }
      },
      photos: [
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800',
        'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800'
      ],
      amenities: [
        'Free WiFi',
        'Beach Access',
        'Swimming Pool',
        'Restaurant',
        'Bar',
        'Spa Services',
        'Water Sports',
        'Bicycle Rental',
        'Garden View'
      ],
      createdBy: adminUser._id,
      isActive: true
    });

    await demoProperty2.save();
    console.log('Second demo property created:', demoProperty2.name);

    // Create demo rooms for the second property
    const demoRooms2 = [
      {
        property: demoProperty2._id,
        name: 'Ocean View Suite 301',
        type: 'Suite',
        capacity: 3,
        pricePerNight: 6500,
        amenities: ['King Bed', 'Ocean View', 'Balcony', 'Mini Bar', 'Safe', 'Jacuzzi'],
        photos: [
          'https://images.unsplash.com/photo-1578774296842-c45e2d2d2149?w=800',
          'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800'
        ],
        description: 'Premium ocean view suite with private balcony and jacuzzi',
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
        property: demoProperty2._id,
        name: 'Beach Villa 401',
        type: 'Family',
        capacity: 6,
        pricePerNight: 8500,
        amenities: ['2 Bedrooms', 'Living Room', 'Kitchen', 'Beach Access', 'Private Deck', 'BBQ Area'],
        photos: [
          'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'
        ],
        description: 'Spacious family villa with direct beach access and private deck',
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
        property: demoProperty2._id,
        name: 'Garden Room 302',
        type: 'Deluxe',
        capacity: 2,
        pricePerNight: 4500,
        amenities: ['Queen Bed', 'Garden View', 'Patio', 'Mini Fridge', 'Safe'],
        photos: [
          'https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?w=800'
        ],
        description: 'Peaceful garden view room with private patio',
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
    const savedRooms2 = [];
    for (const roomData of demoRooms2) {
      const room = new Room(roomData);
      await room.save();
      savedRooms2.push(room._id);
      console.log('Demo room created:', room.name);
    }

    // Update property with room references
    demoProperty2.rooms = savedRooms2;
    await demoProperty2.save();

    console.log('Second demo property and rooms created successfully!');
    console.log('Property:', demoProperty2.name);
    console.log('Rooms:', savedRooms2.length);

    process.exit(0);
  } catch (error) {
    console.error('Error creating second demo property:', error);
    process.exit(1);
  }
};

addSecondDemoProperty();
