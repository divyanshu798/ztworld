const mongoose = require('mongoose');
const User = require('./User');
const Property = require('./Property');
const Room = require('./Room');
const Booking = require('./Booking');
const Payment = require('./Payment');

// Export all models
module.exports = {
  User,
  Property,
  Room,
  Booking,
  Payment
};
