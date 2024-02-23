import { MongoClient } from "mongodb";
import "dotenv/config";

// Connection URL
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

// Initialize database
const db = client.db("search-terms-db");

export default db;
