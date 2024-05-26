import mongoose from "mongoose";
// const photoSchema = new mongoose.Schema({
//     url: {
//         type: String,
//         required: true,
//     },
//     caption: {
//         type: String,
//         required: false,
//     },
//     // Add more fields if needed, e.g., upload date, tags, etc.
// });
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the product name"]
    },
    photo: {
        type: String,
        required: [true, "Please enter photo"]
    },
    price: {
        type: Number,
        required: [true, "Please enter price for this product"]
    },
    stock: {
        type: Number,
        required: [true, "Please enter stock"]
    },
    category: {
        type: String,
        required: [true, "Please enter the proper category"],
        trim: true,
    }
}, {
    timestamps: true
});
export const Product = mongoose.models["Product"] || mongoose.model("Product", schema);
