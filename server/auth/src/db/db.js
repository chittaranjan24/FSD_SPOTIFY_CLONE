import mongoose from 'mongoose';
import config from '../config/config.js';

async function connectDb() {
    try {
        await mongoose.connect(config.MONGODB_URI);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection error:", error);
    }
}

export default connectDb;