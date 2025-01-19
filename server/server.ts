import mongoose from 'mongoose';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import dotenv from 'dotenv';

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://arujjwal0208:00000000@cluster0.s6fat.mongodb.net/
                ?retryWrites=true&w=majority&appName=Cluster0`);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

dotenv.config();

const startServer = async () => {
  const app = express();

  // Connect to MongoDB
  await connectDB();

  // Initialize Apollo Server
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  // Start Express server
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startServer();
