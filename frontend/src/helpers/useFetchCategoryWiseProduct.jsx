import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Api } from "../common";

export const useFetchCategoryWiseProduct = (category) => {
  const [productCategory, setProductCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategoryProduct();
  }, [category]);

  const fetchCategoryProduct = async () => {
    try {
       setLoading(true);
      const { data } = await axios.post(Api?.category_wise_product?.url, {
        category: category,
      });

      if (data?.status) {
         setLoading(false);
        setProductCategory(data?.category);
        
      } else {
        toast.error(data?.message, {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return { productCategory, loading };
};
