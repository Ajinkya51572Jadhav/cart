import axios from "axios";
import {Api} from "../common";
import  {toast} from "react-toastify";



export const addToCart = async(e,id,fetchUserCartCount)=>{
         
   try {
        e.preventDefault(); 
       const {data} = await axios.post(Api?.add_to_cart?.url,{
        product_id:id 
       },{
        withCredentials:true,
       });
         console.log("data",data);
        
       if(data?.status){
        toast.success(data?.message,{
          autoClose: 2000,
          position: "top-right",
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        fetchUserCartCount();
       }else{
        toast.error(data?.message,{
          autoClose: 2000,
          position: "top-right",
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
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


};
