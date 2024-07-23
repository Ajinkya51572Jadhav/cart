import React, { useState, useEffect, useContext } from "react";
import { useFetchCategoryWiseProduct } from "../helpers/useFetchCategoryWiseProduct";
import { displayCurrency } from "../helpers/displayCurrency";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { addToCart } from "./AddToCart";
import Context from "../context";

const HorizontalCardProduct = ({ category, heading, refresh }) => {
  const { fetchUserCartCount } = useContext(Context);
  const [count, setCount] = useState(0);
  const { productCategory, loading } = useFetchCategoryWiseProduct(category);
  const LoadingList = new Array(13).fill(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    let interval;
    if (isMobile && productCategory.length > 0) {
      interval = setInterval(() => {
        setCount((prev) => (prev + 1) % productCategory.length);
      }, 3000); // Change slide every 3 seconds
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [productCategory]);

  const nextImage = () => {
    setCount((prev) => (prev + 1) % productCategory.length);
  };

  const preImage = () => {
    setCount(
      (prev) => (prev - 1 + productCategory.length) % productCategory.length
    );
  };

  return (
    <div className="container mx-auto px-4 my-6">
      <h2 className="text-2xl font-semibold py-2">{heading}</h2>

      <div className="flex items-center gap-4 md:gap-6  overflow-x-auto scrollbar-none transition-all">
        <button
          className="bg-white rounded-full p-2 shadow-md absolute left top transform  z-10"
          onClick={preImage}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white rounded-full p-2 shadow-md absolute right-10 top transform -translate-y-1/2 z-10"
          onClick={nextImage}
        >
          <FaAngleRight />
        </button>

        {loading ? (
          <>
            {LoadingList.map((_, index) => (
              <div
                style={{ transform: `translateX(-${count * 50}%)` }}
                className="w-full min-w-[280px] bg-white md:min-w-[320px] h-36  max-w-[280px]  md:max-w-[320px]  rounded-sm shadow flex"
              >
                <div className="bg-slate-200 h-full p-2 min-w-[120px] md:min-w-[145px] rounded animate-pulse">
                  {/* <img src={product?.productImage[0]} className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"/> */}
                </div>
                <div className="p-2 grid w-full gap-4">
                  <h2 className="md:text-lg line-clamp-1 text-ellipsis p-1 bg-slate-200 animate-pulse"></h2>
                  <p className="text-slate-600 capitalize p-1 bg-slate-200   animate-pulse"></p>
                  <div className="flex gap-3 w-full">
                    <p className="text-slate-500 line-through p-1 bg-slate-200  animate-pulse"></p>
                    <p className="text-red-600  font-medium p-1   bg-slate-200 animate-pulse"></p>
                  </div>
                  <button className=" px-3 rounded py-1 mt-1 text-white p-1 w-full  bg-slate-200 animate-pulse"></button>
                </div>
              </div>
            ))}
          </>
        ) : (
          productCategory?.map((product) => (
            <NavLink
              to={`/product-details/${product?._id}`}
              style={{ transform: `translateX(-${count * 50}%)` }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-full min-w-[280px] bg-white md:min-w-[320px] h-36  max-w-[280px]  md:max-w-[320px]  rounded-sm shadow flex"
            >
              <div
                onClick={refresh}
                className="bg-slate-200 h-full p-2 min-w-[120px] md:min-w-[145px] rounded"
              >
                <img
                  src={product?.productImage[0]}
                  className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                />
              </div>
              <div className="p-2 grid">
                <h2 className="md:text-lg line-clamp-1 text-ellipsis">
                  {product?.productName}
                </h2>
                <p className="text-slate-600 capitalize">{product?.category}</p>
                <div className="flex gap-3 ">
                  <p className="text-slate-500 line-through">
                    {displayCurrency(product?.price)}
                  </p>
                  <p className="text-red-600  font-medium">
                    {displayCurrency(product?.selling)}
                  </p>
                </div>
                <button
                  onClick={(e) =>
                    addToCart(e, product?._id, fetchUserCartCount)
                  }
                  className="bg-yellow-500 hover:bg-yellow-600  px-3 rounded py-1 mt-1 text-white"
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

export default HorizontalCardProduct;
