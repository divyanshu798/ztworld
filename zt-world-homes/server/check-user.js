const mongoose = require('mongoose');
require('dotenv').config();

// Import User model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  phone: {
    type: String,
    trim: true
  },
  avatar: {
    type: String
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  passwordResetToken: String,
  passwordResetExpires: Date
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

async function checkUserPassword() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/zt-world-homes', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB');
    
    // Find user by email
    const user = await User.findOne({ email: 'divyanshutomar943@gmail.com' });
    
    if (user) {
      console.log('User found:');
      console.log('Name:', user.name);
      console.log('Email:', user.email);
      console.log('Role:', user.role);
      console.log('Phone:', user.phone);
      console.log('Created At:', user.createdAt);
      console.log('Password (hashed):', user.password);
      console.log('Is Email Verified:', user.isEmailVerified);
      
      // Note: Passwords are hashed with bcrypt, so we cannot see the original password
      console.log('\nNote: The password is hashed using bcrypt for security.');
      console.log('You cannot retrieve the original password, only verify against it.');
    } else {
      console.log('User with email divyanshutomar943@gmail.com not found in the database.');
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the function
checkUserPassword();