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

export type NewProductRequestBody = {
   name:string;
   category:String;
   price:number;
   stock:number;
}

export type ControllerType = (
    req: Request,
    res: Response,
    next: NextFunction
   ) => Promise<void | Response<any, Record<string, any>>>
export type SearchRequestQuery = {
   search?:string;
   price?:string;
   category?:string;
   sort?:string;
   page?:string;
}

export type BaseQueryType = {
   name?:{
      $regex:string,
      $options:string,
   };
   price?: {$lte: number;};
   category?: string;
}

export type ProductType = {
   _id:string;
   name:string;
   category:string;
   price:number;
   stock:number;
   photo:string;
}

export type InvalidateCacheProps = {
   product?:boolean;
   order?:boolean;
   admin?:boolean;
}