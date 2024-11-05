import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = process.env.NODE_ENV === 'production' 
      ? process.env.MONGODB_URI 
      : "mongodb+srv://malikirtaza302:GiBT8ireb7dVelsv@cluster0.yxagc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      retryWrites: true,
      w: 'majority',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 10000
    });

    console.log('MongoDB Connected Successfully');

    mongoose.connection.on('error', err => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB; 