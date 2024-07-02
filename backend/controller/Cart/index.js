const cartModel = require("../../models/cartModel");

exports.addToCartController = async (req, res) => {
    const { product_id } = req.body;
    const userId = req.userId;

    try {
        const isAlreadyInCart = await cartModel.findOne({ product_id, user_id: userId });

        if (isAlreadyInCart) {
            return res.json({
                status: true,
                message: "Product Already Exists in Cart",
                cart: isAlreadyInCart
            }).status(200);
        }

        const newCartItem = new cartModel({
            product_id,
            quantity: 1,
            user_id: userId
        });

        const addedCartItem = await newCartItem.save();

        if (addedCartItem) {
            return res.json({
                status: true,
                message: "Product Added to Cart",
                cart: addedCartItem
            }).status(200);
        }
    } catch (error) {
        return res.json({
            status: false,
            message: error.message
        }).status(500);
    }
};


exports.countAdded = async (req, res) => {
    try {
        const userId = req.userId;
        console.log("userIdd", userId);

        const count = await cartModel.countDocuments({ user_id: userId });
        console.log("count", count);

        return res.json({
            count: count,
            status: true,
        }).status(200);

    } catch (error) {

        return res.json({
            message: error.message,
            status: false,
        }).status(500);

    }
}



exports.viewCartController = async (req, res) => {

    try {

        const cart = await cartModel.find({ user_id: req.userId }).populate("product_id");

        console.log("cart", cart);


        return res.json({
            cart: cart,
            status: true,
        }).status(200);

    } catch (error) {
        return res.json({
            message: error.message,
            status: false,
        }).status(500);
    }

};


exports.updateCartInc = async (req, res) => {
    try {
        const { _id , quantity } = req.body;

        console.log("_id cart", _id);
        console.log("qun cart", quantity);

        const cart = await cartModel.updateOne({_id},{$set:{quantity}});
       
        if (cart.nModified === 0) {
            return res.json({
                cart: cart,
                message: "Cart Update Failed!",
                status: true,
            }).status(500);
        }


        return res.json({
            cart: cart,
            message: "Cart Update Success !",
            status: true,
        }).status(200);

    } catch (error) {
        return res.json({
            message: error.message,
            status: false,
        }).status(500);
    }
}




exports.updateCartDec = async (req, res) => {
    try {
        const { _id,quantity } = req.body;

        console.log("_id cart", _id);
        console.log("qun cart", quantity);

        const cart = await cartModel.updateOne({_id},{$set:{quantity}});
       
        if (cart.nModified === 0) {
            return res.json({
                cart: cart,
                message: "Cart Update Failed!",
                status: true,
            }).status(500);
        }


        return res.json({
            cart: cart,
            message: "Cart Update Success !",
            status: true,
        }).status(200);

    } catch (error) {
        return res.json({
            message: error.message,
            status: false,
        }).status(500);
    }
}





exports.deleteCart = async (req, res) => {
    try {
        const { _id} = req.body;

        console.log("_id cart", _id);

        const cart = await cartModel.deleteOne({_id:_id});
        
         if(!cart){
            return res.json({
                cart: cart,
                message: "Cart Update Failed !",
                status: true,
            }).status(500);
         }

        return res.json({
            cart: cart,
            message: "Cart Update Success !",
            status: true,
        }).status(200);

    } catch (error) {
        return res.json({
            message: error.message,
            status: false,
        }).status(500);
    }
}
