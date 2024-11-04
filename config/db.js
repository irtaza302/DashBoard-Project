import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = "mongodb+srv://malikirtaza302:GiBT8ireb7dVelsv@cluster0.yxagc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    await mongoose.connect(uri);
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB; 