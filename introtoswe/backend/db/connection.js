import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.ATLAS_URI || "mongodb://127.0.0.1:27017";
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db; // Variable to hold the database instance

async function connectToDatabase() {
  try {
    console.log("Connecting to MongoDB...");
    await client.connect();
    console.log("Pinged your deployment. Successfully connected to MongoDB!");
    db = client.db("employees"); // Replace 'employees' with your database name if different
    console.log(`Connected to database: ${db.databaseName}`);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit the process if the connection fails
  }
}

// Function to retrieve the database instance
function getDb() {
  if (!db) {
    throw new Error("Database not initialized. Call connectToDatabase first.");
  }
  return db;
}

// Initialize the database connection when the application starts
connectToDatabase();

export { getDb };
