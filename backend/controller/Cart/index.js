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
            });
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
