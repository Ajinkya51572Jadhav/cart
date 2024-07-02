
const express =  require("express");
const { addToCartController, countAdded, viewCartController,updateCartDec, updateCartInc,deleteCart} = require("../../controller/Cart");
const authToken = require('../../middleware/authToken');

 
 const cart = express.Router();
  
   cart.route("/add-to-cart").post(authToken,addToCartController);
   cart.get("/addtocart-count",authToken,countAdded);
   cart.get("/view-cart",authToken,viewCartController);
   cart.post("/cart-update-inc",authToken,updateCartInc);
   cart.post("/cart-update-dec",authToken,updateCartDec);
   cart.post("/cart-delete",authToken,deleteCart);


   module.exports = cart; 
   
