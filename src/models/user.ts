import mongoose from "mongoose";
import validator from "validator"

interface IUser extends Document {
    _id:string;
    name:string;
    email:string;
    photo:string;
    role:"user"|"admin";
    gender:"male"|"female";
    dob:Date;
    createdAt:Date;
    updatedAt:Date;

    //virtual attribute
    age:number;
}


const schema = new mongoose.Schema(
    {
        _id:{
            type:String,
            require:[true,"Please enter your ID"]
        },
        name:{
            type:String,
            require:[true,"Please enter name"]
        },
        photo:{
            type:String,
            required:[true,"Please add photo"],

        },
        role:{
            type:String,
            required:[true,"Please "],
            enum:["admin","user"],
            default:"user",
        },
        dob:{
            type:Date,
            required:[true,"Please enter your dob "],
        },
        email:{
            type:String,
            unique:[true,"email already exists"],
            required:[true,"Please enter your dob "],
            validate:validator.default.isEmail
        }

    },
    {
        timestamps:true
    }
);

schema.virtual("age").get(function(){
    const today = new Date();
    const dob = this.dob;
    let age = today.getFullYear() - dob.getFullYear()

    if(today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())){
        age--;
    }
})

export const User = mongoose.model<IUser>("User",schema)