import express from "express";



//importing routes
import userRoute from './routes/user.js'
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";



const PORT = 8800;

connectDB();

const app = express();

app.use(express.json())

//using routes

app.use("/api/v1/user",userRoute)

app.use(errorMiddleware)

app.listen(PORT,() => {
    console.log(`port is running om http://localhost:${PORT}`);
    
})