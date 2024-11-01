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

// Improved MongoDB connection with retry logic
const connectDB = async (retries = 5) => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    console.log('Attempting to connect to MongoDB...');
    
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      retryWrites: true,
      w: 'majority',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 10000
    });

    console.log('MongoDB Connected Successfully');
    
    // Add connection event listeners
    mongoose.connection.on('error', err => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected');
    });

  } catch (error) {
    console.error('MongoDB connection error:', error);
    if (retries > 0) {
      console.log(`Retrying connection... (${retries} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, 5000));
      return connectDB(retries - 1);
    }
    process.exit(1);
  }
};

// Connect to MongoDB before starting the server
const startServer = async () => {
  try {
    await connectDB();
    
    // Health check endpoint
    app.get('/health', (req, res) => {
      res.json({ 
        status: 'ok',
        mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
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
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
  }
};

startServer();

export default app; 