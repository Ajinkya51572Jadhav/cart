const users  =  require('./routes/UserRoutes');
const products  =  require('./routes/ProductRoutes');
const cart = require('./routes/cartRoutes');

 
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const connectDatabase = require('./config/db');


require('dotenv').config({path:"./config/.env"});

   const app = express();
      app.use(cors({
         origin:"http://localhost:3000",
         credentials:true,
      }));

      
      app.use(express.json());
      app.use(cookieParser());
      app.use(bodyParser.urlencoded({extended:true}));
      
      app.use("/api",users);
      app.use("/api",products);
      app.use("/api",cart);



 
      connectDatabase().then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log("port connect  Successfully");
        });
         console.log("Database Connect Successfully");
      });

 