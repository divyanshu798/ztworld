const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransporter({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  async sendBookingConfirmation(booking, user) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Booking Confirmation - Z&T World Homes',
      html: `
        <h1>Booking Confirmed!</h1>
        <p>Dear ${user.name},</p>
        <p>Your booking has been confirmed. Here are your booking details:</p>
        
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Booking Details</h3>
          <p><strong>Booking ID:</strong> ${booking._id}</p>
          <p><strong>Check-in:</strong> ${new Date(booking.checkIn).toLocaleDateString()}</p>
          <p><strong>Check-out:</strong> ${new Date(booking.checkOut).toLocaleDateString()}</p>
          <p><strong>Guests:</strong> ${booking.guests}</p>
          <p><strong>Total Amount:</strong> ₹${booking.totalAmount}</p>
        </div>
        
        <p>Thank you for choosing Z&T World Homes!</p>
        <p>Best regards,<br>Z&T World Homes Team</p>
      `
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Booking confirmation email sent successfully');
    } catch (error) {
      console.error('Error sending booking confirmation email:', error);
    }
  }

  async sendPaymentConfirmation(payment, booking, user) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Payment Confirmation - Z&T World Homes',
      html: `
        <h1>Payment Confirmed!</h1>
        <p>Dear ${user.name},</p>
        <p>Your payment has been processed successfully.</p>
        
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Payment Details</h3>
          <p><strong>Payment ID:</strong> ${payment._id}</p>
          <p><strong>Amount:</strong> ₹${payment.amount}</p>
          <p><strong>Transaction ID:</strong> ${payment.razorpayPaymentId}</p>
          <p><strong>Status:</strong> Success</p>
        </div>
        
        <p>Your booking is now confirmed and you will receive a separate confirmation email.</p>
        <p>Thank you for your business!</p>
        <p>Best regards,<br>Z&T World Homes Team</p>
      `
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Payment confirmation email sent successfully');
    } catch (error) {
      console.error('Error sending payment confirmation email:', error);
    }
  }
}

module.exports = new EmailService();
