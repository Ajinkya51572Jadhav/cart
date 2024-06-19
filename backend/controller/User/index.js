
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userModel = require("../../models/userModel");
const cartModel = require("../../models/cartModel");


//   USERMODEL 

//   Register 
exports.SignUp = async (req, res) => {

    const { name, email, password, profile } = req.body;

    const emai = await userModel.findOne({ email });

    if (emai) {
        return res.json({
            status: false,
            message: "Email Already use 😒"
        }).status(500);
    }

    try {
        const hashpassword = bcrypt.hashSync(password, 10);

        if (!name || !email || !password || !profile) {
            return res.json({
                status: false,
                message: "Please Enter InputData 😗"
            }).status(500);
        }
        const user = await userModel.create({
            name, email, role: "user", password: hashpassword, profile
        });

        return res.json({
            status: true,
            user: user,
            message: "uesr Register Successfully Created 😍"
        }).status(200)

    } catch (error) {
        return res.json({
            status: false,
            message: error.message,
        }).status(500);

    }
}


// Login  
exports.SignIn = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({
                status: false,
                message: "Please Enter InputData 😵‍💫"
            }).status(500);
        }

        const user = await userModel.findOne({ email });


        if (!user) {
            return res.json({
                status: false,
                message: "User Not Found 😗"
            }).status(500);
        }

        const checkpassword = await bcrypt.compare(password, user.password)

        if (!checkpassword) {
            return res.json({
                status: false,
                message: "Please Check Password 😗"
            }).status(500);
        }
        const tokendata = {
            _id: user._id,
            email: user.email
        };

        const token = jwt.sign(tokendata, process.env.TOKEN_SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE
        });


        const options = {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),

        };

        return res.cookie("token", token, options).json({
            status: true,
            token,
            message: "uesr Login Successfully 😍"
        }).status(200);

    } catch (error) {
        return res.json({
            status: false,
            message: error.message,
        }).status(500);
    }
}



exports.User = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId);
             if(!user){
                return res.json({
                    status: false,
                    message:"Not accepted",
                }).status(200);
             }
        return res.json({
            status: true,
            user: user,
        }).status(200);

    } catch (error) {
        return res.json({
            status: false,
            message: error.message,
        }).status(500);
    }
}


exports.logOut = (req, res) => {
    try {

        res.clearCookie("token");

        return res.json({
            status: true,
            message: "User logged out successfully",
        }).status(200);

    } catch (error) {
        return res.json({
            status: false,
            message: error.message,
        }).status(500);
    }
}



exports.allUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        console.log("userId", req.userId);

        return res.json({
            status: true,
            users: users,
        }).status(200);

    } catch (error) {
        return res.json({
            status: false,
            message: error.message,
        }).status(500);
    }
};


exports.updateUSer = async (req, res) => {
    console.log("req.body", req.body);

    try {
        const { name, email, role, id } = req.body;

        const roleCheck = await userModel.findById(id);
        if (!roleCheck) {
            return res.json({
                status: false,
                message: "User Not Found 😵‍💫",
            }).status(500);
        }

        const user = await userModel.findByIdAndUpdate(id, { role });

        if (!user) {
            return res.json({
                status: false,
                message: "User Not Found 🤐",
            }).status(500);
        }


        return res.json({
            status: true,
            message: "User Updated Successfully",
        }).status(200);

    } catch (error) {
        return res.json({
            status: false,
            message: error.message,
        }).status(500);
    }
};

exports.countAdded= async(req,res)=>{
   try {
    const userId = req.userId;
     console.log("userIdd",userId);

     const count = await cartModel.countDocuments({ user_id: userId });
     console.log("count",count);

     return res.json({
        count:count,
        status:true,
      });

   } catch (error) {
    
    return res.json({
        message:error.message,
        status:false,
      });

   }
     
     
}

