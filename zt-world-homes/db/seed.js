const mongoose = require('mongoose');
const { seedAdmin, seedSampleData } = require('./seeds');

const runSeeds = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/zt-world-homes', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Run seeds
    await seedAdmin();
    await seedSampleData();

    console.log('Database seeding completed');
    process.exit(0);
  } catch (error) {
    console.error('Database seeding failed:', error);
    process.exit(1);
  }
};

runSeeds();
