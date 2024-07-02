import {createBrowserRouter } from "react-router-dom";
import App from "../App";
import  Home from "../pages/Home";
import Login  from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import Admin from "../pages/Admin"
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SeacrchProduct from "../components/SeacrchProduct";

const router = createBrowserRouter([
    {
   path:"/", 
   element:<App/>,
   children:[  
    { 
        path:"",
        element:<Home/>
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/forgotpassword",
        element:<ForgotPassword/>
    },
    {
        path:"/signup",
        element:<SignUp/>
    },
    {
        path:"/product-category/:categoryName",
        element:<CategoryProduct/>
    },
    {
        path:"/product-details/:productId",
        element:<ProductDetails/>
    },
    {
        path:"/cart",
        element:<Cart/>
    },
    {
        path:"/search",
        element:<SeacrchProduct/>
    },
    {
     path:"/admin",
     element:<Admin/>,
     children:[
        {
            path:"/admin/allusers",
            element:<AllUsers/>,
        },
        {
              path:"/admin/allproducts",
              element:<AllProducts/>
        }
     ],
    },
   ],
}
]);
export default router;
