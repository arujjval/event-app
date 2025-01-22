import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://arujjwal0208:00000000@cluster0.s6fat.mongodb.net/
                ?retryWrites=true&w=majority&appName=Cluster0`);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};