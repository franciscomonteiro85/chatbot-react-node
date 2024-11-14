import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.MONGO_DB_CONNECTION_STRING;
const databaseName = 'chatbot';
let database;

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(connectionString);
  database = client.db(databaseName);
  console.log('MongoDB Connection Success');
};

export const getDatabase = () => {
  if (!database) throw new Error('Database not initialized. Call connectToDatabase first.');
  return database;
};
