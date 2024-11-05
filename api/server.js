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
  // Add other fields as needed
});
const Profile = mongoose.model('Profile', profileSchema);

app.use(cors());
app.use(express.json());

// Rest of your routes remain the same
