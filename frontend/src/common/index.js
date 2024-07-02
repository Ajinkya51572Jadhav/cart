
const domin = "http://localhost:4000/api";

export const Api = {
    signup: {
        url: `${domin}/signup`,
    },
    signin: {
        url: `${domin}/signin`,
    },
    user: {
        url: `${domin}/user`,
    },
    logout: {
        url: `${domin}/logout`,
    },
    admin: {
        url: `${domin}/admin`,
    },
    allUsers: {
        url: `${domin}/users`
    },
    updateAdmin: {
        url: `${domin}/update-admin`
    },
    uploadProducts: {
        url: `${domin}/product-upload`
    },
    products: {
        url: `${domin}/products`
    },
    product_edit_admin: {
        url: `${domin}/product_edit_admin`
    },
    product_delete_admin: {
        url: `${domin}/product_delete_admin`
    },
    category: {
        url: `${domin}/product_category`
    },
    category_wise_product: {
        url: `${domin}/category`
    },
    productdetails: {
        url: `${domin}/product-details`
    },
    add_to_cart: {
        url: `${domin}/add-to-cart`
    },
    countAdded: {
        url: `${domin}/addtocart-count`
    },
    cart: {
        url: `${domin}/view-cart`
    },
    update_cart_inc: {
        url: `${domin}/cart-update-inc`
    },
    update_cart_dec: {
        url: `${domin}/cart-update-dec`
    },
    delete_cart: {
        url: `${domin}/cart-delete`
    },
    search: {
        url: `${domin}/search`
    }, filter: {
        url: `${domin}/filter`
    }


}