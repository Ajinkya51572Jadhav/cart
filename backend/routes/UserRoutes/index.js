
const express = require('express');
const { SignUp, SignIn, User, logOut, allUsers, updateUSer, countAdded } = require('../../controller/User');
const authToken = require('../../middleware/authToken');

const app = express.Router();
app.post("/signup", SignUp);
app.post("/signin", SignIn);
app.get("/user", authToken, User);
app.get("/logout", logOut);

// admin panel admin routes 
app.get("/users", authToken, allUsers)
app.post("/update-admin", authToken,updateUSer)
app.get("/addtocart-count",authToken,countAdded);


module.exports = app; 