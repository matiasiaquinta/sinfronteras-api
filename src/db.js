import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

export const connectDB = async () => {
    try {
        // Conectar a MongoDB usando Mongoose
        await mongoose.connect(MONGODB_URI);
        console.log("MongoDB is connected");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};
