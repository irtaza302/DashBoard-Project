import app from './server.js';
import connectDB from '../config/database.js';

// Connect to MongoDB
connectDB();

export default app; 