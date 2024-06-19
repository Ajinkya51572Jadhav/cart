
const mongoose = require('mongoose');
       
 async function  connectDatabase(req,res){
    try {
        mongoose.connect(process.env.DB_URI);        
    } catch (error) {
        return res.status(500).json({
            status: false,
            message:error.message,
        });
    }

}

module.exports = connectDatabase;