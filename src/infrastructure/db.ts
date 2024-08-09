import mongoose from "mongoose";
import { config } from "../config";

export const connectDb = async () => {
    try {
        await mongoose.connect(config.MONGO_URI!);
        console.log("database connection successfull");
    } catch (error) {
        console.log("error in deb connection ", error);
    }
};