const ical = require('node-ical');
const axios = require('axios');
const Room = require('../models/Room');

class CalendarSyncService {
  async syncAirbnbCalendar(roomId) {
    try {
      const room = await Room.findById(roomId);
      if (!room || !room.airbnbCalendarUrl) {
        throw new Error('Room not found or no Airbnb calendar URL');
      }

      // Fetch iCal data from Airbnb
      const response = await axios.get(room.airbnbCalendarUrl);
      const calendarData = ical.parseICS(response.data);

      // Process calendar events
      const blockedDates = [];
      
      for (const key in calendarData) {
        const event = calendarData[key];
        if (event.type === 'VEVENT' && event.summary.includes('Reserved')) {
          blockedDates.push({
            startDate: event.start,
            endDate: event.end,
            status: 'booked'
          });
        }
      }

      // Update room availability
      // Note: This is a simplified implementation
      // In production, you'd want to merge with existing availability
      room.availability = blockedDates;
      await room.save();

      console.log(`Calendar sync completed for room ${roomId}`);
      return { success: true, blockedDates: blockedDates.length };
    } catch (error) {
      console.error('Calendar sync error:', error);
      throw error;
    }
  }

  async syncAllRoomCalendars() {
    try {
      const rooms = await Room.find({ 
        airbnbCalendarUrl: { $exists: true, $ne: null },
        isActive: true 
      });

      const results = [];
      
      for (const room of rooms) {
        try {
          const result = await this.syncAirbnbCalendar(room._id);
          results.push({ roomId: room._id, ...result });
        } catch (error) {
          results.push({ 
            roomId: room._id, 
            success: false, 
            error: error.message 
          });
        }
      }

      return results;
    } catch (error) {
      console.error('Bulk calendar sync error:', error);
      throw error;
    }
  }
}

module.exports = new CalendarSyncService();
