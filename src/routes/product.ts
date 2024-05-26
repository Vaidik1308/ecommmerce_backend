import express from 'express';
import { 
    newProduct,
    getLatestProducts,
    getAllCategories,
    getAdminProducts ,
    deleteProduct,
    getSingleProduct,
    updateProduct,
    getAllProducts
} from '../controllers/product.js';
import { singleUpload } from '../middlewares/multer.js';
import { adminOnly } from '../middlewares/auth.js';

const app = express.Router();

app.post("/new",singleUpload,newProduct)
app.get("/latest",getLatestProducts);
app.get("/categories",getAllCategories)


app.get("/admin-products",getAdminProducts);
app.get("/all",getAllProducts)
app.route("/:id").get(getSingleProduct).delete(deleteProduct).put(updateProduct);



export default app;