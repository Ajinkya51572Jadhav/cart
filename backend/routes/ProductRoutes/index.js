


const express = require('express');
const { createProduct, getAllProducts, singleProductUpdate, singleProductDelete, getProductCategories, getCategoryWiseProduct, getProductDetails} = require('../../controller/Product');
const authToken = require('../../middleware/authToken');


const product = express.Router();
product.post("/product-upload", authToken, createProduct);
product.get("/products", getAllProducts);
product.post("/product_edit_admin", authToken, singleProductUpdate);
product.post("/product_delete_admin", authToken, singleProductDelete);
product.get("/product_category",getProductCategories);
product.post("/category",getCategoryWiseProduct);
product.post("/product-details",getProductDetails)


module.exports = product;    