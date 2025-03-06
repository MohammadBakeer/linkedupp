import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// Routes
import authRoutes from './routes/authRoutes.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Define ports
const DEFAULT_PORT = process.env.PORT || 5001;
let PORT = DEFAULT_PORT;

// CORS Configuration with credentials
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true, // Allow cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Add cookie parser

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to LinkedUpp API' });
});

// Auth routes
app.use('/api/auth', authRoutes);

// Add your other routes here
// app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Start server with port retry logic
const server = app.listen(PORT)
  .on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${PORT} is already in use, trying ${PORT + 1}...`);
      PORT += 1;
      server.close();
      app.listen(PORT, () => {
        console.log(`Server is now running on port ${PORT}`);
      });
    } else {
      console.error('Server error:', err);
    }
  })
  .on('listening', () => {
    console.log(`Server running on port ${PORT}`);
  });
