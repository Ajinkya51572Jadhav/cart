import React, { useState, useEffect } from "react";
import image1 from "../assest/assest/banner/img1.webp";
import image2 from "../assest/assest/banner/img2.webp";
import image3 from "../assest/assest/banner/img3.jpg";
import image4 from "../assest/assest/banner/img4.jpg";
import image5 from "../assest/assest/banner/img5.webp";

import image1Mobile from "../assest/assest/banner/img1_mobile.jpg";
import image2Mobile from "../assest/assest/banner/img2_mobile.webp";
import image3Mobile from "../assest/assest/banner/img3_mobile.jpg";
import image4Mobile from "../assest/assest/banner/img4_mobile.jpg";
import image5Mobile from "../assest/assest/banner/img5_mobile.png";

import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const BannerProduct = () => {
  const [current, setCurrent] = useState(0);



  const [isMobile, setIsMobile] = useState(window.innerWidth <= 2000); //768

  const desktopImages = [ image5,image1, image2, image3, image4];

  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile, 
    image5Mobile,
  ];

  const images = isMobile ? mobileImages : desktopImages;

  const nextImage = () => {
      setCurrent((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const prevImage = () => {
      setCurrent((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    let interval;
    if (isMobile) {
      interval = setInterval(nextImage, 2000); // Change image every 3 seconds
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMobile, current]);

  return (
    <div className="container mx-auto px-4 rounded">
      <div className="h-72 w-full bg-slate-200 relative">
        <div className="absolute z-10 h-full w-full md:flex items-center hidden">
          <div className="flex justify-between w-full text-2xl">
            <button
              onClick={prevImage}
              className="bg-white rounded-full shadow-md p-1"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={nextImage}
              className="bg-white rounded-full shadow-md p-1"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
        <div className="flex h-full w-full overflow-hidden">
          {images.map((elm, index) => (
            <div
              className="w-full h-full min-w-full transition-all duration-500"
              key={index}
              style={{
                transform: `translateX(-${current * 100}%)`,
              }}
            >
              <img
                src={elm}
                className="w-full h-full object-cover"
                alt={`Slide ${index}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
