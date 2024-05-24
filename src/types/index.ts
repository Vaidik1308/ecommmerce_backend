import { NextFunction, Request,Response } from "express"
export type NewUserRequestBody = {
   name:string;
   email:String;
   photo:string;
   gender:string;
   role:string;
   _id:string;
   dob:Date;
}

export type ControllerType = (
    req: Request,
    res: Response,
    next: NextFunction
   ) => Promise<void | Response<any, Record<string, any>>>