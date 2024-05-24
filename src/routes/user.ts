import express from "express";
import { newUser,getAllUsers,getUser, deleteUser } from "../controllers/user.js";
import { adminOnly } from "../middlewares/auth.js";


const app = express.Router();

//......http://localhost:8800/api/v1/user/new
app.post("/new",newUser)


//......http//localhost:8800/api/v1/user/all
app.get("/all",adminOnly,getAllUsers)


//......http//localhost:8800/api/v1/user/s
//get request 
app.get("/:id",getUser)

//delete request
//......http//localhost:8800/api/v1/user/s
app.delete("/:id",adminOnly,deleteUser)

export default app;