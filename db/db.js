// Create a database connection and export it as a module

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const db = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.DB_URL);
    console.log("mongodb connected ");
  } catch (error) {
    console.log("this is the error", error);
  }
};
