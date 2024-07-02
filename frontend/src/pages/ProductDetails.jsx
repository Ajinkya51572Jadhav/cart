import React, { useEffect, useState ,useContext} from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Api } from "../common";
import { useParams } from "react-router-dom";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { displayCurrency } from "../helpers/displayCurrency";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import { addToCart } from "../components/AddToCart";
import Context from "../context";


const ProductDetails = () => {
  const {fetchUserCartCount}= useContext(Context);

  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageShow, setImageShow] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const LoadingList = new Array(4).fill(null);


  useEffect(() => {
    getSingleProductDetails();
  }, []);

  async function getSingleProductDetails() {
    try {
      setLoading(true);
      const { data } = await axios.post(Api.productdetails.url, {
        product_id: productId,
      });

      if (data?.status) {
        setLoading(false);
        setProductDetails(data?.product);
      }
      
    } catch (error) {
      toast.error(error?.message, {
        autoClose: 2000,
        position: "top-right",
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }

  const star = [
    <FaStar key={1} />,
    <FaStar key={2} />,
    <FaStar key={3} />,
    <FaStar key={4} />,
    <FaStarHalf key={5} />,
  ];

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <>
      <div className="container mx-auto p-4">
        {loading ? (
          <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
            <div className="flex flex-col lg:flex-row items-center justify-start w-full lg:w-1/2">
              <div className="flex gap-2 lg:flex-col pr-5 h-full">
                {LoadingList.map((_, index) => (
                  <div
                    key={index}
                    className="h-20 w-20 bg-slate-200 rounded animate-pulse"
                  ></div>
                ))}
              </div>
              <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 rounded animate-pulse"></div>
            </div>
            <div className="flex flex-col gap-3 w-full lg:w-1/2">
              <p className="bg-slate-200 px-2 rounded-full w-20 animate-pulse h-7"></p>
              <p className="bg-slate-200 animate-pulse w-full h-5"></p>
              <div className="flex gap-1 items-center bg-slate-200 animate-pulse w-full h-10"></div>
              <div className="flex items-center gap-1">
                <p className="bg-slate-200 animate-pulse w-[50%] h-9 rounded"></p>
                <p className="bg-slate-200 animate-pulse w-[50%] h-9 rounded"></p>
              </div>
              <div className="flex items-center gap-1">
                <button className="border-2 px-3 py-1 min-w-[100px] bg-slate-200 animate-pulse rounded"></button>
                <button className="border-2 px-3 py-1 min-w-[100px] bg-slate-200 animate-pulse rounded"></button>
              </div>
              <div className="w-full h-full py-2 px-1 rounded mt-3 bg-slate-200 animate-pulse"></div>
            </div>
          </div>
        ) : (
          <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
            <div className="flex flex-col lg:flex-row items-center justify-start w-full lg:w-1/2">
              <div className="flex gap-2 lg:flex-col overflow-scroll h-full">
                {productDetails?.productImage?.map((item, index) => (
                  <div
                    key={index}
                    className="h-20 w-20 bg-slate-200 rounded cursor-pointer"
                  >
                    <img
                      src={item}
                      className="cursor-pointer w-full h-full object-scale-down mix-blend-multiply"
                      onMouseOver={() => setImageShow(item)}
                    />
                  </div>
                ))}
              </div>
              <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 rounded relative">
                <img
                  src={
                    imageShow == null
                      ? productDetails?.productImage[0]
                      : imageShow
                  }
                  onMouseMove={handleMouseMove}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="w-full h-full object-cover cursor-pointer"
                />
                {isZoomed && (
                  <div className=" absolute min-w-[400px] min-h-[400px] bg-slate-200 -right-[800px] top-0">
                    <div
                      className="w-full h-full min-h-[385px] min-w-[760px] cursor-pointer"
                      style={{
                        backgroundImage: `url(${imageShow})`,
                        backgroundPosition: `${zoomPosition.x + 10}% ${zoomPosition.y}%`,
                      }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1 w-full lg:w-1/2">
              <p className="bg-red-200 text-red-600 px-2 rounded-full w-fit">
                {productDetails?.brnadName}
              </p>
              <h2 className="text-2xl lg:text-4xl font-medium">
                {productDetails?.productName}
              </h2>
              <p className="capitalize text-slate-400">
                {productDetails?.category}
              </p>
              <div className="text-red-600 flex gap-1 items-center">{star}</div>
              <div className="flex items-center gap-1 text-xl font-light">
                <p className="line-through">
                  {displayCurrency(productDetails?.price)}
                </p>
                <p>{displayCurrency(productDetails?.selling)}</p>
              </div>
              <div className="flex items-center gap-1 text-base font-light">
                <button  className="border-2 bg-white border-red-400 text-red-600 px-3 py-1 min-w-[100px] hover:text-white hover:bg-red-700 rounded">
                  Buy
                </button>
                <button onClick={(e)=>addToCart(e,productDetails?._id,fetchUserCartCount)}
                 className="border-2 bg-red-600 text-white px-3 py-1 min-w-[100px] hover:text-white hover:bg-red-700 rounded">
                  Add To Cart
                </button>
              </div>
              <div className="w-full bg-white py-2 px-1 rounded mt-3">
                <p className="text-slate-600 text-sm">
                  Description: {productDetails?.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <>
        {productDetails?.category && (
          <HorizontalCardProduct
            category={productDetails?.category}
            heading={"Recommend Product"}
            refresh={getSingleProductDetails}
          />
        )}
      </>
    </>
  );
};

export default ProductDetails;
