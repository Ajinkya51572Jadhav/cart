import React, { useState } from "react";
import { useParams } from "react-router-dom";
import productCategory from "../components/ProductCategory";
import { toast } from "react-toastify";
import axios from "axios";
import { Api } from "../common/index";

const CategoryProduct = () => {
  const params = useParams();
  console.log("params: ", params);
  const [filterData, setFilterData] = useState([]);

  async function handleFilterData() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${Api?.filter?.url}`);
      if (data?.status) {
        setFilterData(data?.category);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error?.message, {
        autoClose: 2000,
        position: "top-right",
      });
    }
  }

  function handleChange(e) {
    console.log("123@   ", e);
  }

  return (
    <div className="container mx-auto p-4">
      <div className="hidden lg:grid grid-cols-[200px,1fr] bg-red-700">
        {/* Left side */}

        <div className="bg-white p2 min-h-[calc(100vh-120px)] overflow-y-scroll">
          <div className="">
            <h3
              className="text-base uppercase font-medium text-slate-500 
                 border-b pb-1 border-slate-300
              "
            >
              Sort By
            </h3>

            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input type="radio" name="sortby" />
                <label>Price - Low to High</label>
              </div>

              <div className="flex items-center gap-3">
                <input type="radio" name="sortby" />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          <div className="">
            <h3
              className="text-base uppercase font-medium text-slate-500 
                 border-b pb-1 border-slate-300
              "
            >
              helper
            </h3>

            <form className="flex flex-col">
              {productCategory?.map((cate) => (
                <div className="flex gap-3 items-center">
                  <input
                    type="checkbox"
                    name="category"
                    id={cate?.value}
                    onChange={handleChange}
                  />
                  <label htmlFor={cate?.value}>{cate?.label}</label>
                </div>
              ))}
            </form>
          </div>
        </div>
        <div>Display product</div>
      </div>
    </div>
  );
};

export default CategoryProduct;
