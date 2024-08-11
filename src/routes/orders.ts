import express from 'express'
import { adminOnly } from '../middlewares/auth.js'
import { newUser } from '../controllers/order.js';


const app = express.Router();


app.post("/new", newUser)

export default app
