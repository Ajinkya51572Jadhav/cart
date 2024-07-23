import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Api } from "../common";
import "react-toastify/dist/ReactToastify.css";
import { displayCurrency } from "../helpers/displayCurrency";
import { addToCart } from "../components/AddToCart";
import Context from "../context";
import { useDebounce } from "use-debounce";
import { FaArrowLeftLong } from "react-icons/fa6";

const filterProduct = ({ filterProducts, loading }) => {
  const { fetchUserCartCount } = useContext(Context);

  console.log("checked product", filterProducts);
  const LoadingList = new Array(13).fill(null);

  return (
    <div className="container mx-auto px-4 my-6">
      <h2 className="text-2xl font-semibold py-2">
        {filterProducts?.length > 0 ? (
          <>
            <button className="bg-red-500 hover:bg-red-700 text-white font-light  px-4 rounded">
              <NavLink to={"/"}>
                <FaArrowLeftLong />
              </NavLink>
            </button>{" "}
            <span>Search Available Products </span>
          </>
        ) : (
          <>
            <button className="bg-red-500 hover:bg-red-700 text-white font-light  px-4 rounded">
              <NavLink to={"/"}>
                <FaArrowLeftLong />
              </NavLink>
            </button>{" "}
            <span>back to home</span>
          </>
        )}
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading ? (
          <>
            {LoadingList?.map((_, index) => (
              <div
                key={index}
                className="w-full bg-white h-72 rounded-sm shadow flex flex-col p-4 animate-pulse"
              >
                <div className="bg-slate-200 h-48 mb-4 rounded"></div>
                <div className="flex-1 space-y-4">
                  <div className="h-4 bg-slate-200 rounded"></div>
                  <div className="h-4 bg-slate-200 rounded"></div>
                  <div className="flex gap-3">
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                  </div>
                  <div className="h-8 bg-slate-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </>
        ) : (
          filterProducts?.map((product) => (
            <NavLink
              key={product?._id}
              to={`/product-details/${product?._id}`}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-full bg-white h-72 rounded-sm shadow flex flex-col p-4"
            >
              <div className="bg-slate-200 h-48 mb-4 rounded overflow-hidden flex justify-center">
                <img
                  src={product?.productImage[0]}
                  // className="object-cover w-full h-full hover:scale-110 transition-transform"
                  className="object-scale-down h-full hover:scale-105 transition-all mix-blend-multiply"
                  alt={product?.productName}
                />
              </div>
              <div className="flex-1 space-y-2">
                <h2 className="text-lg font-semibold line-clamp-1">
                  {product?.productName}
                </h2>
                <p className="text-slate-600 capitalize line-clamp-1">
                  {product?.category}
                </p>
                <div className="flex gap-3">
                  <p className="text-slate-500 line-through">
                    {displayCurrency(product?.price)}
                  </p>
                  <p className="text-red-600 font-medium">
                    {displayCurrency(product?.selling)}
                  </p>
                </div>
                <button
                  onClick={(e) =>
                    addToCart(e, product?._id, fetchUserCartCount)
                  }
                  className="bg-yellow-500 hover:bg-yellow-600 px-3 rounded py-1 text-white w-full"
                >
                  Add To Cart
                </button>
              </div>
            </NavLink>
          ))
        )}
      </div>
    </div>
  );
};

export default filterProduct;
