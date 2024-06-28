const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
    colorValue: {
        type: String
    },
    stockNo: {
        type: String
    }
});

const sizeSchema = new mongoose.Schema({
    size: {
        type: String,
        required: true
    },
    discountPrice: {
        type: String,
        required: true
    },
    mainPrice: {
        type: String
    },
    colors: [colorSchema] 
});

const productSchema = new mongoose.Schema({
    img: {
        type: String
    },
    productName: {
        type: String,
        required: true
    },
    sizes: [sizeSchema], 
    secondImg: {
        type: String
    },
    thirdImage: {
        type: String
    },
    fourthImage: {
        type: String
    },
    discountPrice: {
        type: String
    },
    mainPrice: {
        type: String
    },
    percentage: {
        type: String,
        required: true
    },
    ProductDetail:{
        type: String
    },
    NetQuantity:{
        type: String
    },
    StyleNo:{
        type: String
    },
    collectionName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    SKU: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    },
    categories: {
        type: String
    },
    tags: {
        type: String
    },
    subCategory: {
        type: String
    }
}, { timestamps: true }); 

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
