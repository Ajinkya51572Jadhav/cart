
const express =  require("express");
const { addToCartController } = require("../../controller/Cart");
const authToken = require('../../middleware/authToken');

 
 const cart = express.Router();
  
   cart.route("/add-to-cart").post(authToken,addToCartController);

   module.exports = cart;
  