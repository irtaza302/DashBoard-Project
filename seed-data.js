import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Profile } from './api/models/profile.js';

dotenv.config();

const dummyProfiles = [
  {
    name: "Test User",
    email: "test@example.com",
    contact: "1234567890",
    address: "123 Test St",
    education: {
      degree: "Test Degree",
      completionYear: 2024
    },
    studentCard: "STU123",
    expiryDate: new Date("2024-12-31"),
    portfolio: "",
    githubLink: ""
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB');

    // Clear existing data
    await Profile.deleteMany({});
    console.log('Cleared existing profiles');

    // Insert new data
    const result = await Profile.insertMany(dummyProfiles);
    console.log(`Inserted ${result.length} profiles`);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
  }
}

seedDatabase();