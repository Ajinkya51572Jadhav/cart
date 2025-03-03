const mongoose = require('mongoose');

const userSchema  = new mongoose.Schema({
   name:String,
   email:{
    enique:true,
    type:String,                  
    required:true
   },
   role:String,
   password:String,
   profile:String,

},{
    timestamps:true
});

const userModel = new mongoose.model("user", userSchema);

 module.exports = userModel;