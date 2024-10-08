import mongoose from "mongoose"
import { InvalidateCacheProps } from "../types/index.js"
import { myCache } from "../app.js"
import { Product } from "../models/products.js"

export const connectDB = (uri:string) => {
    mongoose.connect(uri,{
        dbName:"Dukandar"
    }).then((c) => console.log(`DB connected to ${c.connection.host}`)).catch((e)=>console.log(e))
}

export const invalidateCache = async ({product,order,admin}:InvalidateCacheProps) => {
    if(product){
        const productKeys:string[] = [
            "latest-products",
            "categories",
            "admin-products"
        ];

        const product = await Product.find({}).select("_id")


        product.forEach((i) => {
            productKeys.push(`product-${i._id}`)
        })
        myCache.del(productKeys);
    }
    if(order){
        
    }
    if(admin){
    
    }
}