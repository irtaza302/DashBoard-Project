import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../api/models/user.js';

dotenv.config();

const ADMIN_USER = {
  email: 'tester@test.com',
  password: 'aCd3@W62',
  role: 'admin',
  isActive: true
};

const seedAdmin = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('Connected to MongoDB');

    // Check if admin exists
    const existingAdmin = await User.findOne({ email: ADMIN_USER.email });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Create new admin user
    const adminUser = new User(ADMIN_USER);
    await adminUser.save();
    
    console.log('Admin user created successfully');
    console.log('Email:', ADMIN_USER.email);
    console.log('Password:', ADMIN_USER.password);

  } catch (error) {
    console.error('Error seeding admin user:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

// Run the seed function
seedAdmin(); 