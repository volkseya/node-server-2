import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { quotes } from "./quotes.js";
dotenv.config();

const connectionString = process.env.MONGODB_URI || "";
const client = new MongoClient(connectionString);
let conn;
try {
  conn = await client.connect();
  console.log("Connected to MongoDB");
} catch (e) {
  console.error(e);
}

let db = conn.db("interview");
const collection = db.collection("prices");
await collection.insertMany(quotes);
export default db;
