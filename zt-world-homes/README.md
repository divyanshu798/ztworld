# Z&T World Homes - Guest House Booking Platform

A full-stack web application for booking guest houses with property management, room availability tracking, calendar synchronization, and secure payment processing.

## Features

### User Features
- User registration and authentication
- Browse properties and rooms
- Real-time availability checking
- Secure booking and payment processing
- Booking history and management
- Email confirmations

### Admin Features
- Property and room management
- Booking management and analytics
- Calendar synchronization with Airbnb
- Payment tracking and reports
- Dashboard with statistics

### Technical Features
- RESTful API design
- JWT authentication
- MongoDB database
- Razorpay payment integration
- Email notifications
- Responsive web design
- Calendar sync (Airbnb iCal)

## Technology Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Razorpay for payments
- Nodemailer for emails
- bcryptjs for password hashing

### Frontend
- React
- React Router for navigation
- React Query for data fetching
- Styled Components for styling
- React Hook Form for forms
- Axios for API calls

## Project Structure

```
zt-world-homes/
├── server/                 # Backend API
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── services/       # Business logic services
│   │   ├── utils/          # Utility functions
│   │   └── app.js          # Express app setup
│   ├── package.json
│   └── .env.example
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context
│   │   ├── services/       # API services
│   │   ├── hooks/          # Custom hooks
│   │   ├── styles/         # Global styles
│   │   └── utils/          # Utility functions
│   ├── public/
│   └── package.json
├── db/                     # Database scripts
│   ├── seeds.js           # Database seeding
│   └── seed.js            # Seed runner
└── docs/                  # Documentation
    └── api.md             # API documentation
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/zt-world-homes
JWT_SECRET=your_jwt_secret_here
CLIENT_URL=http://localhost:3000

# Email configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password

# Razorpay configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

5. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

### Database Setup

1. Ensure MongoDB is running

2. Seed the database with admin user:
```bash
cd db
node seed.js
```

Default admin credentials:
- Email: admin@ztworldhomes.com
- Password: admin123

## Quick Start

1. Clone the repository
2. Install MongoDB and ensure it's running
3. Follow the backend and frontend setup instructions above
4. Seed the database
5. Access the application at `http://localhost:3000`

## Structure
- `client/` – React frontend
- `server/` – Node.js/Express backend
- `db/` – Database models/scripts
- `docs/` – Documentation
