import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Profile } from './models/profile.js';
import connectDB from '../config/database.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

const corsOptions = {
  origin: ['https://dash-board-project-ten.vercel.app', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
};

app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Add this error handling middleware before your routes
app.use((req, res, next) => {
  if (!mongoose.connection.readyState) {
    return res.status(503).json({ 
      error: 'Database connection not ready',
      status: 'error'
    });
  }
  next();
});

// API Routes
app.get('/api/profiles', async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (error) {
    console.error('Fetch profiles error:', error);
    res.status(error.status || 500).json({ 
      error: 'Failed to fetch profiles',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
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

// Add this after your routes
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

const port = process.env.PORT || 5000;

// Export the app for serverless deployment
export default app;

// Only start the server in development
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
} 