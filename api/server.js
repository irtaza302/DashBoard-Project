import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Profile } from './models/profile.js';
import connectDB from '../config/database.js';

dotenv.config();

const app = express();

// CORS configuration based on environment
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://dash-board-project-seven.vercel.app']
    : ['http://localhost:5174', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    mongodb: connectDB().connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// API Routes
app.get('/profiles', async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (error) {
    console.error('Fetch profiles error:', error);
    res.status(500).json({ error: 'Failed to fetch profiles' });
  }
});

app.post('/api/profiles', async (req, res) => {
  try {
    console.log('Received profile data:', req.body);
    const newProfile = new Profile(req.body);
    const savedProfile = await newProfile.save();
    console.log('Saved profile:', savedProfile);
    res.json(savedProfile);
  } catch (error) {
    console.error('Profile creation error:', error);
    res.status(500).json({ 
      error: 'Failed to create profile',
      details: error.message 
    });
  }
});

app.put('/api/profiles/:id', async (req, res) => {
  try {
    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProfile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json(updatedProfile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

app.delete('/api/profiles/:id', async (req, res) => {
  try {
    await Profile.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete profile' });
  }
});

const port = process.env.PORT || 5000;

// Only start the server if not running on Vercel
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

export default app; 