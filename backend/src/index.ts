import dotenv from "dotenv";
import connectDB from "./database/connectDB";
import app from "./app";
import config from "./config";
dotenv.config();

//import global middleware and api from app
app;

//Connect to MongDB
connectDB();

//app listening port
app.listen(process.env.PORT, () => {
  console.log(`App listening on PORT https://localhost:${config.port}`);
});
