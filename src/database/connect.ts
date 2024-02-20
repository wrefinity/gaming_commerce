import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGO_URI = process.env.MONGO_DB_CONNECTION_STRING;

const connectDB = () => {
    mongoose.Promise = Promise;
    mongoose.connect(MONGO_URI);
    mongoose.set("strictQuery", false);
    mongoose.connection.on('error', (error: Error) => console.log(error));
}

export default connectDB;