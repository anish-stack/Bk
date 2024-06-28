const Product = require("../models/ProductModel");
const ErrorHander = require("../utils/Errorhandler");
const cloudinary = require("cloudinary").v2;
const fs = require('fs').promises;
const path = require('path');
// Config Of Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Create Product 
exports.createProducts = async (req, res) => {
    try {
        // Check if files were uploaded
        const files = req.files;
        // console.log(files)
        const sizess = JSON.parse(req.body.sizes);
        console.log(sizess)
        if (!files || files.length === 0) {
            return res.status(400).json({
                success: false,
                error: "No files uploaded"
            });
        }
        console.log(req.body)
        // console.log(parsedSizes)
        // Check for empty fields in req.body
        const { productName,  StyleNo, NetQuantity, ProductDetail, selectedCat, discountPrice, mainPrice, percentage, collectionName, description, SKU, availability, categories, tags } = req.body;
        const emptyFields = [];

        if (!productName) emptyFields.push('productName');
        if (!StyleNo) emptyFields.push('StyleNo');
        if (!ProductDetail) emptyFields.push('ProductDetail');
        if (!NetQuantity) emptyFields.push('NetQuantity');
        if (!percentage) emptyFields.push('percentage');
        if (!collectionName) emptyFields.push('collectionName');
        if (!description) emptyFields.push('description');
        if (!SKU) emptyFields.push('SKU');
        if (!availability) emptyFields.push('availability');
        if (!categories) emptyFields.push('categories');

        if (emptyFields.length > 0) {
            return res.status(400).json({
                success: false,
                error: "Please provide all required fields",
                missingFields: emptyFields
            });
        }
        // Upload images to Cloudinary
        const uploadedImages = [];
        for (let index = 0; index < files.length; index++) {
            const file = files[index];
            const tempFilePath = path.join(__dirname, `temp_${file.originalname}`);

            // Write the buffer data to the temporary file
            await fs.writeFile(tempFilePath, file.buffer);

            // Upload the temporary file to Cloudinary
            const uploadResult = await cloudinary.uploader.upload(tempFilePath, {
                folder: 'diva story',
                public_id: file.originalname
            });

            // Push the secure URL of the uploaded image to the array
            uploadedImages.push(uploadResult.secure_url);

            // Remove the temporary file after uploading
            await fs.unlink(tempFilePath);
        }

        // Create a new product instance
        const newProduct = new Product({
            img: uploadedImages[0],
            productName,
            sizes: sizess, // Assign the parsed sizes here
            secondImg: uploadedImages[1] || uploadedImages[0],
            thirdImage: uploadedImages[2] || uploadedImages[0],
            fourthImage: uploadedImages[3] || uploadedImages[0],
            discountPrice,
            StyleNo,
            NetQuantity,
            ProductDetail,
            mainPrice,
            percentage,
            collectionName,
            description,
            SKU,
            availability,
            categories,
            tags
        });

        // Save the new product to the database
        await newProduct.save();
        console.log(`New`, newProduct)
        res.status(200).json({
            success: true,
            msg: "Product created successfully",
            data: newProduct
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
};


// Get All Products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
};

// Delete Product by ID
exports.deleteProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                error: "Product not found"
            });
        }
        res.status(200).json({
            success: true,
            data: deletedProduct
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
};

// Get Single Product by Product Name
exports.getProductByName = async (req, res) => {
    try {
        const { productName, id } = req.params;
        console.log(id)
        let product;
        if (id) {
            // If ID is provided, search by ID
            product = await Product.findById(id);
        } else if (productName) {
            // If product name is provided, search by name
            product = await Product.findOne({ productName });
        } else {
            // If neither ID nor name is provided, return error
            return res.status(400).json({
                success: false,
                error: "Please provide either product name or ID"
            });
        }

        if (!product) {
            return res.status(404).json({
                success: false,
                error: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
};

// Filter Products According to Tags
exports.filterProductsByTags = async (req, res) => {
    try {
        const { tags } = req.query;
        const filteredProducts = await Product.find({ tags: { $in: tags } });
        res.status(200).json({
            success: true,
            data: filteredProducts
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
};

// Update Product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updateFields = req.body;

        // console.log("Incoming-Products:", updateFields);

        // Update the product in the database
        const updatedProduct = await Product.findByIdAndUpdate(id, { $set: { ...updateFields } }, { new: true });

        console.log("Updated-Products:", updatedProduct);

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                error: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            data: updatedProduct
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
};


// Function to deep compare two objects
function deepCompare(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let key of keys1) {
        const val1 = obj1[key];
        const val2 = obj2[key];
        const areObjects = isObject(val1) && isObject(val2);
        if (
            (areObjects && !deepCompare(val1, val2)) ||
            (!areObjects && val1 !== val2)
        ) {
            return false;
        }
    }

    return true;
}

// Helper function to check if a variable is an object
function isObject(object) {
    return object != null && typeof object === 'object';
}


exports.getProductByCategoreies = async (req, res) => {
    try {
        const Category = req.params.Category
        const Products = await Product.find({ categories: Category })
        if (Products.length === 0) {
            return res.status(403).json({
                success: false,
                msg: "No Product Found"
            })
        }
        res.status(200).json({
            success: true,
            msg: "Found Successfull",
            data: Products
        })

    } catch (error) {
        res.status(501).json({
            success: false,
            msg: "Internal Server Error"
        })
    }
}