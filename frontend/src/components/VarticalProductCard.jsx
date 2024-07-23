import React, { useState, useEffect, useContext } from "react";
import { useFetchCategoryWiseProduct } from "../helpers/useFetchCategoryWiseProduct";
import { displayCurrency } from "../helpers/displayCurrency";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { addToCart } from "./AddToCart";
import Context from "../context";

const VerticalProductCard = ({ category, heading }) => {
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
      }, 2000); // Change slide every 3 seconds
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
    <div className="container mx-auto px-4 my-6 ">
      <h2 className="text-2xl font-semibold py-2">{heading}</h2>
      <div className="relative">
        <button
          className="bg-white rounded-full p-2 shadow-md absolute left-2 top-1/2 transform -translate-y-1/2 z-10"
          onClick={preImage}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white rounded-full p-2 shadow-md absolute right-2 top-1/2 transform -translate-y-1/2 z-10"
          onClick={nextImage}
        >
          <FaAngleRight />
        </button>

        <div className="overflow-x-scroll">
          {loading ? (
            <div
              className="flex transition-transform duration-300"
              style={{ transform: `translateX(-${count * 50}%)` }}
            >
              {LoadingList?.map((_) => (
                <div className="w-full min-w-[280px] md:min-w-[320px] p-4">
                  <div className="flex flex-col  rounded-lg shadow-md overflow-hidden">
                    <div className="bg-slate-200 flex items-center justify-center h-48 animate-pulse p-1">
                      {/* <img
                    src={product.productImage[0]}
                    className="object-contain  w-full h-full p-5  hover:scale-110 transition-all mix-blend-multiply"
                    alt={product.productName}
                  /> */}
                    </div>

                    <div className="p-4 bg-white">
                      <h2 className="text-lg font-semibold truncate bg-slate-200 animate-pulse p-1"></h2>
                      <p className="text-gray-600 bg-slate-200 animate-pulse p-1"></p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-gray-500 line-through p-3 bg-slate-200 animate-pulse"></p>
                        <p className=" font-medium p-3  bg-slate-200 animate-pulse"></p>
                      </div>
                      <button className=" w-full mt-4 py-2 rounded text-white p-5 bg-slate-200 animate-pulse h-7 "></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="flex transition-transform duration-300"
              style={{ transform: `translateX(-${count * 50}%)` }}
            >
              {productCategory?.map((product) => (
                <NavLink
                  to={`/product-details/${product?._id}`}
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  key={product.id}
                  className="w-full min-w-[280px] md:min-w-[320px] p-4 "
                >
                  <div className="flex flex-col  rounded-lg shadow-md overflow-hidden">
                    <div className="bg-slate-200 flex items-center justify-center h-48">
                      <img
                        src={product.productImage[0]}
                        className="object-contain  w-full h-full p-5  hover:scale-110 transition-all mix-blend-multiply"
                        alt={product.productName}
                      />
                    </div>

                    <div className="p-4">
                      <h2 className="text-lg font-semibold truncate">
                        {product.productName}
                      </h2>
                      <p className="text-gray-600">{product.category}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-gray-500 line-through">
                          {displayCurrency(product.price)}
                        </p>
                        <p className="text-red-600 font-medium">
                          {displayCurrency(product.selling)}
                        </p>
                      </div>
                      <button
                        onClick={(e) =>
                          addToCart(e, product?._id, fetchUserCartCount)
                        }
                        className="bg-yellow-500 hover:bg-yellow-600 w-full mt-4 py-2 rounded text-white"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerticalProductCard;
