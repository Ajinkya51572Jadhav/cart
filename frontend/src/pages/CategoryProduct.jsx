import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import productCategory from "../components/ProductCategory";
import { toast } from "react-toastify";
import axios from "axios";
import { Api } from "../common/index";
import FilterProduct from "./FilterProduct";

const CategoryProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const urlSearch = new URLSearchParams(location?.search);  
  const refreshUrlthenProductShow = urlSearch.getAll("category");
    console.log("refreshUrlthenProductShow",refreshUrlthenProductShow);

  console.log("location", location);
  const [filterData, setFilterData] = useState([]);
  const [statefilter, setstatefilter] = useState({});
  const [filterCategory, setFilterCategory] = useState(refreshUrlthenProductShow || []);
  const [loading, setLoading] = useState(true);

  console.log("filterCategory", filterCategory);

  const urlcategoryList = {};
  urlSearch.forEach((el) => (urlcategoryList[el] = true));

  console.log("cate", urlcategoryList);


    useEffect(()=>{
      
        if(filterCategory.length > 0){
          getFilterProducts();          
        }
        async function getFilterProducts(){

          try {
            setLoading(true);
            const { data } = await axios.post(`${Api?.filter?.url}`, filterCategory);
            console.log("datacheckApi", data);
      
            if (data?.status) {
              setFilterData(data?.filter);
              setLoading(false);
            }
          } catch (error) {
            toast.error(error?.message, {
              autoClose: 2000,
              position: "top-right",
            });
          }
        }
        
      
    },[filterCategory]);

  

  useEffect(() => {
    const checkedValueFalse = Object.fromEntries(
      Object.entries(statefilter).filter(([key, value]) => value)
    );
    setFilterCategory(Object.keys(checkedValueFalse));
  }, [statefilter]);

  useEffect(() => {
    const formatUrl = filterCategory
      .map((item) => {
        return `category=${item}`;
      })
      .join("&&");

    if (formatUrl) {
      navigate(`/product-category?${formatUrl}`);
    }
    
    

  }, [filterCategory]);

  function handleChange(e) {
    console.log("123@", e);
    const { name, value, checked } = e.target;
    // setstatefilter((pre) => ({
    //   ...pre,
    //   [value]: checked,
    // }));
    setstatefilter((pre) => {
      return {
        ...pre,
        [value]: checked,
      };
    });
  }

  console.log("statefilter", statefilter);

  return (
    <div className="container mx-auto p-4">
      <div className="lg:grid grid-cols-[200px,1fr]">
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
              {productCategory?.map((cate) => {
                console.log("Condaction", statefilter[cate?.value]);

                return (
                  <div className="flex gap-3 items-center">
                    <input
                      type="checkbox"
                      name="category"
                      id={cate?.value}
                      value={cate?.value}
                      checked={statefilter[cate?.value]}
                      onChange={handleChange}
                    />
                    <label htmlFor={cate?.value}>{cate?.label}</label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>
      {/* Right Side product */}
      <div className="flex">{filterData && <FilterProduct filterProducts={filterData} loading={loading}/>}</div>
      </div>

     
    </div>
  );
};

export default CategoryProduct;
