import dotenv from "dotenv";
dotenv.config();
// import "dotenv/config";
export default {
  mongo: process.env.MONGO_URL,
  port: process.env.PORT,
};
