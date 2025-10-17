const express = require('express');
const Property = require('../models/Property');
const Room = require('../models/Room');
const { auth, adminAuth } = require('../middleware/auth');
const Joi = require('joi');
const multer = require('multer');
const path = require('path');

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads/properties'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '_'));
  }
});
const upload = multer({ storage, limits: { files: 30 } });

const router = express.Router();

// Validation schema
const propertySchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(10).required(),
  location: Joi.object({
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().default('India'),
    pincode: Joi.string().required(),
    coordinates: Joi.object({
      lat: Joi.number(),
      lng: Joi.number()
    }).optional()
  }).required(),
  photos: Joi.array().items(Joi.string().uri()),
  amenities: Joi.array().items(Joi.string())
});

// Get all properties (public)
router.get('/', async (req, res) => {
  try {
    const { city, state, page = 1, limit = 10 } = req.query;
    
    const filter = { isActive: true };
    if (city) filter['location.city'] = new RegExp(city, 'i');
    if (state) filter['location.state'] = new RegExp(state, 'i');

    const properties = await Property.find(filter)
      .populate('rooms', 'name type pricePerNight photos')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Property.countDocuments(filter);

    res.json({
      properties,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get properties error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single property (public)
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate({
        path: 'rooms',
        match: { isActive: true },
        select: 'name type capacity pricePerNight photos description amenities'
      })
      .populate('createdBy', 'name email');

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json({ property });
  } catch (error) {
    console.error('Get property error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get rooms for a property (public)
router.get('/:id/rooms', async (req, res) => {
  try {
    const propertyId = req.params.id;
    
    // Check if property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Get all rooms for this property
    const Room = require('../models/Room');
    const rooms = await Room.find({ property: propertyId, isActive: true });

    res.json({ rooms });
  } catch (error) {
    console.error('Get property rooms error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create property (admin only, with file upload)
router.post('/', adminAuth, upload.array('photos', 30), async (req, res) => {
  try {
    // Parse amenities and location from form-data if sent as JSON strings
    let amenities = req.body.amenities;
    if (typeof amenities === 'string') {
      amenities = amenities.split('\n').map(a => a.trim()).filter(Boolean);
    }
    let location = {
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      pincode: req.body.pincode
    };
    // Collect photo URLs from uploaded files
    let photoUrls = [];
    if (req.files && req.files.length > 0) {
      photoUrls = req.files.map(file => `/uploads/properties/${file.filename}`);
    }
    // Also accept photoUrls from text input
    if (req.body.photoUrls) {
      if (Array.isArray(req.body.photoUrls)) {
        photoUrls = photoUrls.concat(req.body.photoUrls);
      } else if (typeof req.body.photoUrls === 'string') {
        photoUrls = photoUrls.concat(req.body.photoUrls.split('\n').map(u => u.trim()).filter(Boolean));
      }
    }
    const property = new Property({
      name: req.body.name,
      description: req.body.description,
      location,
      photos: photoUrls,
      amenities,
      createdBy: req.user._id
    });
    await property.save();
    res.status(201).json({ message: 'Property created successfully', property });
  } catch (error) {
    console.error('Create property error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update property (admin only, with file upload)
router.put('/:id', adminAuth, upload.array('photos', 30), async (req, res) => {
  try {
    let amenities = req.body.amenities;
    if (typeof amenities === 'string') {
      amenities = amenities.split('\n').map(a => a.trim()).filter(Boolean);
    }
    let location = {
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      pincode: req.body.pincode
    };
    let photoUrls = [];
    if (req.files && req.files.length > 0) {
      photoUrls = req.files.map(file => `/uploads/properties/${file.filename}`);
    }
    if (req.body.photoUrls) {
      if (Array.isArray(req.body.photoUrls)) {
        photoUrls = photoUrls.concat(req.body.photoUrls);
      } else if (typeof req.body.photoUrls === 'string') {
        photoUrls = photoUrls.concat(req.body.photoUrls.split('\n').map(u => u.trim()).filter(Boolean));
      }
    }
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        location,
        photos: photoUrls,
        amenities
      },
      { new: true, runValidators: true }
    );
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json({ message: 'Property updated successfully', property });
  } catch (error) {
    console.error('Update property error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete property (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Soft delete - just mark as inactive
    property.isActive = false;
    await property.save();

    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Delete property error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
