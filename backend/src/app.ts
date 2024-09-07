import express from "express";
import { getRequestMethod } from "./middlewares/getMethod";
import { requestTime } from "./middlewares/requestTime";
import itemRouter from "./routes/items";
import productsRouter from "./routes/products";
import errorHandler from "../src/middlewares/error-handler";
const app = express();

//--------------------Middleware----------------------//
// Middleware to parse JSON
app.use(express.json());

//middleware get method
app.use(getRequestMethod);

//middleware request time
app.use(requestTime);

//----------------------------------------------------//

//Routes
app.use("/api/items", itemRouter);

app.use("/api/products", productsRouter);

//Global error put under route api
//Global error
app.use(errorHandler);

export default app;
