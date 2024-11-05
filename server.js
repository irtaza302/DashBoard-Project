import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Profile } from './api/models/profile.js';
import connectDB from './config/db.js';

// Load environment variables
dotenv.config();

const app = express();

// CORS configuration based on environment
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? ['https://your-vercel-domain.vercel.app']
    : ['http://localhost:5174', 'http://localhost:5173'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// API Routes
app.get('/api/profiles', async (req, res) => {
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
    const newProfile = new Profile(req.body);
    const savedProfile = await newProfile.save();
    res.json(savedProfile);
  } catch (error) {
    console.error('Profile creation error:', error);
    res.status(500).json({ error: 'Failed to create profile' });
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

// Modified server startup
const startServer = async () => {
  const port = process.env.PORT || 5000;
  try {
    const server = app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM received. Shutting down gracefully...');
      server.close(async () => {
        await mongoose.connection.close();
        console.log('Process terminated');
        process.exit(0);
      });
    });

  } catch (error) {
    if (error.code === 'EADDRINUSE') {
      console.log(`Port ${port} is busy, trying ${port + 1}`);
      startServer(port + 1);
    } else {
      console.error('Server error:', error);
      process.exit(1);
    }
  }
};

// Only start the server if not in production (Vercel)
if (process.env.NODE_ENV !== 'production') {
  startServer();
}

export default app; 