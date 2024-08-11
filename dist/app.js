import express from "express";
//importing routes
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRoute from './routes/user.js';
import productRoute from './routes/product.js';
import orderRoute from './routes/orders.js';
import NodeCache from "node-cache";
import { config } from 'dotenv';
import morgan from 'morgan';
config({
    path: "./.env"
});
const PORT = process.env.PORT || 8800;
const MONGO_URI = process.env.MONGO_URI || "";
connectDB(MONGO_URI);
export const myCache = new NodeCache();
const app = express();
app.use(express.json());
app.use(morgan("dev"));
//using routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
// app.use("/search")
app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);
app.listen(PORT, () => {
    console.log(`port is running om http://localhost:${PORT}`);
});
