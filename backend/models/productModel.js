const mongoose  = require("mongoose");


 const productSchema = new mongoose.Schema({
            productName:String,
            brnadName:String,
            category:String,
            productImage:[
               {
                  type:String,
               }
            ],
            description:String,
            price:Number,
            selling:Number,
 },{
   timestamps:true
 });

    const productModel = new mongoose.model("product",productSchema);
     module.exports = productModel;
   
   