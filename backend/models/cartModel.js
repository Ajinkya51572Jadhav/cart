const mongoose  = require("mongoose");

const cartSchema = new mongoose.Schema({
    product_id:{
        ref:"product",
        type:String,
    },
    quantity:Number,
    user_id:String,
 },{
    timestamps:true
});
 const cartModel = new mongoose.model("cart", cartSchema);
 module.exports = cartModel; 