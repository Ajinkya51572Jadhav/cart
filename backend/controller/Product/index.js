const isAuthicate = require("../../middleware/isAuthicate");
const productModel = require("../../models/productModel");
const product = require("../../routes/ProductRoutes");


exports.createProduct = async (req, res) => {

    const { productName, brnadName, category, productImage, description, price, selling } = req.body;


    const loginUserId = req.userId;


    if (!isAuthicate(loginUserId)) {
        return res.json({
            status: false,
            message: "this is not authorized to Admin you are trying to login 🤯😱",
        }).status(500);
    };

    if (!productName || !brnadName || !category || !productImage || !description || !price || !selling) {
        return res.json({
            status: false,
            message: "Please Fill all Input data  😒"
        }).status(200);
    }

    try {
        const product = await productModel.create({
            productName, brnadName, category, productImage, description, price, selling
        });

        // const productData =  await new productModel(req.body);
        // const product   =    await  productData.save();

        return res.json({
            status: true,
            product: product,
            message: "Product Add Successfully 😍"
        }).status(200)

    } catch (error) {
        return res.json({
            status: false,
            message: error.message,
        }).status(500);

    }
};




exports.getAllProducts = async (req, res) => {

    try {
        const products = await productModel.find().sort({ createdAt: -1 });

        if (products) {
            return res.json({
                status: true,
                products: products,
            }).status(200);
        }


    } catch (error) {
        return res.json({
            status: false,
            message: error.message,
        }).status(500);
    }
};


exports.singleProductUpdate = async function (req, res) {
    try {
        if (!isAuthicate(req.userId)) {
            return res.json({
                status: false,
                message: "this is not authorized to Admin you are trying to login 🤯😱",
            }).status(500);
        };
        const { _id, ...resBody } = req.body;
        const product = await productModel.findByIdAndUpdate(_id, resBody);

        if (!product) {
            return res.json({
                status: false,
                message: "Id is not a valid product 🤐",
            }).status(200);
        };
        return res.json({
            status: true,
            product: product,
            message: "Product updated successfully 😱"
        }).status(200);


    } catch (error) {
        return res.json({
            status: false,
            message: error.message,
        }).status(500);
    }
};



exports.singleProductDelete = async function (req, res) {
    const { product_id } = req.body;

    try {
        if (!isAuthicate(req.userId)) {
            return res.json({
                status: false,
                message: "this is not authorized to Admin you are trying to login 🤯😱",
            }).status(500);
        };
        const product = await productModel.findByIdAndDelete(product_id);

        if (!product) {
            return res.json({
                status: false,
                message: "Product is not a valid Id 🤐",
            }).status(200);
        };

        return res.json({
            status: true,
            product: product,
            message: "Product Deleted successfully 😱"
        }).status(200);


    } catch (error) {
        return res.json({
            status: false,
            message: error.message,
        }).status(500);
    }
};



// get product categories

exports.getProductCategories = async (req, res) => {
    try {
        const categories = await productModel.distinct("category");

        const productCategory = [];
        //  for (let i = 0; i < categories.length; i++) {
        //     const element = categories[i];
        //     const product = await productModel.find({category:element});
        //     productCategory.push(product);
        //  };

        for (const cate of categories) {
            const product = await productModel.findOne({ category: cate });
            productCategory.push(product);
        }
        console.log("productCate", productCategory);


        return res.json({
            status: true,
            category: productCategory
        }).status(200);


    } catch (error) {
        return res.json({
            status: false,
            message: error.message,
        }).status(500);
    }
}

exports.getCategoryWiseProduct = async (req, res) => {
    try {
        const { category } = req.body;
        const categoryproduct = await productModel.find({ category: category });
        if (!categoryproduct) {
            return res.json({
                status: false,
                message: "Category product not found"
            }).status(500);
        }

        return res.json({
            status: true,
            category: categoryproduct,
        }).status(200);

    } catch (error) {
        return res.json({
            status: false,
            message: error.message,
        }).status(500);
    }
};




exports.getProductDetails = async (req, res) => {
    try {
        const { product_id } = req.body;
        const product = await productModel.findById(product_id);

        if (!product) {
            return res.json({
                status: false,
                message: "Product Not Found"
            }).status(500);
        }

        return res.json({
            status: true,
            product: product,
        }).status(200)


    } catch (error) {
        return res.json({
            status: false,
            message: error.message
        }).status(500)
    }
}



exports.handleSeach = async (req, res) => {
    try {

        console.log("search", req.query);

        const regix = new RegExp(req.query.query, "i", "g");

        const search = await productModel.find(
            {
                "$or": [{
                    productName: regix,

                }
                    , {
                    category: regix
                }]
            }
        );

        return res.json({
            status: true,
            search: search,
        })


    } catch (error) {
        return res.json({
            status: false,
            message: error.message
        }).status(500)
    }
}


exports.filteredProducts = async (req, res) => {
    try {
        console.log("categoryList", [...req.body]);

        const product = await productModel.find({
            category: { "$in": req.body }
        });

        return res.json({
            status: true,
            filter: product,
        })

    } catch (error) {
        return res.json({
            status: false,
            message: error.message
        }).status(500)
    }
}; 
