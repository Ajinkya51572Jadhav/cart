import React, { useEffect, useState } from "react";
import { Api } from "../common";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import "../../src/App.css";


 
const CategoryList = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategory();
  }, []);

      const categoryLoading =  new Array(5).fill(null);

   
  const fetchCategory = async (e) => {
    try {
      setLoading(true);
      const { data } = await axios.get(Api.category.url);
      console.log("data", data);
      if (data?.status) {
        setLoading(false);
        setCategory(data?.category);
      } 

    } catch (error) {
      toast.error(error?.message, {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-4 justify-between overflow-scroll scrollbar-none">
      { loading ? (

      categoryLoading.map((el,index)=>(
      <div  key={`categoryLoading ${index}`}     className=" h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200">
      </div>
      ))

    ) : ( 
         <> 
          {
            category?.map((item, index) =>(
                <NavLink to={`/product-category/${item?.category}`} key={index}  className="">
                  <div className="w-16 h-16  md:w-20 md:h-20 rounded-full overflow-hidden  p-4 bg-slate-200 flex justify-center items-center"> 
                  <img
                    src={item?.productImage[0]}
                    alt={item?.category}
                    className="h-full object-scale-down mix-blend-multiply hover:scale-125  transition-all"
                  />
                  </div>
                  <p className="text-center text-sm md:text-base capialize">{item?.category}</p>
                </NavLink>
              ))}
         </> 
       )} 
       </div>
    </div>
  );
};

export default CategoryList;
