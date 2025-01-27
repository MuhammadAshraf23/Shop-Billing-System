import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI; // Add this to your .env file
let client;
let clientPromise;

if (!uri) {
  throw new Error("Please add your Mongo URI to the environment variables.");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db("your_database_name"); // Replace with your database name
  return { client, db };
}
