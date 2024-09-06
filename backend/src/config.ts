import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, "../src/configs/.env") });
// import "dotenv/config";
export default {
  mongo: process.env.MONGO_URL,
  port: process.env.PORT,
};
