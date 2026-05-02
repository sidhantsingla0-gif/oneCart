import uploadCloudinary from "../config/cloudinary.js";
import Product from "../model/productModel.js";
export const addProduct = async (req, res) => {
    try {
        let { name, description, price, category, subCategory, sizes, bestseller } = req.body;

let image1 = req.files.image1 ? `public/images/${req.files.image1[0].filename}` : null;
let image2 = req.files.image2 ? `public/images/${req.files.image2[0].filename}` : null;
let image3 = req.files.image3 ? `public/images/${req.files.image3[0].filename}` : null;
let image4 = req.files.image4 ? `public/images/${req.files.image4[0].filename}` : null;

        if (!image1 || !image2 || !image3 || !image4) {
            return res.status(400).json({ message: "Failed to upload one or more images" });
        }

        let productData = {
            name,
            image1,
            image2,
            image3,
            image4,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: sizes ? JSON.parse(sizes) : [],
            bestseller: bestseller === 'true' ? true : false,
            date: Date.now()
        };

        console.log('Product data:', productData);

        const product = await Product.create(productData);
        console.log('Product created:', product);
        return res.status(201).json(product);
    } catch (error) {
        console.log("AddProduct error:", error.message);
        console.log("AddProduct error stack:", error);
        return res.status(500).json({ message: error.message });
    }
};


export const listProduct = async (req, res) => {
    try {
        let products = await Product.find({});
        return res.status(200).json(products);
    } catch (error) {
        console.log("ListProduct error:", error.message);
        return res.status(400).json({ message: error.message });
     }
    }


     export const removeProduct = async (req, res) => {
        try {
            let { id } = req.params;
            let product = await Product.findByIdAndDelete(id);
            return res.status(200).json({ message: "Product removed successfully" });
        } catch (error) {
            console.log("RemoveProduct error:", error.message);
            return res.status(400).json({ message: error.message });
        }

     }