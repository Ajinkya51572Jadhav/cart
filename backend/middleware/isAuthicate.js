const userModel = require("../models/userModel");


 const isAuthicate = async(userId) =>{
            
    const user = await userModel.findById(userId);
         
    if(user?.role !=="admin"){
        return false;
    };
     return false;
 }

 module.exports = isAuthicate;