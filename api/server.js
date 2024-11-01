import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Profile } from './models/profile.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection with better error handling
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      retryWrites: true,
      w: 'majority',
    });
    
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();

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
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app; 