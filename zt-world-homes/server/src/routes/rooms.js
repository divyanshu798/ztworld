const express = require('express');
const Room = require('../models/Room');
const Property = require('../models/Property');
const { auth, adminAuth } = require('../middleware/auth');
const Joi = require('joi');

const router = express.Router();

// Validation schema
const roomSchema = Joi.object({
  property: Joi.string().required(),
  name: Joi.string().min(1).max(50).required(),
  type: Joi.string().valid('Standard', 'Deluxe', 'Suite', 'Family', 'Executive').required(),
  capacity: Joi.number().min(1).required(),
  pricePerNight: Joi.number().min(0).required(),
  amenities: Joi.array().items(Joi.string()),
  photos: Joi.array().items(Joi.string().uri()),
  description: Joi.string(),
  airbnbCalendarUrl: Joi.string().uri().optional()
});

// Get rooms with filters (public)
router.get('/', async (req, res) => {
  try {
    const { 
      propertyId, 
      type, 
      minPrice, 
      maxPrice, 
      capacity,
      checkIn,
      checkOut,
      page = 1, 
      limit = 10 
    } = req.query;

    const filter = { isActive: true };
    
    if (propertyId) filter.property = propertyId;
    if (type) filter.type = type;
    if (capacity) filter.capacity = { $gte: parseInt(capacity) };
    if (minPrice || maxPrice) {
      filter.pricePerNight = {};
      if (minPrice) filter.pricePerNight.$gte = parseInt(minPrice);
      if (maxPrice) filter.pricePerNight.$lte = parseInt(maxPrice);
    }

    // TODO: Add availability filter based on checkIn/checkOut dates
    
    const rooms = await Room.find(filter)
      .populate('property', 'name location')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Room.countDocuments(filter);

    res.json({
      rooms,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get rooms error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single room (public)
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id)
      .populate('property');

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.json({ room });
  } catch (error) {
    console.error('Get room error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get room availability (public)
router.get('/:id/availability', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Filter availability based on date range
    let availability = room.availability;
    
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      availability = availability.filter(slot => {
        const slotStart = new Date(slot.startDate);
        const slotEnd = new Date(slot.endDate);
        return slotStart <= end && slotEnd >= start;
      });
    }

    res.json({ availability });
  } catch (error) {
    console.error('Get availability error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create room (admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const { error } = roomSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Verify property exists
    const property = await Property.findById(req.body.property);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    const room = new Room(req.body);
    await room.save();

    // Add room to property
    property.rooms.push(room._id);
    await property.save();

    res.status(201).json({
      message: 'Room created successfully',
      room
    });
  } catch (error) {
    console.error('Create room error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update room (admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const { error } = roomSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const room = await Room.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.json({
      message: 'Room updated successfully',
      room
    });
  } catch (error) {
    console.error('Update room error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete room (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Soft delete - just mark as inactive
    room.isActive = false;
    await room.save();

    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error('Delete room error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Sync calendar with Airbnb (admin only)
router.post('/:id/sync-calendar', adminAuth, async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // TODO: Implement Airbnb calendar sync logic
    // This would involve fetching the iCal data and updating availability
    
    res.json({ message: 'Calendar sync initiated' });
  } catch (error) {
    console.error('Calendar sync error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
