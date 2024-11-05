import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

// MongoDB connection
mongoose.connect('mongodb+srv://malikirtaza302:GiBT8ireb7dVelsv@cluster0.yxagc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Simple Profile Schema
const profileSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
});

const Profile = mongoose.model('Profile', profileSchema);

app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/profiles', async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profiles' });
  }
});

// Export the app
module.exports = app;
