import express from "express";
import { getRequestMethod } from "./middleware/getMethod";
import { requestTime } from "./middleware/requestTime";
import itemRouter from "./routes/items";
import productsRouter from "./routes/products";
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

export default app;
