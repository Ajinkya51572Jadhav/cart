const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
    try {
        const token = req.cookies ? req.cookies.token : null;
        console.log("token", token); 
        if (!token) {
            return res.status(200).json({
                status: false,
                message: "User not logged in"
            });
        }

        // Verify the token
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decode) => {

            if (err) {
                return res.status(401).json({
                    status: false,
                    message: "Token is not valid"
                });
            }

            req.userId = decode?._id;
            next();
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

module.exports = authToken;
