# Quiz App - MERN Stack with PDF Processing

A full-stack quiz application that can generate quizzes from PDF documents using AI.

## Features

- User authentication (login/register)
- PDF upload and text extraction
- AI-powered question generation using OpenAI
- Interactive quiz taking interface
- Score tracking and results display
- Responsive design

## Tech Stack

- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **AI**: OpenAI GPT-3.5-turbo
- **PDF Processing**: pdf-parse
- **Authentication**: JWT

## Quick Start

### Prerequisites
- Node.js 14+ installed
- MongoDB installed and running
- OpenAI API key

### 1. Initialize Project Structure
```bash
# Create project directories
mkdir -p backend/models backend/routes backend/middleware backend/uploads
mkdir -p frontend/src/components frontend/src/context

# Initialize backend
cd backend
npm init -y
npm install express mongoose cors dotenv multer pdf-parse openai bcryptjs jsonwebtoken
npm install --save-dev nodemon

# Initialize frontend
cd ../frontend
npx create-react-app .
npm install react-router-dom axios

# Return to root
cd ..
```

### 2. Setup Environment Variables
Create `backend/.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quizapp
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Start MongoDB
```bash
# On macOS with Homebrew
brew services start mongodb/brew/mongodb-community

# On Windows
net start MongoDB

# On Linux
sudo systemctl start mongod
```

### 4. Install Root Dependencies
```bash
npm init -y
npm install --save-dev concurrently
```

### 5. Run the Application
```bash
# Install all dependencies
npm run install-deps

# Start both frontend and backend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Project Structure
```
quiz-app/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Quiz.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── quiz.js
│   │   └── pdf.js
│   ├── middleware/
│   │   └── auth.js
│   ├── uploads/
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Quiz.js
│   │   │   └── PDFUpload.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── App.js
│   │   └── App.css
│   └── package.json
├── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### PDF Processing
- `POST /api/pdf/process` - Upload PDF and generate quiz

### Quiz Management
- `GET /api/quiz` - Get user's quizzes
- `GET /api/quiz/:id` - Get specific quiz
- `POST /api/quiz/:id/submit` - Submit quiz answers

## Usage

1. **Register/Login**: Create an account or login to existing account
2. **Upload PDF**: Click "Upload PDF" and select a PDF document
3. **Generate Quiz**: AI will automatically generate 5 multiple choice questions
4. **Take Quiz**: Answer the questions and submit for scoring
5. **View Results**: See your score and correct answers

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**:
   ```bash
   # Check if MongoDB is running
   brew services list | grep mongodb
   
   # Start MongoDB if not running
   brew services start mongodb/brew/mongodb-community
   ```

2. **OpenAI API Error**:
   - Ensure your API key is valid and has credits
   - Check the `.env` file for correct API key format

3. **File Upload Issues**:
   ```bash
   # Ensure uploads directory exists
   mkdir -p backend/uploads
   chmod 755 backend/uploads
   ```

4. **CORS Issues**:
   - Frontend proxy is configured in `frontend/package.json`
   - Backend CORS is enabled for all origins in development

### Development Tips

- Use `npm run dev` to start both servers simultaneously
- Backend runs on port 5000, frontend on port 3000
- Check browser console and terminal for error messages
- MongoDB data is stored locally in your system

## Next Steps

After successful setup:
1. Test user registration and login
2. Upload a sample PDF to create a quiz
3. Take the generated quiz
4. Customize styling in `App.css`
5. Add more question types or features

## Requirements

- Node.js 14+
- MongoDB Community Edition
- OpenAI API key with available credits
- Modern web browser
