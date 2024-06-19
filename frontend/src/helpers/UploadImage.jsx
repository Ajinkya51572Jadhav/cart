   import React from 'react'
   import axios from 'axios';
   import { toast } from'react-toastify';
     const url =  `https://api.cloudinary.com/v1_1/duzvvywub/image/upload`;

const UploadImage = async(image) => { 
   
    try {
      
     const formdata = new FormData();

      formdata.append("file",image);
      formdata.append("upload_preset","mern_products");

     const {data} = await axios.post(url,formdata);
      return data;

    } catch (error) {
      toast.error(error.message,{
        position: "top-right",
        autoClose: 1000 
      });
    }
    }

export default UploadImage;
