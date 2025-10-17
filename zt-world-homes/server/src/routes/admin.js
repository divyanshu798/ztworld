const express = require('express');
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');
const Property = require('../models/Property');
const Room = require('../models/Room');
const User = require('../models/User');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Dashboard statistics
router.get('/dashboard', adminAuth, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    // Date range filter
    const dateFilter = {};
    if (startDate && endDate) {
      dateFilter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    // Basic counts
    const [
      totalProperties,
      totalRooms,
      totalUsers,
      totalBookings,
      pendingBookings,
      confirmedBookings,
      cancelledBookings,
      completedBookings
    ] = await Promise.all([
      Property.countDocuments({ isActive: true }),
      Room.countDocuments({ isActive: true }),
      User.countDocuments({ role: 'user' }),
      Booking.countDocuments(dateFilter),
      Booking.countDocuments({ ...dateFilter, status: 'pending' }),
      Booking.countDocuments({ ...dateFilter, status: 'confirmed' }),
      Booking.countDocuments({ ...dateFilter, status: 'cancelled' }),
      Booking.countDocuments({ ...dateFilter, status: 'completed' })
    ]);

    // Revenue statistics
    const revenueData = await Payment.aggregate([
      {
        $match: {
          status: 'success',
          ...dateFilter
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$amount' },
          totalTransactions: { $sum: 1 },
          averageBookingValue: { $avg: '$amount' }
        }
      }
    ]);

    const revenue = revenueData[0] || {
      totalRevenue: 0,
      totalTransactions: 0,
      averageBookingValue: 0
    };

    // Monthly revenue trend
    const monthlyRevenue = await Payment.aggregate([
      {
        $match: {
          status: 'success',
          createdAt: {
            $gte: new Date(new Date().getFullYear(), 0, 1) // This year
          }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          revenue: { $sum: '$amount' },
          bookings: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    // Popular properties
    const popularProperties = await Booking.aggregate([
      {
        $match: {
          status: { $in: ['confirmed', 'completed'] },
          ...dateFilter
        }
      },
      {
        $group: {
          _id: '$property',
          bookings: { $sum: 1 },
          revenue: { $sum: '$totalAmount' }
        }
      },
      {
        $lookup: {
          from: 'properties',
          localField: '_id',
          foreignField: '_id',
          as: 'property'
        }
      },
      {
        $unwind: '$property'
      },
      {
        $sort: { bookings: -1 }
      },
      {
        $limit: 5
      }
    ]);

    // Recent bookings
    const recentBookings = await Booking.find()
      .populate('user', 'name email')
      .populate('room', 'name type')
      .populate('property', 'name location')
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      summary: {
        totalProperties,
        totalRooms,
        totalUsers,
        totalBookings,
        pendingBookings,
        confirmedBookings,
        cancelledBookings,
        completedBookings
      },
      revenue,
      monthlyRevenue,
      popularProperties,
      recentBookings
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all transactions
router.get('/transactions', adminAuth, async (req, res) => {
  try {
    const { status, startDate, endDate, page = 1, limit = 20 } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const transactions = await Payment.find(filter)
      .populate({
        path: 'booking',
        populate: {
          path: 'room property user',
          select: 'name type location email'
        }
      })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Payment.countDocuments(filter);

    res.json({
      transactions,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get booking analytics
router.get('/analytics/bookings', adminAuth, async (req, res) => {
  try {
    const { period = 'month' } = req.query; // day, week, month, year

    let groupBy;
    switch (period) {
      case 'day':
        groupBy = {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
          day: { $dayOfMonth: '$createdAt' }
        };
        break;
      case 'week':
        groupBy = {
          year: { $year: '$createdAt' },
          week: { $week: '$createdAt' }
        };
        break;
      case 'year':
        groupBy = {
          year: { $year: '$createdAt' }
        };
        break;
      default: // month
        groupBy = {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' }
        };
    }

    const analytics = await Booking.aggregate([
      {
        $group: {
          _id: groupBy,
          totalBookings: { $sum: 1 },
          confirmedBookings: {
            $sum: { $cond: [{ $eq: ['$status', 'confirmed'] }, 1, 0] }
          },
          cancelledBookings: {
            $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] }
          },
          totalRevenue: { $sum: '$totalAmount' },
          averageBookingValue: { $avg: '$totalAmount' }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1, '_id.week': 1 }
      }
    ]);

    res.json({ analytics });
  } catch (error) {
    console.error('Booking analytics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Export data
router.get('/export/:type', adminAuth, async (req, res) => {
  try {
    const { type } = req.params;
    const { startDate, endDate, format = 'json' } = req.query;

    const dateFilter = {};
    if (startDate && endDate) {
      dateFilter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    let data;
    switch (type) {
      case 'bookings':
        data = await Booking.find(dateFilter)
          .populate('user', 'name email')
          .populate('room', 'name type')
          .populate('property', 'name location')
          .populate('payment');
        break;
      case 'payments':
        data = await Payment.find(dateFilter)
          .populate('user', 'name email')
          .populate('booking');
        break;
      case 'properties':
        data = await Property.find({ isActive: true })
          .populate('rooms');
        break;
      default:
        return res.status(400).json({ message: 'Invalid export type' });
    }

    // TODO: Implement CSV export if format === 'csv'
    
    res.json({ data });
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
