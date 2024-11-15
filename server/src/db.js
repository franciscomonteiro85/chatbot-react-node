import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

// Get mongo connection string from environment variable
const connectionString = process.env.MONGO_DB_CONNECTION_STRING;
const databaseName = 'chatbot';
let database;

// Initial connection to database
export const connectToDatabase = async () => {
  const client = await MongoClient.connect(connectionString);
  database = client.db(databaseName);
  console.log('MongoDB Connection Success');
};

// Export database to be used in other files to operate on it
export const getDatabase = () => {
  if (!database) throw new Error('Database not initialized. Call connectToDatabase first.');
  return database;
};
