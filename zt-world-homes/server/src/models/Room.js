const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Standard', 'Deluxe', 'Suite', 'Family', 'Executive']
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  pricePerNight: {
    type: Number,
    required: true,
    min: 0
  },
  amenities: [{
    type: String
  }],
  photos: [{
    type: String // URLs to uploaded images
  }],
  description: {
    type: String
  },
  availability: [{
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['available', 'booked', 'blocked'],
      default: 'available'
    }
  }],
  airbnbCalendarUrl: {
    type: String // iCal URL for Airbnb sync
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for availability searches
roomSchema.index({ 'availability.startDate': 1, 'availability.endDate': 1 });
roomSchema.index({ property: 1, isActive: 1 });

module.exports = mongoose.model('Room', roomSchema);
