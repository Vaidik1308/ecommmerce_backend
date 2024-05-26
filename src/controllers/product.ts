

import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { Product } from "../models/products.js";
import { BaseQueryType, NewProductRequestBody, ProductType, SearchRequestQuery } from "../types/index.js";
import ErrorHandler from "../utils/utility-class.js";
import { rm } from "fs";
import { myCache } from "../app.js";
import { invalidateCache } from "../utils/features.js";

//revalidate on new,update,delete Product & new order
export const getLatestProducts = TryCatch(async (req,res,next) => {


    let products = []

    if(myCache.has("latest-products")) products = JSON.parse(myCache.get("latest-products")!)

    else{
        products = await Product.find({}).sort({createdAt:-1}).limit(5);
    
        myCache.set("latest-products",JSON.stringify(products))
    }
    
    
    

    return res.status(200).json({
        success:true,
        products
    })
})

export const getAllCategories = TryCatch(async (req,res,next) => {

    let categories;

    if(myCache.has("categories"))
        categories = JSON.parse(myCache.get("categories")!);
    else{
        categories = await Product.distinct("category")
        myCache.set("categories",JSON.stringify(categories))
    }

    
    return res.status(200).json({
        success:true,
        categories
    })
})

export const  getAdminProducts = TryCatch(async (req,res,next) => {
    let products = [];
    if(myCache.has("admin-products"))
        products = JSON.parse(myCache.get("admin-products")!);
    else{
        products = await Product.find({});
        myCache.set("admin-products",JSON.stringify(products));
    }
    return res.status(200).json({
        success:true,
        products
    })
})

export const getSingleProduct = TryCatch(async (req,res,next) => {
    const _id = req.params.id;
    let product;

    if(myCache.has(`producct-${_id}`))
        product = JSON.parse(myCache.get(`product-${_id}`)!);
    else{
        product = await Product.findById(_id);
        myCache.set(`product-${_id}`,JSON.stringify(product));
    }
    return res.status(201).json({
        success:true,
        product
    })
})


export const newProduct = TryCatch(async (req:Request<{} | {} | NewProductRequestBody>,res,next) => {
    const {name,price,category,stock} = req.body;
    const photo = req.file;

    if(!photo) return next(new ErrorHandler("Please add photo",400));
    if(!name || !price || !stock || !category) {
         rm(photo.path, () => {
            console.log("Photo deleted");
            return next(new ErrorHandler("please enter all fields",400))
            
        })
        
        
    }
    await Product.create({
        name,
        price,
        stock,
        category:category.toLowerCase(),
        photo:photo.path,
    })

    await invalidateCache({product:true});

    return res.status(201).json({
        success:true,
        message:"products created successfully"
    })
    res.send("working")
})


export const deleteProduct = TryCatch(async (req,res,next) => {
    const _id = req.params.id;
    const product = await Product.findById(_id);
    if(!product) return next(new ErrorHandler("Invalid Product Id",404));
    rm(product.photo!,() => {
        console.log("photo Deleted successfully");
        
    })
    await Product.deleteOne();
    await invalidateCache({product:true});
    return res.status(201).json({
        success:true,
        message:"Product Deleted successfully"
    })
})


export const updateProduct = TryCatch(async (req:Request,res,next) => {

    const { id:_id } = req.params;
    const { name, price, stock, category } = req.body;
    
    const photo = req.file;
    console.log(photo?.path);
    
    const product = await Product.findById(_id);
  
    if (!product) return next(new ErrorHandler("Product Not Found", 404));
  
    if (photo) {
      rm(product.photo!, () => {
        console.log("Old Photo Deleted");
      });
      product.photo = photo.path;
    }
  
    if (name) product.name = name;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (category) product.category = category;

    // console.log(product);
    
  
    await product.save();

    await invalidateCache({product:true});
  

    return res.status(200).json({
        success:true,
        message:"Product updated"
    })
})


export const getAllProducts = TryCatch(async (req:Request<{},{},{},SearchRequestQuery>,res,next) => {
    const {search,sort,category,price} = req.query;

    
    const page = Number(req.query.page) | 1;
    
    const limit = Number(process.env.PRODUCT_PER_PAGE)  || 8;
    const skip = (page - 1) * limit;

    const baseQuery:BaseQueryType = {
        // price:{
        //     $lte:Number(price),
        // },
        // category,
    }

    if(search) baseQuery.name = {
        $regex:search,
        $options:'i'
    }

    if(price) baseQuery.price = {
        $lte:Number(price)
    }

    if(category) baseQuery.category = category


    const productPromise = Product.find(baseQuery).sort(
        sort && {price: sort === "asc" ? 1 : -1} 
    ).limit(limit).skip(skip)
    const [products,filteredProducts] = await Promise.all([
        productPromise,
        Product.find(baseQuery)
    ])
    // const products:ProductType[] = await Product.find(baseQuery).sort(
    //     sort && {price: sort === "asc" ? 1 : -1} 
    // ).limit(limit).skip(skip);

    // const filteredProducts = await Product.find(baseQuery);

    const totalPage = Math.ceil(filteredProducts.length / limit);

    return res.status(200).json({
        success:true,
        products,
        totalPage
    })
})