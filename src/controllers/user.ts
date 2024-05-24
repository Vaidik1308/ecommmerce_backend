import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/index.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "../middlewares/error.js";

export const newUser  = TryCatch(
    async (
        req:Request<{},{},NewUserRequestBody>,
        res:Response,
        next:NextFunction
    ) => 
        {    
        // throw new Error("lag gye lode")
            const {
                name,
                email,
                photo,
                gender,
                dob,
                _id
            } = req.body

            if(!_id || !name || !email || !photo || !dob || !gender){
                next(new ErrorHandler("Please add all fields",400))
            }
        let user = await User.findById(_id);
        if(user){
            return res.status(200).json({
            success:true,
            message:`Welcome, ${user.name}`,
        })}

        user = await User.create({
                name,
                email,
                photo,
                gender,
                dob:new Date(dob),
                _id,
            })
            return res.status(201).json({
                success:true,
                message:`Welcome, ${user.name}`
            })
        
        
    }
)

export const getAllUsers = TryCatch(async (req,res,next) => {
    // res.send("loda all users dunga tujhe ")
    const users = await User.find({});

    return res.status(201).json({
        success:true,
        users
    })
})

export const getUser = TryCatch( async (req,res,next) => {
    const _id = req.params.id
    const user = await User.findById(_id)
    if(!user){
        return next(new ErrorHandler("Invalid user",400))
    }
     return res.status(200).json({
        success:true,
        user,
    })
}) 

export const deleteUser = TryCatch(async (req,res,next) => {
    const _id = req.params.id;
    const user = await User.findByIdAndDelete(_id)
    if(user){
        return res.status(201).json({
            success:true,
            message:`${user.name} with ${user.id} deleted successfully`
        })
    }
    return next(new ErrorHandler("unable to delete the user",500))
})