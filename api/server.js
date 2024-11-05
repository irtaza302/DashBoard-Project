import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

// CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Parse JSON bodies
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// MongoDB connection with retry logic
const connectDB = async (retries = 5) => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined');
    }

    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('MongoDB Connected Successfully');
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    if (retries > 0) {
      console.log(`Retrying connection... (${retries} attempts remaining)`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return connectDB(retries - 1);
    }
    throw error;
  }
};

// Initialize MongoDB connection
await connectDB();

// Define Profile Schema
const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
  education: {
    degree: { type: String, required: true },
    completionYear: { type: Number, required: true }
  },
  studentCard: { type: String, required: true },
  expiryDate: { type: Date, required: true },
  portfolio: { type: String, default: '' },
  githubLink: { type: String, default: '' }
}, {
  timestamps: true
});

const Profile = mongoose.model('Profile', profileSchema);

// GET all profiles with error handling
app.get('/api/profiles', async (req, res) => {
  try {
    // Check MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      await connectDB();
    }

    console.log('Fetching profiles...');
    const profiles = await Profile.find();
    console.log(`Found ${profiles.length} profiles`);
    res.json(profiles);
  } catch (error) {
    console.error('Error in GET /api/profiles:', error);
    res.status(500).json({ 
      error: 'Failed to fetch profiles',
      details: error.message 
    });
  }
});

// POST new profile
app.post('/api/profiles', async (req, res) => {
  try {
    const profile = new Profile(req.body);
    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ 
      error: 'Failed to create profile',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: err.message
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

export default app;
