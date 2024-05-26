import express from "express";



//importing routes
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";

import userRoute from './routes/user.js'
import productRoute from './routes/product.js'
import NodeCache from "node-cache";


const PORT = 8800;

connectDB();

export const myCache = new NodeCache(); 

const app = express();

app.use(express.json())

//using routes

app.use("/api/v1/user",userRoute)
app.use("/api/v1/product",productRoute);

// app.use("/search")

app.use("/uploads",express.static("uploads"))

app.use(errorMiddleware)

app.listen(PORT,() => {
    console.log(`port is running om http://localhost:${PORT}`);
    
})