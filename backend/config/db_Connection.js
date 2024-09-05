import mongoose from "mongoose";
import * as models from "./models/index.js";
let isConnected;
const uri = process.env.DB_CONN_STRING;
const dbName = process.env.DB_NAME;
if (!uri || !dbName) {
  throw new Error("DB Name or Connection Url Value Can't be Empty.");
}
export async function connectToDatabase() {
  if (isConnected) {
    console.log("Existing DataBase Connection!!");
    return Promise.resolve();
  }
  try {
    const db = await mongoose.connect(uri, {
      dbName: dbName,
    });
    isConnected = db.connections[0].readyState;
    console.log("DataBase Connected Successfully--------------->");
  } catch (error) {
    console.error("Error In DB Connection:", error);
    throw error;
  }
}
