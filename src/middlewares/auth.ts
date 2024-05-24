import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "./error.js";

//middleware to make sure that admin is allowed
export const adminOnly = TryCatch(async (req,res,next) => {
    const {id} = req.query
    if(!id) return next(new ErrorHandler("please login first and then try this",401));

    const user = await User.findById({_id:id});
    if(!user) return next(new ErrorHandler("no user found",401))

    if(user.role !== "admin") return next(new ErrorHandler("not authorize to do this",401))

    next()
})