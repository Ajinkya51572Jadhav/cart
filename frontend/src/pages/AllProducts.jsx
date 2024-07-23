import React, { useEffect, useState } from "react";
import UploadProduct from "./UploadProduct";
import axios from "axios";
import { Api } from "../common";
import { toast } from "react-toastify";
import AdminProductCard from "../components/AdminProductCard";

const AllProducts = () => {
  const [toggle, setToggle] = useState(false);
  const [products, setProducts] = useState([]);
  console.log("products", products);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(Api.products.url);

      if (data?.status) {
        setProducts(data?.products);
      }
    } catch (error) {
      toast.error(error?.message, {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white py-3 px-6 flex justify-between items-center shadow-md rounded-md mb-6">
        <h2 className="font-bold text-xl">All Products</h2>
        <button
          className="border-2  bg-yellow-500 hover:bg-yellow-600 hover:text-white px-4 py-2 
           transition-all duration-300 rounded-full"
          onClick={() => setToggle((prev) => !prev)}
        >
          Upload Product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products?.map((item, index) => (
          <AdminProductCard
            data={item}
            key={index + " adminproduct"}
            refresh={getAllProducts}
          />
        ))}
      </div>

      {toggle && (
        <UploadProduct
          onClose={() => setToggle(false)}
          refresh={getAllProducts}
        />
      )}
    </div>
  );
};

export default AllProducts;

// import React, { useEffect, useState } from 'react';
// import UploadProduct from './UploadProduct';
// import axios from "axios";
// import { Api } from '../common';
// import {toast } from "react-toastify"
// import AdminProductCard from '../components/AdminProductCard';

// const AllProducts = () => {

//   const [toggle,setToggle]=useState(false);
//   const [products,setProducts] = useState([]);
//     console.log("products",products);

//    const  getAllProducts=async()=>{
//     try {
//      const {data} = await axios.get(Api.products.url);

//      if (data?.status) {
//       setProducts(data?.products)
//      };
//     } catch (error) {
//      toast.error(error?.message, {
//        position: "top-right",
//        autoClose: 1000,
//      });
//     }
//     }

//  useEffect(()=>{
//   getAllProducts();
//  },[]);

//   return (
//     <div>
//     <div className='bg-white py-2 px-4 flex justify-between items-center'>
//       <h2 className='font-bold text-lg'>All Products</h2>
//       <button className='border-2 border-red-600  text-red-600 hover:text-white px-3
//        hover:bg-red-600 hover:transition-all
//        rounded-full'
//          onClick={()=>setToggle((pre)=>!pre)}
//        >upload Products</button>
//     </div>

//         <div className='flex flex-wrap  items-center justify-center gap-5  py-4 h-[calc(100vh-190px)] overflow-y-scroll '>
//           {
//             products?.map((item,index)=>(
//               <AdminProductCard data={item} key={index+" "+ "adminproduct"} refresh={getAllProducts}/>
//             ))
//           }

//         </div>

//          {
//           toggle && (
//             <UploadProduct
//               onClose={()=>setToggle(false)}
//               refresh={getAllProducts}
//             />
//           )
//          }

//     </div>
//   )
// }

// export default AllProducts
