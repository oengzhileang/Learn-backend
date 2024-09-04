import mongoose from "mongoose";
import config from "../config";
const connectDB = async () => {
  try {
    await mongoose.connect(`${config.mongo}`);
    console.log("Mongo connected");
  } catch (error) {
    console.log("Mongo connect error", error);
    process.exit(1);
  }
};

export default connectDB;
